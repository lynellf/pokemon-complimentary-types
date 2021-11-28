import type { Types, TypeChart } from "./types";

interface IStrengthDeps {
  typeChart: TypeChart;
}

interface IStrengths {
  getStrengths: (type: Types) => Types[];
  getResistedBy: (type: Types) => Types[];
}

interface IOffenseDeps {
  typeChart: TypeChart;
  Strengths: (deps: IStrengthDeps) => IStrengths;
}

interface IOffense {
  getStrengths: (type: Types) => Types[];
  getResistedBy: (type: Types) => Types[];
}

export default (deps: IOffenseDeps): IOffense => {
  const { typeChart, Strengths } = deps;
  const { getStrengths, getResistedBy } = Strengths({ typeChart });

  return {
    getStrengths,
    getResistedBy,
  };
};
