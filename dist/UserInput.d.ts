import type { Types as MonsterType } from "./types";
declare type TGetWeaknesses = (type: MonsterType) => MonsterType[];
declare type TFrequencyTable = Map<MonsterType, number>;
interface IUserInputDeps {
    getWeaknesses: TGetWeaknesses;
}
export declare const byFreqency: (table: TFrequencyTable, weakness: MonsterType) => TFrequencyTable;
export declare const byThreshold: (max: number) => ([_, count]: [MonsterType, number]) => boolean;
export declare const inspectWeaknesses: (getWeaknesses: TGetWeaknesses) => (userInput: MonsterType[]) => [boolean, MonsterType[], MonsterType[]];
interface IUserInput {
    checkUserInput: (userInput: MonsterType[]) => [boolean, MonsterType[], MonsterType[]];
}
declare const _default: (deps: IUserInputDeps) => IUserInput;
export default _default;
//# sourceMappingURL=UserInput.d.ts.map