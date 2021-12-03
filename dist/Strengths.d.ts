import type { Types as MonsterType, TypeChart } from "./types";
declare type MatchupTuple = [MonsterType, MatchupTable];
declare type MatchupTable = Map<MonsterType, number>;
export declare const byAdvantage: (type: MonsterType) => ([_, table]: [MonsterType, MatchupTable]) => boolean;
export declare const byDisadvantage: (type: MonsterType) => ([_, table]: [MonsterType, MatchupTable]) => boolean;
export declare const byNeutral: (type: MonsterType) => ([_, table]: [MonsterType, MatchupTable]) => boolean;
export declare const byKeyname: (matchup: MatchupTuple) => MonsterType;
export declare const lookupAdvantages: (typeChart: TypeChart) => (type: MonsterType) => MonsterType[];
export declare const lookupDisadvantages: (typeChart: TypeChart) => (type: MonsterType) => MonsterType[];
export declare const lookupNeutral: (typeChart: TypeChart) => (type: MonsterType) => MonsterType[];
interface IStrengthDeps {
    typeChart: TypeChart;
}
interface IStrengths {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
declare const _default: (deps: IStrengthDeps) => IStrengths;
export default _default;
//# sourceMappingURL=Strengths.d.ts.map