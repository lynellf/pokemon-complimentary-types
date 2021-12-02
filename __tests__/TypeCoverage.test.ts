import Node from "../Node";
import { baseTypes } from "../types";
import Resistances from "../Resistances";
import Weaknesses from "../Weaknesses";
import Strengths from "../Strengths";
import Offense from "../Offense";
import Defense from "../Defense";
import DualTypeNode from "../DualTypeNode";
import TypeCoverage from "../TypeCoverage";

const { intersection, unique } = baseTypes;

const { getWeaknesses, getResistances } = Defense({
  baseTypes,
  Weaknesses,
  Resistances,
});

const { getStrengths, getResistedBy, getNeutral } = Offense({
  typeChart: baseTypes.defenseChart,
  Strengths,
});

const { create: createNode } = Node({
  getStrengths,
  getWeaknesses,
  getResistances,
  getResistedBy,
  getNeutral,
});

const { createMergedNode } = DualTypeNode({ createNode, unique, intersection });
const { findCoverageGaps } = TypeCoverage({
  createMergedNode,
  unique,
  intersection,
});

describe("finding gaps in team coverage", () => {
  it("is a smoke test", () => {
    const [gaps, suggestions] = findCoverageGaps([["fire", "dark"]]);
    expect(gaps.length).toBeGreaterThan(0);
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
