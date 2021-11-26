import Resistances from "./Resistances";
import Weaknesses from "./Weaknesses";
import Defense from "./Defense";
import TeamBuilder from "./TeamBuilder";
import { baseTypes } from "./types";

const getIdealTeam = TeamBuilder({
  baseTypes,
  Resistances,
  Weaknesses,
  Defense,
});

// console.log(
//   Array.from(new Set([...getIdealTeam("fire"), ...getIdealTeam("fighting")])).filter(type => type !== "dark" && type !== 'poison')
// );

console.log(getIdealTeam(["fire"]));
