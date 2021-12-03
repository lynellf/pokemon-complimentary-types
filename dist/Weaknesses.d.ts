import type { Types } from "./types";
declare type TType = [Types, number];
declare type TypeChart = Map<Types, Map<Types, number>>;
interface IWeaknessesDeps {
    getValueGte: (value: number) => (type: TType) => boolean;
    asType: ([type]: TType) => Types;
    defChart: (typechart: TypeChart) => (type: Types) => TType[];
    defenseChart: TypeChart;
    unique: <T>(arr: T[]) => T[];
}
interface IWeaknesses {
    getWeaknesses: (type: Types) => Types[];
    getAllWeaknesses: (types: Types[]) => Types[];
    byWeakness: (type: TType) => boolean;
    byUniqueWeakness: (teamWeaknesses: Types[]) => (type: Types) => boolean;
    getCompliments: (type: Types) => Types[];
}
declare const _default: (deps: IWeaknessesDeps) => IWeaknesses;
export default _default;
//# sourceMappingURL=Weaknesses.d.ts.map