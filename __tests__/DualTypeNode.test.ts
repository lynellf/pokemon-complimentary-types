import Node from "../Node";
import { baseTypes } from "../types";
import Resistances from "../Resistances";
import Weaknesses from "../Weaknesses";
import Strengths from "../Strengths";
import Offense from "../Offense";
import Defense from "../Defense";
import DualTypeNode from "../DualTypeNode";

const { intersection, unique } = baseTypes;

const { getWeaknesses, getResistances } = Defense({
  baseTypes,
  Weaknesses,
  Resistances,
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

const { createMergedNode } = DualTypeNode({ createNode, unique, intersection });

describe("creating nodes for possible multi-type pokemon", () => {
  it("creates a node for a single-type pokemon", () => {
    const node = createMergedNode(["water"]);
    const weaknesses = node.get("weaknesses");
    const strengths = node.get("strengths");
    const resistances = node.get("resistances");

    expect(weaknesses.length).toBeGreaterThan(0);
    expect(strengths.length).toBeGreaterThan(0);
    expect(resistances.length).toBeGreaterThan(0);
  });

  it("creates a node for a dual-type pokemon", () => {
    const node = createMergedNode(["water", "flying"]);
    const weaknesses = node.get("weaknesses");
    const strengths = node.get("strengths");
    const resistances = node.get("resistances");

    const expectedWeaknesses = ["electric", "rock"];
    const expectedStrengths = [
      "fire",
      "ground",
      "rock",
      "grass",
      "fighting",
      "bug",
    ];
    const expectedResistances = [
      "fire",
      "water",
      "steel",
      "fighting",
      "ground",
      "bug",
    ];
    expect(weaknesses).toStrictEqual(expectedWeaknesses);
    expect(resistances).toStrictEqual(expectedResistances);
    expect(strengths).toStrictEqual(expectedStrengths);
  });
});
