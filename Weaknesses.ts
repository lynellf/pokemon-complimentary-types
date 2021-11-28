import type { Types } from "./types";

type TType = [Types, number];
type TypeChart = Map<Types, Map<Types, number>>;

interface IGetWeaknessesDeps {
  getDefChart: (type: Types) => TType[];
  byWeakness: (type: TType) => boolean;
  asType: (type: TType) => Types;
}
const weaknesses = (deps: IGetWeaknessesDeps) => (type: Types) => {
  const { getDefChart, byWeakness, asType } = deps;
  const defChart = getDefChart(type);
  const weaknesses = defChart.filter(byWeakness).map(asType);
  return weaknesses;
};

interface IGetComplementsDeps {
  getWeaknesses: TGetWeaknesses;
  unique: <T>(arr: T[]) => T[];
}
const compliments = (deps: IGetComplementsDeps) => (type: Types) => {
  const { getWeaknesses, unique } = deps;
  const weaknesses = getWeaknesses(type);
  const compliments = weaknesses.flatMap(getWeaknesses);
  return unique(compliments);
};

interface IGetAllWeaknessesDeps {
  unique: <T>(arr: T[]) => T[];
  getWeaknesses: (type: Types) => Types[];
}
const allWeaknesses = (deps: IGetAllWeaknessesDeps) => (team: Types[]) => {
  const { unique, getWeaknesses } = deps;
  return unique(team.flatMap(getWeaknesses));
};
type TGetWeaknesses = (type: Types) => Types[];
const uniqueWeakness =
  (getWeaknesses: TGetWeaknesses) => (teamWeaknesses: Types[]) => {
    return (type: Types) => {
      const weaknesses = getWeaknesses(type);
      const isUnique = weaknesses.every(
        (weakness) => !teamWeaknesses.includes(weakness)
      );
      return isUnique;
    };
  };

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

export default (deps: IWeaknessesDeps): IWeaknesses => {
  const { getValueGte, asType, defChart, defenseChart, unique } = deps;
  const byWeakness = getValueGte(2);
  const getDefChart = defChart(defenseChart);
  const getWeaknesses = weaknesses({ getDefChart, byWeakness, asType });
  const getAllWeaknesses = allWeaknesses({ unique, getWeaknesses });
  const byUniqueWeakness = uniqueWeakness(getWeaknesses);
  const getCompliments = compliments({ getWeaknesses, unique });
  return {
    getWeaknesses,
    getAllWeaknesses,
    byWeakness,
    byUniqueWeakness,
    getCompliments,
  };
};
