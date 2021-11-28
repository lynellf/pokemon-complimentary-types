import type { Types } from "./types";

type TNode = Map<
  "strengths" | "weaknesses" | "resistances" | "resistedBy",
  Types[]
>;

interface ITraversalDeps {
  createNode: (type: Types) => TNode;
  unique: <T>(array: T[]) => T[];
  intersection: <T>(a: T[], b: T[]) => T[];
}

interface ITraversal {
  byCompliment: (results: Types[], weakness: Types) => Types[];
  getCompliments: (query: Types, index?: number, queries?: Types[]) => Types[];
}

interface ISharedWeaknessesDeps {
  createNode: (type: Types) => TNode;
  intersection: <T>(a: T[], b: T[]) => T[];
  badMatchups: Types[];
}
export const bySharedWeaknesses =
  (deps: ISharedWeaknessesDeps) => (compliment: Types) => {
    const { createNode, intersection, badMatchups } = deps;
    const compNode = createNode(compliment);
    const compWeaknesses = compNode.get("weaknesses");
    const overlap = intersection(compWeaknesses, badMatchups);
    return overlap.length > 0;
  };

interface INearestMatchDeps {
  createNode: (type: Types) => TNode;
  unique: <T>(array: T[]) => T[];
  results: Types[];
  intersection: <T>(a: T[], b: T[]) => T[];
}
export const byNearestGoodMatchup =
  (deps: INearestMatchDeps) => (potentialCompliment: Types) => {
    const { createNode, unique, intersection, results } = deps;
    const matchupNode = createNode(potentialCompliment);
    const matchupWeaknesses = matchupNode.get("weaknesses");
    const badMatchups = unique([...matchupWeaknesses]);
    const hasOverlappingWeaknesses =
      results.find(
        bySharedWeaknesses({
          createNode,
          intersection,
          badMatchups,
        })
      ) !== undefined;

    return hasOverlappingWeaknesses ? false : true;
  };

const lookupCompliments =
  (deps: ITraversalDeps) => (results: Types[], badMatchup: Types) => {
    const { createNode, unique, intersection } = deps;
    const badMatchupNode = createNode(badMatchup);
    const goodMatchups = badMatchupNode.get("weaknesses");
    const hasExistingCoverage = intersection(results, goodMatchups).length > 0;

    if (hasExistingCoverage) {
      return results;
    }

    const nearestCompliment = goodMatchups.find(
      byNearestGoodMatchup({
        createNode,
        unique,
        results,
        intersection,
      })
    );

    const hasNearestCompliment = nearestCompliment !== undefined;

    return hasNearestCompliment ? [...results, nearestCompliment] : results;
  };

interface IComplimentDeps {
  byCompliment: (results: Types[], weakness: Types) => Types[];
  createNode: (type: Types) => TNode;
}
const getAllCompliments =
  (deps: IComplimentDeps) =>
  (query: Types, _ = 0, queries: Types[] = []): Types[] => {
    const { byCompliment, createNode } = deps;
    const queryNode = createNode(query);
    const queryWeaknesses = queryNode.get("weaknesses");
    const compliments = queryWeaknesses.reduce(byCompliment, [
      query,
      ...queries,
    ]);
    return compliments;
  };

export default (deps: ITraversalDeps): ITraversal => {
  const byCompliment = lookupCompliments(deps);
  const getCompliments = getAllCompliments({
    byCompliment,
    createNode: deps.createNode,
  });
  return { byCompliment, getCompliments };
};
