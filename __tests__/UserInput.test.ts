import { baseTypes } from "../types";
import Weaknesses from "../Weaknesses";
import UserInput from "../UserInput";

const { defChart, defenseChart, asType, unique, getValueGte } = baseTypes;
const { getWeaknesses } = Weaknesses({
  defenseChart,
  defChart,
  asType,
  unique,
  getValueGte,
});
const { checkUserInput } = UserInput({ getWeaknesses });

describe("user input validation", () => {
  it("passes", () => {
    const [isValid] = checkUserInput(["fire", "water"]);
    expect(isValid).toBe(true);
  });

  it("fails", () => {
    const [isValid] = checkUserInput(["flying", "water"]);
    expect(isValid).toBe(false);
  });

  it("fails with context", () => {
    const [isValid, offendingTypes, sharedWeakness] = checkUserInput([
      "flying",
      "water",
      "fighting",
    ]);
    const expectedOffenders = ["flying", "water"];
    const expectedWeaknesses = ["electric"];
    expect(isValid).toBe(false);
    expect(expectedOffenders).toStrictEqual(offendingTypes);
    expect(expectedWeaknesses).toStrictEqual(sharedWeakness);
  });
});
