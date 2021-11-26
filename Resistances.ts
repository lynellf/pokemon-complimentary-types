import type { Types } from "./types";

type TType = [Types, number];
type TypeChart = Map<Types, Map<Types, number>>;

interface IGetResistancesDeps {
  getDefChart: (type: Types) => TType[];
  byResistance: (type: TType) => boolean;
  asType: (type: TType) => Types;
}
const resistances = (deps: IGetResistancesDeps) => (type: Types) => {
  const { getDefChart, byResistance, asType } = deps;
  const defChart = getDefChart(type);
  const resistances = defChart.filter(byResistance).map(asType);
  return resistances;
};

type TGetResistances = (type: Types) => Types[];
const resistanceFilter =
  (getResistances: TGetResistances) => (query: Types) => {
    const resistances = getResistances(query);
    return resistances;
  };

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

export default (deps: IResistancesDeps): IResistances => {
  const { asType, getValueLte, defChart, defenseChart } = deps;
  const byResistance = getValueLte(0.5);
  const getDefChart = defChart(defenseChart);
  const getResistances = resistances({ getDefChart, byResistance, asType });
  const asResistance = resistanceFilter(getResistances);
  return { getResistances, byResistance, asResistance };
};
