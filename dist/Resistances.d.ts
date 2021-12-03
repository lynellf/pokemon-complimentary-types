import type { Types } from "./types";
declare type TType = [Types, number];
declare type TypeChart = Map<Types, Map<Types, number>>;
interface IResistancesDeps {
    asType: ([type]: TType) => Types;
    defChart: (typechart: TypeChart) => (type: Types) => TType[];
    getValueLte: (value: number) => (type: TType) => boolean;
    defenseChart: TypeChart;
}
interface IResistances {
    getResistances: (type: Types) => Types[];
    byResistance: (type: TType) => boolean;
    asResistance: (query: Types) => Types[];
}
declare const _default: (deps: IResistancesDeps) => IResistances;
export default _default;
//# sourceMappingURL=Resistances.d.ts.map