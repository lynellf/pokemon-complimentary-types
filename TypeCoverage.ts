import { Types as MonsterType } from "./types";

type TNode = Map<
  | "strengths"
  | "weaknesses"
  | "resistances"
  | "resistedBy"
  | "self"
  | "neutral",
  MonsterType[]
>;

interface ITypeCoverageDeps {
  createMergedNode: (query: MonsterType[]) => TNode;
  unique: <T>(arr: T[]) => T[];
  intersection: <T>(arr1: T[], arr2: T[]) => T[];
}

export const getCoverage =
  (deps: ITypeCoverageDeps) =>
  (query: MonsterType[][]): [MonsterType[], MonsterType[][]] => {
    const { createMergedNode, unique, intersection } = deps;
    const mergedNode = createMergedNode(query.flat());
    const advantages = mergedNode.get("strengths") ?? [];
    const neutral = mergedNode.get("neutral") ?? [];
    const resistedBy = (mergedNode.get("resistedBy") ?? []).filter(
      (type) => ![...advantages, ...neutral].includes(type)
    );
    const offensiveCompliments = unique(
      resistedBy.flatMap((type) => {
        const node = createMergedNode([type]);
        return node.get("weaknesses") ?? [];
      })
    );

    const weaknesses = unique(
      query
        .map(createMergedNode)
        .flatMap((node) => node.get("weaknesses") ?? [])
    );

    const safeCompliments = offensiveCompliments
      .filter((type) => {
        const node = createMergedNode([type]);
        const nodeWeaknesses = node.get("weaknesses") ?? [];
        const sharesWeaknesses =
          intersection(nodeWeaknesses, weaknesses).length > 0;
        return !sharesWeaknesses;
      })
      .map((type) => [type]);

    return [resistedBy, safeCompliments];
  };

interface ITypeCoverage {
  findCoverageGaps: (
    query: MonsterType[][]
  ) => [MonsterType[], MonsterType[][]];
}

export default (deps: ITypeCoverageDeps): ITypeCoverage => {
  const findCoverageGaps = getCoverage(deps);
  return { findCoverageGaps };
};
