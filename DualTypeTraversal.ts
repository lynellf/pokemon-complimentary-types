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

interface IDualTypeTraversalDeps {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  createMergedNode: (query: MonsterType[]) => TNode;
}

interface IDualTypeTraversal {
  getCompliments: (
    query: MonsterType[],
    index?: number,
    queries?: MonsterType[][]
  ) => MonsterType[];
}

interface IComplimentDeps {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  createMergedNode: (query: MonsterType[]) => TNode;
}

const getAllCompliments =
  (deps: IComplimentDeps) =>
  (
    query: MonsterType[],
    _ = 0,
    queries: MonsterType[][] = []
  ): MonsterType[] => {
    const { byCompliment, createMergedNode } = deps;
    const queryNode = createMergedNode(query);
    const queryWeaknesses = queryNode.get("weaknesses");
    const compliments = queryWeaknesses.reduce(
      byCompliment,
      [query, ...queries].flat()
    );
    return compliments;
  };

export default (deps: IDualTypeTraversalDeps): IDualTypeTraversal => {
  const getCompliments = getAllCompliments(deps);
  return { getCompliments };
};
