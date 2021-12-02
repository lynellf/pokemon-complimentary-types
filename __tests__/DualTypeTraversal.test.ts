import Traversal from "../Traversal";
import Node from "../Node";
import DualTypeNode from "../DualTypeNode";
import DualTypeTraversal from "../DualTypeTraversal";
import Offense from "../Offense";
import Defense from "../Defense";
import Strengths from "../Strengths";
import Weaknesses from "../Weaknesses";
import Resistances from "../Resistances";
import { baseTypes } from "../types";

const { unique, intersection } = baseTypes;

const { getWeaknesses, getResistances } = Defense({
  Weaknesses,
  Resistances,
  baseTypes,
});

const { getStrengths, getResistedBy, getNeutral } = Offense({
  Strengths,
  typeChart: baseTypes.defenseChart,
});

const { create: createNode } = Node({
  getResistances,
  getWeaknesses,
  getStrengths,
  getResistedBy,
  getNeutral,
});

const { byCompliment } = Traversal({
  createNode,
  unique: baseTypes.unique,
  intersection: baseTypes.intersection,
});

const { createMergedNode } = DualTypeNode({ createNode, unique, intersection });
const { getCompliments } = DualTypeTraversal({
  createMergedNode,
  byCompliment,
});

describe("dual-type node traversal", () => {
  it("gets complimentary types for a poison-dark type pokemon", () => {
    const results = getCompliments(["poison", "dark"]);
    expect(results.length).toBeGreaterThan(2);
  });
});
