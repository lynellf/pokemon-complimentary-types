import { Types as MonsterType } from "./types";

type TNode = Map<
  "strengths" | "weaknesses" | "resistances" | "resistedBy" | "self",
  MonsterType[]
>;

interface IDualTypeNodeDeps {
  createNode: (type: MonsterType) => TNode;
  unique: <T>(array: T[]) => T[];
  intersection: <T>(a: T[], b: T[]) => T[];
}

interface IDualTypeNode {
  createMergedNode: (query: MonsterType[]) => TNode;
}

const byDifference =
  <T>(population: T[]) =>
  (query: T) =>
    !population.includes(query);

const mergeNodes =
  (deps: IDualTypeNodeDeps) => (acc: TNode, curr: MonsterType) => {
    const { createNode, intersection, unique } = deps;
    const currentNode = createNode(curr);
    const currentSelf = currentNode.get("self");
    const currentWeaknesses = currentNode.get("weaknesses");
    const currentStrengths = currentNode.get("strengths");
    const currentResistances = currentNode.get("resistances");
    const hasData = acc.has("resistances");

    if (!hasData) {
      const self = acc.get("self") ?? currentSelf;
      const resistances = acc.get("resistances") ?? currentResistances;
      const weaknesses = acc.get("weaknesses") ?? currentWeaknesses;
      const strengths = acc.get("strengths") ?? currentStrengths;

      acc.set("resistances", resistances);
      acc.set("weaknesses", weaknesses);
      acc.set("strengths", strengths);
      acc.set("self", self);
      return acc;
    }

    const self = acc.get("self");
    const strengths = acc.get("strengths");
    const resistances = acc.get("resistances");
    const weaknesses = acc.get("weaknesses");
    const neutralTypes = intersection(
      [...currentResistances, ...resistances],
      [...currentWeaknesses, ...weaknesses]
    );

    const mergedSelf = unique([...self, ...currentSelf]);
    const mergedWeaknesses = unique(
      [...weaknesses, ...currentWeaknesses].filter(byDifference(neutralTypes))
    );
    const mergedResistances = unique(
      [...resistances, ...currentResistances].filter(byDifference(neutralTypes))
    );
    const mergedStrengths = unique([...strengths, ...currentStrengths]);

    acc.set("weaknesses", mergedWeaknesses);
    acc.set("resistances", mergedResistances);
    acc.set("strengths", mergedStrengths);
    acc.set("self", mergedSelf);
    return acc;
  };

const createNode = (deps: IDualTypeNodeDeps) => (query: MonsterType[]) =>
  query.reduce(mergeNodes(deps), new Map() as TNode);

export default (deps: IDualTypeNodeDeps): IDualTypeNode => {
  const createMergedNode = createNode(deps);
  return { createMergedNode };
};
