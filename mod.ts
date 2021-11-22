import type { Types } from './types'
import { defenseChart } from './types'

type TType = [Types, number]

function getDefChart(type: Types) {
  return Array.from(defenseChart.get(type)?.entries() ?? [])
}

// query functions
const byResistance = ([_, value]: TType) => value <= 0.5;

const byWeakness = ([_, value]: TType) => value >= 2;

const asType = ([type]: TType) => type;

const asResistance = (weakness: Types) => {
  const weakDefChart = Array.from(defenseChart.get(weakness)?.entries() ?? []);
  const resistances = weakDefChart
    .filter(byResistance)
    .map(asType);
  return resistances
};

const byNonType = (except: Types) => (type: Types) => type !== except;

const byNonIntersection = (types: Types[]) => (type: Types) =>
  !types.includes(type);

const some = (...bools: boolean[]) => bools.some(Boolean);

const byTotalResistances = (typeA: Types, typeB: Types) => {
  const typeADefChart = getDefChart(typeA);
  const typeBDefChart = getDefChart(typeB);
  const typeAResistances = typeADefChart.filter(byResistance);
  const typeBResistances = typeBDefChart.filter(byResistance);
  const typeAWeaknesses = typeADefChart.filter(byWeakness);
  const typeBWeaknesses = typeBDefChart.filter(byWeakness);
  const typeADiff = typeAResistances.length - typeAWeaknesses.length;
  const typeBDiff = typeBResistances.length - typeBWeaknesses.length;
  return typeBDiff - typeADiff;
}

export function getIdealTeam(startingType: Types, teamSize = 6, team = []) {
  const defChart = getDefChart(startingType);
  const weaknesses = defChart.filter(byWeakness).map(asType);
  const compliments = weaknesses.flatMap(asResistance)
    .sort(byTotalResistances)
    .filter(byNonType(startingType))
    .filter(byNonIntersection(team))
  const newTeamSize = teamSize - 1;
  const compliment = compliments[0];
  const hasCompliment = compliment !== undefined;

  if (some(!hasCompliment, newTeamSize === 0)) {
    return team;
  }

  return Array.from(
    new Set(
      getIdealTeam(compliment, newTeamSize, [...team, compliment])
    )
  );
}