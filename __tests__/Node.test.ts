import Node from "../Node";
import { baseTypes } from "../types";
import Resistances from "../Resistances";
import Weaknesses from "../Weaknesses";
import Strengths from "../Strengths";
import Offense from "../Offense";
import Defense from "../Defense";

const { getWeaknesses, getResistances } = Defense({
  baseTypes,
  Weaknesses,
  Resistances,
});
const { getStrengths, getResistedBy, getNeutral } = Offense({
  typeChart: baseTypes.defenseChart,
  Strengths,
});
const { create } = Node({
  getStrengths,
  getWeaknesses,
  getResistances,
  getResistedBy,
  getNeutral,
});

describe("type node creation", () => {
  it("should create a node", () => {
    const node = create("fairy");
    const strengths = node.get("strengths");
    const weaknesses = node.get("weaknesses");
    const resistances = node.get("resistances");
    const resistedBy = node.get("resistedBy");

    expect(strengths.length).toBeGreaterThan(0);
    expect(weaknesses.length).toBeGreaterThan(0);
    expect(resistances.length).toBeGreaterThan(0);
    expect(resistedBy.length).toBeGreaterThan(0);
  });
});
