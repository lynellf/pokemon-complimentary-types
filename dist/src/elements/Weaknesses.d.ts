import { MonsterType } from "../atoms/types";
interface IWeaknesses {
    getWeaknesses: (type: MonsterType) => MonsterType[];
    getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
    byUniqueWeakness: (teamWeaknesses: MonsterType[]) => (type: MonsterType) => boolean;
    getCompliments: (type: MonsterType) => MonsterType[];
}
declare const _default: () => IWeaknesses;
export default _default;
//# sourceMappingURL=Weaknesses.d.ts.map