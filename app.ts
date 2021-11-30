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
});

function main() {
  const query: any = [
    // ["fire", "fighting"],
    // ["water", "flying"],
    // ["poison", "dark"],
    // ["psychic"],
    // ["ground", "flying"],
    // ["grass", "ice"],
    // ["psychic", "steel"],
    // ["dragon", "steel"],
    ["psychic"],
    // ["water"],
    // ["psychic", "steel"],
    // ["dragon", "steel"],
    // ["ground", "dragon"],
    // ["fairy", "flying"],
    // ["grass", "poison"],
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
  const [results, overlap, sharedWeakness] = getIdealTeam(query);

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
