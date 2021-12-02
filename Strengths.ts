import type { Types as MonsterType, TypeChart } from "./types";

type MatchupTuple = [MonsterType, MatchupTable];
type MatchupTable = Map<MonsterType, number>;

export const byAdvantage =
  (type: MonsterType) =>
  ([_, table]: [MonsterType, MatchupTable]): boolean =>
    table.get(type) >= 2;

export const byDisadvantage =
  (type: MonsterType) =>
  ([_, table]: [MonsterType, MatchupTable]): boolean =>
    table.get(type) <= 0.5;

export const byNeutral =
  (type: MonsterType) =>
  ([_, table]: [MonsterType, MatchupTable]): boolean =>
    table.get(type) === undefined;

export const byKeyname = (matchup: MatchupTuple): MonsterType => matchup[0];

export const lookupAdvantages =
  (typeChart: TypeChart) =>
  (type: MonsterType): MonsterType[] =>
    Array.from(typeChart).filter(byAdvantage(type)).map(byKeyname);

export const lookupDisadvantages =
  (typeChart: TypeChart) =>
  (type: MonsterType): MonsterType[] =>
    Array.from(typeChart).filter(byDisadvantage(type)).map(byKeyname);

export const lookupNeutral =
  (typeChart: TypeChart) =>
  (type: MonsterType): MonsterType[] =>
    Array.from(typeChart).filter(byNeutral(type)).map(byKeyname);

interface IStrengthDeps {
  typeChart: TypeChart;
}

interface IStrengths {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}
export default (deps: IStrengthDeps): IStrengths => {
  const { typeChart } = deps;
  const getStrengths = lookupAdvantages(typeChart);
  const getResistedBy = lookupDisadvantages(typeChart);
  const getNeutral = lookupNeutral(typeChart);
  return { getStrengths, getResistedBy, getNeutral };
};
