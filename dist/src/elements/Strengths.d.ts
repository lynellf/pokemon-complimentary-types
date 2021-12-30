import type { Types as MonsterType } from "../types";
export interface IStrengths {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
declare const _default: () => IStrengths;
export default _default;
//# sourceMappingURL=Strengths.d.ts.map