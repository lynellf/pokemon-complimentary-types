import { Types } from "./types";

type TNode = Map<
  "strengths" | "weaknesses" | "resistances" | "resistedBy" | "self",
  Types[]
>;

interface INodeDeps {
  getStrengths: (type: Types) => Types[];
  getWeaknesses: (type: Types) => Types[];
  getResistances: (type: Types) => Types[];
  getResistedBy: (type: Types) => Types[];
}

interface INode {
  create: (type: Types) => TNode;
}

const node =
  (deps: INodeDeps) =>
  (type: Types): TNode =>
    new Map([
      ["self", [type]],
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
