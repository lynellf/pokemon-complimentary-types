import Resistances from "./Resistances";
import Weaknesses from "./Weaknesses";
import Defense from "./Defense";
import TeamBuilder from "./TeamBuilder";
import Offense from "./Offense";
import Node from "./Node";
import Traversal from "./Traversal";
import Strengths from "./Strengths";
import UserInput from "./UserInput";
import DualTypeNode from "./DualTypeNode";
import DualTypeTraversal from "./DualTypeTraversal";
import DualTypeUserInput from "./DualTypeUserInput";
import TypeCoverage from "./TypeCoverage";
import { baseTypes } from "./types";

const getIdealTeam = TeamBuilder({
  baseTypes,
  Resistances,
  Weaknesses,
  Defense,
  Offense,
  Node,
  Traversal,
  Strengths,
  UserInput,
  DualTypeNode,
  DualTypeTraversal,
  DualTypeUserInput,
  TypeCoverage,
});

function main() {
  const query: any = [
    ["grass", "ground"],
    ["electric"],
    ["water", "flying"],
    ["normal"],
    ["ghost"],
    // ["fire", "dark"],
    // ["fire", "fighting"],
    // ["water", "flying"],
    // ["poison", "dark"],
    // ["psychic"],
    // ["ground", "flying"],
    // ["ice"],
    // ["psychic", "steel"],
    // ["dragon", "steel"],
    // ["psychic"],
    // ["normal"],
    // ["water", "fairy"],
    // ["water"],
    // ["psychic", "steel"],
    // ["dragon", "steel"],
    // ["ground", "dragon"],
    // ["fairy", "flying"],
    // ["grass", "poison"],
    // ["bug", "fighting"],
  ];
  // const query: any = [
  //   "water",
  //   "flying",
  //   "fire",
  //   "fighting",
  //   "poison",
  //   "dark",
  //   "ice",
  //   "grass",
  // ];
  const [results, overlap, sharedWeakness, gaps] = getIdealTeam(query);
  console.log({ gaps });
  if (overlap.length) {
    console.log("query:", query);
    console.log("Overlapping inputs:", overlap);
    console.log("Shared weakness:", sharedWeakness);
  } else {
    console.log("no overlapping weaknesses!");
    console.log("query:", query);
  }

  const flatResults = Array.from(new Set(results.flat()));
  const uniqueInputs = Array.from(new Set(query.flat()));
  const difference = <T>(a: T[], b: T[]) => a.filter((x) => !b.includes(x));
  const additions = difference(flatResults, uniqueInputs);
  const hasDifference = additions.length > 0;

  if (hasDifference) {
    console.log(`recommended team type additions:`, additions);
  }
}

main();
