import type { Types as MonsterType, TypeChart } from "./types";

interface IStrengthDeps {
  typeChart: TypeChart;
}

interface IStrengths {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

interface IOffenseDeps {
  typeChart: TypeChart;
  Strengths: (deps: IStrengthDeps) => IStrengths;
}

interface IOffense {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

export default (deps: IOffenseDeps): IOffense => {
  const { typeChart, Strengths } = deps;
  const { getStrengths, getResistedBy, getNeutral } = Strengths({ typeChart });

  return {
    getStrengths,
    getResistedBy,
    getNeutral,
  };
};
