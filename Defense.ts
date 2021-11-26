import type { Types } from "./types";

type TypeChart = Map<Types, Map<Types, number>>;
type TType = [Types, number];
type TByValue = (value: number) => (type: TType) => boolean;

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

type TWeaknesses = (deps: IWeaknessesDeps) => IWeaknesses;

type TResistances = (deps: IResistancesDeps) => IResistances;

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

interface IDifferenceDeps {
  getDefChart: (type: Types) => TType[];
  byResistance: (type: TType) => boolean;
  byWeakness: (type: TType) => boolean;
}
const difference = (deps: IDifferenceDeps) => (typeA: Types, typeB: Types) => {
  const { getDefChart, byResistance, byWeakness } = deps;
  const typeADefChart = getDefChart(typeA);
  const typeBDefChart = getDefChart(typeB);
  const typeAResistances = typeADefChart.filter(byResistance);
  const typeBResistances = typeBDefChart.filter(byResistance);
  const typeAWeaknesses = typeADefChart.filter(byWeakness);
  const typeBWeaknesses = typeBDefChart.filter(byWeakness);
  const typeADiff = typeAResistances.length - typeAWeaknesses.length;
  const typeBDiff = typeBResistances.length - typeBWeaknesses.length;
  return typeBDiff - typeADiff;
};

interface IDefense {
  getResistances: (type: Types) => Types[];
  getWeaknesses: (type: Types) => Types[];
  getAllWeaknesses: (types: Types[]) => Types[];
  byTotalResistances: (typeA: Types, typeB: Types) => number;
  asResistance: (query: Types) => Types[];
  byUniqueWeakness: (teamWeaknesses: Types[]) => (type: Types) => boolean;
}

interface IDefenseDeps {
  Weaknesses: TWeaknesses;
  Resistances: TResistances;
  baseTypes: IBaseTypesDeps;
}
export default function (deps: IDefenseDeps): IDefense {
  const {
    Weaknesses,
    Resistances,
    baseTypes: {
      unique,
      asType,
      getValueLte,
      getValueGte,
      defChart,
      defenseChart,
    },
  } = deps;
  const { getResistances, byResistance, asResistance } = Resistances({
    asType,
    getValueLte,
    defChart,
    defenseChart,
  });
  const { getWeaknesses, getAllWeaknesses, byWeakness, byUniqueWeakness } =
    Weaknesses({
      asType,
      getValueGte,
      defChart,
      defenseChart,
      unique,
    });
  const byTotalResistances = difference({
    getDefChart: defChart(defenseChart),
    byResistance,
    byWeakness,
  });

  return {
    getResistances,
    getWeaknesses,
    getAllWeaknesses,
    byTotalResistances,
    asResistance,
    byUniqueWeakness,
  };
}
