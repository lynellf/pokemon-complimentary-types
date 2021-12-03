import type { Types as MonsterType, TypeChart } from "./types";
interface IStrengthDeps {
    typeChart: TypeChart;
}
interface IStrengths {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
interface IOffenseDeps {
    typeChart: TypeChart;
    Strengths: (deps: IStrengthDeps) => IStrengths;
}
interface IOffense {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
declare const _default: (deps: IOffenseDeps) => IOffense;
export default _default;
//# sourceMappingURL=Offense.d.ts.map