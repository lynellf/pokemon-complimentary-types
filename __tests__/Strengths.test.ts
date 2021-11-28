import Strengths from "../Strengths";
import { defenseChart } from "../types";

const { getStrengths, getResistedBy } = Strengths({ typeChart: defenseChart });

describe("weaknesses", () => {
  it("lists strengths for a given type", () => {
    const weaknessess = getStrengths("fire");
    const expected = ["grass", "ice", "bug", "steel"];
    expect(weaknessess).toStrictEqual(expected);
  });

  it("lists types which resist a given type", () => {
    const resistedBy = getResistedBy("fire");
    const expected = ["fire", "water", "dragon", "rock"];
    expect(resistedBy).toStrictEqual(expected);
  });
});
