import type { Types as MonsterType } from "./types";

type TNode = Map<
  "strengths" | "weaknesses" | "resistances" | "resistedBy" | "self",
  MonsterType[]
>;

type TFrequencyTable = Map<MonsterType, number>;

type TCreateMergedNode = (query: MonsterType[]) => TNode;

interface IDualTypeUserInputDeps {
  createMergedNode: (query: MonsterType[]) => TNode;
}

interface IDualTypeUserInput {
  checkUserInput: (
    query: MonsterType[][]
  ) => [boolean, MonsterType[][], MonsterType[]];
}

export const byFreqency = (
  table: TFrequencyTable,
  weakness: MonsterType
): TFrequencyTable => {
  const count = table.get(weakness) ?? 0;
  table.set(weakness, count + 1);
  return table;
};

export const byThreshold =
  (max: number) =>
  ([_, count]) =>
    count >= max;

export const inspectWeaknesses =
  (createMergedNode: TCreateMergedNode) =>
  (userInput: MonsterType[][]): [boolean, MonsterType[][], MonsterType[]] => {
    const weaknesses = userInput.map((input) => {
      const node = createMergedNode(input);
      return node.get("weaknesses");
    });
    const allWeaknesses = weaknesses.flat();
    const frequencyTable: TFrequencyTable = allWeaknesses.reduce(
      byFreqency,
      new Map()
    );

    const canContinue = !(
      Array.from(frequencyTable).find(byThreshold(2)) !== undefined
    );

    const offendingTypes = weaknesses
      .map((weaknessArr, i) =>
        weaknessArr.find((type) => frequencyTable.get(type) >= 2) !== undefined
          ? i
          : -1
      )
      .filter((i) => i !== -1)
      .map((i) => userInput[i]);

    const overlappingWeaknesses = Array.from(frequencyTable)
      .filter(byThreshold(2))
      .map(([type]) => type);

    return [canContinue, offendingTypes, overlappingWeaknesses];
  };

export default (deps: IDualTypeUserInputDeps): IDualTypeUserInput => {
  const checkUserInput = inspectWeaknesses(deps.createMergedNode);
  return { checkUserInput };
};
