import type { MonsterType } from "../atoms/types";
interface IDefense {
    getResistances: (type: MonsterType) => MonsterType[];
    getWeaknesses: (type: MonsterType) => MonsterType[];
    getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
    byTotalResistances: (typeA: MonsterType, typeB: MonsterType) => number;
    asResistance: (query: MonsterType) => MonsterType[];
    byUniqueWeakness: (teamWeaknesses: MonsterType[]) => (type: MonsterType) => boolean;
    getCompliments: (type: MonsterType) => MonsterType[];
}
export default function (): IDefense;
export {};
//# sourceMappingURL=Defense.d.ts.map