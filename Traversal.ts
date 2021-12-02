import type { Types as MonsterType } from "./types";

type TNode = Map<
  | "strengths"
  | "weaknesses"
  | "resistances"
  | "resistedBy"
  | "self"
  | "neutral",
  MonsterType[]
>;

interface ITraversalDeps {
  createNode: (type: MonsterType) => TNode;
  unique: <T>(array: T[]) => T[];
  intersection: <T>(a: T[], b: T[]) => T[];
}

interface ITraversal {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  getCompliments: (
    query: MonsterType,
    index?: number,
    queries?: MonsterType[]
  ) => MonsterType[];
}

interface ISharedWeaknessesDeps {
  createNode: (type: MonsterType) => TNode;
  intersection: <T>(a: T[], b: T[]) => T[];
  badMatchups: MonsterType[];
}
export const bySharedWeaknesses =
  (deps: ISharedWeaknessesDeps) => (compliment: MonsterType) => {
    const { createNode, intersection, badMatchups } = deps;
    const compNode = createNode(compliment);
    const compWeaknesses = compNode.get("weaknesses");
    const overlap = intersection(compWeaknesses, badMatchups);
    return overlap.length > 0;
  };

interface INearestMatchDeps {
  createNode: (type: MonsterType) => TNode;
  unique: <T>(array: T[]) => T[];
  results: MonsterType[];
  intersection: <T>(a: T[], b: T[]) => T[];
}
export const byNearestGoodMatchup =
  (deps: INearestMatchDeps) => (potentialCompliment: MonsterType) => {
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
  (deps: ITraversalDeps) =>
  (results: MonsterType[], badMatchup: MonsterType) => {
    const { createNode, unique, intersection } = deps;
    const badMatchupNode = createNode(badMatchup);
    const goodMatchups = badMatchupNode.get("weaknesses");
    const hasExistingCoverage = intersection(results, goodMatchups).length > 0;

    if (hasExistingCoverage) {
      return results;
    }

    const nearestCompliments = goodMatchups.filter(
      byNearestGoodMatchup({
        createNode,
        unique,
        results,
        intersection,
      })
    );

    const hasNearestCompliment = nearestCompliments.length > 0;

    return hasNearestCompliment ? [...results, ...nearestCompliments] : results;
  };

interface IComplimentDeps {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  createNode: (type: MonsterType) => TNode;
}
const getAllCompliments =
  (deps: IComplimentDeps) =>
  (query: MonsterType, _ = 0, queries: MonsterType[] = []): MonsterType[] => {
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
