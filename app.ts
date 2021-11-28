import Resistances from "./Resistances";
import Weaknesses from "./Weaknesses";
import Defense from "./Defense";
import TeamBuilder from "./TeamBuilder";
import Offense from "./Offense";
import Node from "./Node";
import Traversal from "./Traversal";
import Strengths from "./Strengths";
import UserInput from "./UserInput";
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
});

function main() {
  const query: any = [
    // "fire",
    // "fighting",
    "water",
    "flying",
    // "poison",
    // "dark",
    // "grass",
    // "ice",
    "psychic",
    "steel",
    // "dragon",
    // "steel",
  ];
  const [results, overlap, sharedWeakness] = getIdealTeam(query);

  if (overlap.length) {
    console.log("query:", query);
    console.log("Overlapping inputs:", overlap);
    console.log("Shared weakness:", sharedWeakness);
  }

  console.log(`results:`, results);
}

main();
