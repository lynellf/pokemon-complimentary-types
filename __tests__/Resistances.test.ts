import Resistances from "../Resistances";
import { defChart, defenseChart, asType, getValueLte } from "../types";

const { getResistances } = Resistances({
  defChart,
  defenseChart,
  asType,
  getValueLte,
});

describe("Resistances", () => {
  it("lists resistances for a given type", () => {
    const fireResistances = getResistances("fire");
    const expected = ["fire", "grass", "ice", "bug", "steel", "fairy"];
    expect(fireResistances).toStrictEqual(expected);
  });
});
