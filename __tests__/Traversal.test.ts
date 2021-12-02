import Traversal, { byNearestGoodMatchup } from "../Traversal";
import Node from "../Node";
import Offense from "../Offense";
import Defense from "../Defense";
import Strengths from "../Strengths";
import Weaknesses from "../Weaknesses";
import Resistances from "../Resistances";
import { baseTypes } from "../types";

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

const { getCompliments } = Traversal({
  createNode,
  unique: baseTypes.unique,
  intersection: baseTypes.intersection,
});

describe("type node traversal", () => {
  it("finds a list of complimentary types", () => {
    const queryType = "fire";
    const results = getCompliments(queryType);
    expect(results.length).toBeGreaterThan(0);
  });

  it("ensures weaknesses do not overlap between fire and water types", () => {
    const query = "water";
    const nearestCompliment = byNearestGoodMatchup({
      createNode,
      unique: baseTypes.unique,
      results: ["fire"],
      intersection: baseTypes.intersection,
    });
    const results = nearestCompliment(query);
    expect(results).toBe(true);
  });

  it("fails the compliment check due to overapping weaknessess", () => {
    const query = "fire";
    const nearestCompliment = byNearestGoodMatchup({
      createNode,
      unique: baseTypes.unique,
      results: ["steel"],
      intersection: baseTypes.intersection,
    });
    const results = nearestCompliment(query);
    expect(results).toBe(false);
  });
});
