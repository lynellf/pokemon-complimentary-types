import { Types as MonsterType } from "./types";

type TNode = Map<
  | "strengths"
  | "weaknesses"
  | "resistances"
  | "resistedBy"
  | "self"
  | "neutral",
  MonsterType[]
>;

interface INodeDeps {
  getStrengths: (type: MonsterType) => MonsterType[];
  getWeaknesses: (type: MonsterType) => MonsterType[];
  getResistances: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

interface INode {
  create: (type: MonsterType) => TNode;
}

const node =
  (deps: INodeDeps) =>
  (type: MonsterType): TNode =>
    new Map([
      ["self", [type]],
      ["neutral", deps.getNeutral(type)],
      ["resistedBy", deps.getResistedBy(type)],
      ["strengths", deps.getStrengths(type)],
      ["weaknesses", deps.getWeaknesses(type)],
      ["resistances", deps.getResistances(type)],
    ]);

export default (deps: INodeDeps): INode => {
  const create = node(deps);

  return {
    create,
  };
};
