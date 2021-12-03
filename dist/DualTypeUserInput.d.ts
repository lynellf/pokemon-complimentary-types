import type { Types as MonsterType } from "./types";
declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
declare type TFrequencyTable = Map<MonsterType, number>;
declare type TCreateMergedNode = (query: MonsterType[]) => TNode;
interface IDualTypeUserInputDeps {
    createMergedNode: (query: MonsterType[]) => TNode;
}
interface IDualTypeUserInput {
    checkUserInput: (query: MonsterType[][]) => [boolean, MonsterType[][], MonsterType[]];
}
export declare const byFreqency: (table: TFrequencyTable, weakness: MonsterType) => TFrequencyTable;
export declare const byThreshold: (max: number) => ([_, count]: [any, any]) => boolean;
export declare const inspectWeaknesses: (createMergedNode: TCreateMergedNode) => (userInput: MonsterType[][]) => [boolean, MonsterType[][], MonsterType[]];
declare const _default: (deps: IDualTypeUserInputDeps) => IDualTypeUserInput;
export default _default;
//# sourceMappingURL=DualTypeUserInput.d.ts.map