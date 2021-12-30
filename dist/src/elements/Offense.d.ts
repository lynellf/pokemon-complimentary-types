import type { MonsterType } from "../atoms/types";
export interface IOffense {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
declare const _default: () => IOffense;
export default _default;
//# sourceMappingURL=Offense.d.ts.map