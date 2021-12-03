import type { Types } from "./types";
declare type TypeChart = Map<Types, Map<Types, number>>;
declare type TType = [Types, number];
declare type TByValue = (value: number) => (type: TType) => boolean;
interface IResistances {
    getResistances: (type: Types) => Types[];
    byResistance: (type: TType) => boolean;
    asResistance: (query: Types) => Types[];
}
interface IWeaknesses {
    getWeaknesses: (type: Types) => Types[];
    getAllWeaknesses: (types: Types[]) => Types[];
    byWeakness: (type: TType) => boolean;
    byUniqueWeakness: (teamWeaknesses: Types[]) => (type: Types) => boolean;
    getCompliments: (type: Types) => Types[];
}
interface IResistancesDeps {
    asType: ([type]: TType) => Types;
    defChart: (typechart: TypeChart) => (type: Types) => TType[];
    getValueLte: (value: number) => (type: TType) => boolean;
    defenseChart: TypeChart;
}
interface IWeaknessesDeps {
    getValueGte: (value: number) => (type: TType) => boolean;
    asType: ([type]: TType) => Types;
    defChart: (typechart: TypeChart) => (type: Types) => TType[];
    defenseChart: TypeChart;
    unique: <T>(arr: T[]) => T[];
}
declare type TWeaknesses = (deps: IWeaknessesDeps) => IWeaknesses;
declare type TResistances = (deps: IResistancesDeps) => IResistances;
interface IBaseTypesDeps {
    unique: <T>(arr: T[]) => T[];
    asType: ([type]: TType) => Types;
    getValueGte: TByValue;
    getValueLte: TByValue;
    defenseChart: TypeChart;
    defChart: (typechart: TypeChart) => (type: Types) => TType[];
    byNonType: (except: Types[]) => (type: Types) => boolean;
    byNonIntersection: (types: Types[]) => (type: Types) => boolean;
    some: (...bools: boolean[]) => boolean;
}
interface IDefense {
    getResistances: (type: Types) => Types[];
    getWeaknesses: (type: Types) => Types[];
    getAllWeaknesses: (types: Types[]) => Types[];
    byTotalResistances: (typeA: Types, typeB: Types) => number;
    asResistance: (query: Types) => Types[];
    byUniqueWeakness: (teamWeaknesses: Types[]) => (type: Types) => boolean;
    getCompliments: (type: Types) => Types[];
}
interface IDefenseDeps {
    Weaknesses: TWeaknesses;
    Resistances: TResistances;
    baseTypes: IBaseTypesDeps;
}
export default function (deps: IDefenseDeps): IDefense;
export {};
//# sourceMappingURL=Defense.d.ts.map