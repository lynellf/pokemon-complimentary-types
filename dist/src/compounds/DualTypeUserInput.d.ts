import type { MonsterType, TNode } from "../atoms/types";
declare type TFrequencyTable = Map<MonsterType, number>;
declare type TContext = {
    frequencyTable: TFrequencyTable;
    weaknesses: MonsterType[][];
    overlappingWeaknesses: MonsterType[];
    offendingTypes: MonsterType[][];
    canContinue: boolean;
};
interface IDualTypeUserInput {
    checkUserInput: (query: MonsterType[][]) => [boolean, MonsterType[][], MonsterType[]];
}
export declare const byFrequency: (table: TFrequencyTable, weakness: MonsterType) => TFrequencyTable;
export declare const byThreshold: (max: number) => ([_, count]: [any, any]) => boolean;
export declare function createNode(types: MonsterType[]): TNode;
export declare function getWeaknessesFromNode(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getFreqTable(types: MonsterType[][]): TFrequencyTable;
export declare function checkFrequencies(table: TFrequencyTable): (threshold: number) => boolean;
export declare function getOffendingTypes(weaknesses: MonsterType[][]): (frequencyTable: TFrequencyTable) => (userInput: MonsterType[][]) => import("../atoms/primitives").MonsterType[][];
export declare function getOverlappingWeaknesses(frequencyTable: TFrequencyTable): import("../atoms/primitives").MonsterType[];
export declare function setCtx(newCtx: Partial<TContext>): (currentCtx: Partial<TContext>) => {
    frequencyTable?: TFrequencyTable;
    weaknesses?: import("../atoms/primitives").MonsterType[][];
    overlappingWeaknesses?: import("../atoms/primitives").MonsterType[];
    offendingTypes?: import("../atoms/primitives").MonsterType[][];
    canContinue?: boolean;
};
export declare function withWeaknesses(userInput: MonsterType[][]): (ctx: Partial<TContext>) => {
    weaknesses: import("../atoms/primitives").MonsterType[][];
    frequencyTable?: TFrequencyTable;
    overlappingWeaknesses?: import("../atoms/primitives").MonsterType[];
    offendingTypes?: import("../atoms/primitives").MonsterType[][];
    canContinue?: boolean;
};
export declare function withFrequencyTable(ctx: Partial<TContext>): {
    frequencyTable: TFrequencyTable;
    weaknesses?: import("../atoms/primitives").MonsterType[][];
    overlappingWeaknesses?: import("../atoms/primitives").MonsterType[];
    offendingTypes?: import("../atoms/primitives").MonsterType[][];
    canContinue?: boolean;
};
export declare function withCanContinue(ctx: Partial<TContext>): {
    canContinue: boolean;
    frequencyTable?: TFrequencyTable;
    weaknesses?: import("../atoms/primitives").MonsterType[][];
    overlappingWeaknesses?: import("../atoms/primitives").MonsterType[];
    offendingTypes?: import("../atoms/primitives").MonsterType[][];
};
export declare function withOffendingTypes(userInput: MonsterType[][]): (ctx: Partial<TContext>) => {
    offendingTypes: import("../atoms/primitives").MonsterType[][];
    frequencyTable?: TFrequencyTable;
    weaknesses?: import("../atoms/primitives").MonsterType[][];
    overlappingWeaknesses?: import("../atoms/primitives").MonsterType[];
    canContinue?: boolean;
};
export declare function withOverlappingWeaknesses(ctx: Partial<TContext>): {
    overlappingWeaknesses: import("../atoms/primitives").MonsterType[];
    frequencyTable?: TFrequencyTable;
    weaknesses?: import("../atoms/primitives").MonsterType[][];
    offendingTypes?: import("../atoms/primitives").MonsterType[][];
    canContinue?: boolean;
};
export declare const checkUserInput: (userInput: MonsterType[][]) => [boolean, MonsterType[][], MonsterType[]];
declare const _default: () => IDualTypeUserInput;
export default _default;
//# sourceMappingURL=DualTypeUserInput.d.ts.map