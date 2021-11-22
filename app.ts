import { getIdealTeam } from './mod'

console.log(
  Array.from(new Set([...getIdealTeam("fire"), ...getIdealTeam("fighting")])).filter(type => type !== "dark" && type !== 'poison')
);

console.log(getIdealTeam('fire'))