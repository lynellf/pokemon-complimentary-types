import type { Types } from "./types";

type TypeChart = Map<Types, Map<Types, number>>;
type TType = [Types, number];
type TByValue = (value: number) => (type: TType) => boolean;

interface IWeaknesses {
  getWeaknesses: (type: Types) => Types[];
  getAllWeaknesses: (types: Types[]) => Types[];
  byWeakness: (type: TType) => boolean;
  byUniqueWeakness: (teamWeaknesses: Types[]) => (type: Types) => boolean;
}

interface IResistances {
  getResistances: (type: Types) => Types[];
  byResistance: (type: TType) => boolean;
  asResistance: (query: Types) => Types[];
}

interface IDefense {
  getResistances: (type: Types) => Types[];
  getWeaknesses: (type: Types) => Types[];
  getAllWeaknesses: (types: Types[]) => Types[];
  byTotalResistances: (typeA: Types, typeB: Types) => number;
  asResistance: (query: Types) => Types[];
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

interface IDefenseDeps {
  Weaknesses: TWeaknesses;
  Resistances: TResistances;
  baseTypes: IBaseTypesDeps;
}

type TDefense = (deps: IDefenseDeps) => IDefense;

interface ITeamBuilderDeps {
  Weaknesses: TWeaknesses;
  Resistances: TResistances;
  Defense: TDefense;
  baseTypes: IBaseTypesDeps;
}
function TeamBuilder(deps: ITeamBuilderDeps) {
  const { Weaknesses, Resistances, Defense, baseTypes } = deps;
  const {
    getAllWeaknesses,
    asResistance,
    byTotalResistances,
    byUniqueWeakness,
  } = Defense({
    Weaknesses,
    Resistances,
    baseTypes,
  });
  const { unique, some, byNonIntersection, byNonType } = baseTypes;
  const getIdealTeam = (query: Types[], teamSize = 6, team = []): Types[] => {
    const weaknesses = getAllWeaknesses(query);
    const teamWeaknesses = getAllWeaknesses(team);
    const compliments = weaknesses
      .flatMap(asResistance)
      .sort(byTotalResistances)
      .filter(byNonType(query))
      .filter(byNonIntersection(team))
      .filter(byUniqueWeakness(teamWeaknesses));
    const newTeamSize = teamSize - 1;
    const hasCompliments = compliments.length > 0;

    if (some(!hasCompliments, newTeamSize === 0)) {
      return team;
    }

    const results = getIdealTeam(compliments, newTeamSize, [
      ...query,
      ...team,
      ...compliments,
    ]);
    return unique(results);
  };

  return getIdealTeam;
}

export default TeamBuilder;
