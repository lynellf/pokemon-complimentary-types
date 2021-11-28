import Weaknesses from "../Weaknesses";
import Resistances from "../Resistances";
import Defense from "../Defense";
import { baseTypes } from "../types";

const { getCompliments } = Defense({
  Resistances,
  Weaknesses,
  baseTypes,
});

describe("defense", () => {
  it("gets counters for fire weaknessess", () => {
    const compliments = getCompliments("fire");
    expect(compliments.length).toBeTruthy();
  });
});
