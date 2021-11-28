import type { Types, TypeChart } from "./types";

type MatchupTuple = [Types, MatchupTable];
type MatchupTable = Map<Types, number>;

export const byAdvantage =
  (type: Types) =>
  ([_, table]: [Types, MatchupTable]): boolean =>
    table.get(type) >= 2;

export const byDisadvantage =
  (type: Types) =>
  ([_, table]: [Types, MatchupTable]): boolean =>
    table.get(type) <= 0.5;

export const byKeyname = (matchup: MatchupTuple): Types => matchup[0];

export const lookupAdvantages =
  (typeChart: TypeChart) =>
  (type: Types): Types[] =>
    Array.from(typeChart).filter(byAdvantage(type)).map(byKeyname);

export const lookupDisadvantages =
  (typeChart: TypeChart) =>
  (type: Types): Types[] =>
    Array.from(typeChart).filter(byDisadvantage(type)).map(byKeyname);

interface IStrengthDeps {
  typeChart: TypeChart;
}

interface IStrengths {
  getStrengths: (type: Types) => Types[];
  getResistedBy: (type: Types) => Types[];
}
export default (deps: IStrengthDeps): IStrengths => {
  const { typeChart } = deps;
  const getStrengths = lookupAdvantages(typeChart);
  const getResistedBy = lookupDisadvantages(typeChart);
  return { getStrengths, getResistedBy };
};
