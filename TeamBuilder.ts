import type { Types as MonsterType } from "./types";

type TypeChart = Map<MonsterType, Map<MonsterType, number>>;
type TType = [MonsterType, number];
type TByValue = (value: number) => (type: TType) => boolean;
type TGetWeaknesses = (type: MonsterType) => MonsterType[];

interface ITypeCoverageDeps {
  createMergedNode: (query: MonsterType[]) => TNodeLiteral;
  unique: <T>(arr: T[]) => T[];
  intersection: <T>(arr1: T[], arr2: T[]) => T[];
}
interface ITypeCoverage {
  findCoverageGaps: (
    query: MonsterType[][]
  ) => [MonsterType[], MonsterType[][]];
}

type TTypeCoverage = (deps: ITypeCoverageDeps) => ITypeCoverage;

interface IDualTypeTraversalDeps {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  createMergedNode: (query: MonsterType[]) => TNodeLiteral;
}

interface IDualTypeTraversal {
  getCompliments: (
    query: MonsterType[],
    index?: number,
    queries?: MonsterType[][]
  ) => MonsterType[];
}

type TDualTypeTraversal = (deps: IDualTypeTraversalDeps) => IDualTypeTraversal;

interface IDualTypeNodeDeps {
  createNode: (type: MonsterType) => TNodeLiteral;
  unique: <T>(array: T[]) => T[];
  intersection: <T>(a: T[], b: T[]) => T[];
}
interface IDualTypeNode {
  createMergedNode: (query: MonsterType[]) => TNodeLiteral;
}

type TDualTypeNode = (deps: IDualTypeNodeDeps) => IDualTypeNode;

interface IDualTypeUserInputDeps {
  createMergedNode: (query: MonsterType[]) => TNodeLiteral;
}

interface IDualTypeUserInput {
  checkUserInput: (
    query: MonsterType[][]
  ) => [boolean, MonsterType[][], MonsterType[]];
}

type TDualUserInput = (deps: IDualTypeUserInputDeps) => IDualTypeUserInput;

interface IUserInputDeps {
  getWeaknesses: TGetWeaknesses;
}

interface IUserInput {
  checkUserInput: (
    userInput: MonsterType[]
  ) => [boolean, MonsterType[], MonsterType[]];
}

type TUserInput = (deps: IUserInputDeps) => IUserInput;

interface ITraversalDeps {
  createNode: (type: MonsterType) => TNodeLiteral;
  unique: <T>(array: T[]) => T[];
  intersection: <T>(a: T[], b: T[]) => T[];
}

interface ITraversal {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  getCompliments: (
    query: MonsterType,
    index?: number,
    queries?: MonsterType[]
  ) => MonsterType[];
}

type TTraversal = (deps: ITraversalDeps) => ITraversal;

type TNodeLiteral = Map<
  | "strengths"
  | "weaknesses"
  | "resistances"
  | "resistedBy"
  | "self"
  | "neutral",
  MonsterType[]
>;

interface IStrengthDeps {
  typeChart: TypeChart;
}
interface IStrengths {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

type TStrengths = (deps: IStrengthDeps) => IStrengths;
interface IOffenseDeps {
  typeChart: TypeChart;
  Strengths: (deps: IStrengthDeps) => IStrengths;
}

interface IOffense {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

type TOffense = (deps: IOffenseDeps) => IOffense;

interface INodeDeps {
  getStrengths: (type: MonsterType) => MonsterType[];
  getWeaknesses: (type: MonsterType) => MonsterType[];
  getResistances: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

interface INode {
  create: (type: MonsterType) => TNodeLiteral;
}

type TNode = (deps: INodeDeps) => INode;

interface IWeaknesses {
  getWeaknesses: (type: MonsterType) => MonsterType[];
  getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
  byWeakness: (type: TType) => boolean;
  byUniqueWeakness: (
    teamWeaknesses: MonsterType[]
  ) => (type: MonsterType) => boolean;
  getCompliments: (type: MonsterType) => MonsterType[];
}

interface IResistances {
  getResistances: (type: MonsterType) => MonsterType[];
  byResistance: (type: TType) => boolean;
  asResistance: (query: MonsterType) => MonsterType[];
}

interface IDefense {
  getResistances: (type: MonsterType) => MonsterType[];
  getWeaknesses: (type: MonsterType) => MonsterType[];
  getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
  byTotalResistances: (typeA: MonsterType, typeB: MonsterType) => number;
  asResistance: (query: MonsterType) => MonsterType[];
  byUniqueWeakness: (
    teamWeaknesses: MonsterType[]
  ) => (type: MonsterType) => boolean;
  getCompliments: (type: MonsterType) => MonsterType[];
}

interface IResistancesDeps {
  asType: ([type]: TType) => MonsterType;
  defChart: (typechart: TypeChart) => (type: MonsterType) => TType[];
  getValueLte: (value: number) => (type: TType) => boolean;
  defenseChart: TypeChart;
}

interface IWeaknessesDeps {
  getValueGte: (value: number) => (type: TType) => boolean;
  asType: ([type]: TType) => MonsterType;
  defChart: (typechart: TypeChart) => (type: MonsterType) => TType[];
  defenseChart: TypeChart;
  unique: <T>(arr: T[]) => T[];
}

type TWeaknesses = (deps: IWeaknessesDeps) => IWeaknesses;

type TResistances = (deps: IResistancesDeps) => IResistances;

interface IBaseTypesDeps {
  unique: <T>(arr: T[]) => T[];
  asType: ([type]: TType) => MonsterType;
  getValueGte: TByValue;
  getValueLte: TByValue;
  defenseChart: TypeChart;
  defChart: (typechart: TypeChart) => (type: MonsterType) => TType[];
  byNonType: (except: MonsterType[]) => (type: MonsterType) => boolean;
  byNonIntersection: (types: MonsterType[]) => (type: MonsterType) => boolean;
  some: (...bools: boolean[]) => boolean;
  intersection: <T>(a: T[], b: T[]) => T[];
}

interface IDefenseDeps {
  Weaknesses: TWeaknesses;
  Resistances: TResistances;
  baseTypes: IBaseTypesDeps;
}

type TDefense = (deps: IDefenseDeps) => IDefense;
interface IOptions {
  checkInput: boolean;
}

type TGetIdealTeam = (
  query: MonsterType[][]
) => [MonsterType[], MonsterType[][], MonsterType[], MonsterType[]];
interface ITeamBuilderDeps {
  Weaknesses: TWeaknesses;
  Resistances: TResistances;
  Strengths: TStrengths;
  Defense: TDefense;
  Offense: TOffense;
  Traversal: TTraversal;
  Node: TNode;
  baseTypes: IBaseTypesDeps;
  UserInput: TUserInput;
  DualTypeUserInput: TDualUserInput;
  DualTypeNode: TDualTypeNode;
  DualTypeTraversal: TDualTypeTraversal;
  TypeCoverage: TTypeCoverage;
}
function TeamBuilder(deps: ITeamBuilderDeps): TGetIdealTeam {
  const {
    Weaknesses,
    Resistances,
    Defense,
    baseTypes,
    Offense,
    Node,
    Strengths,
    Traversal,
    DualTypeUserInput,
    DualTypeNode,
    DualTypeTraversal,
    TypeCoverage,
  } = deps;
  const { unique, intersection, defenseChart: typeChart } = baseTypes;
  const { getWeaknesses, getResistances } = Defense({
    Weaknesses,
    Resistances,
    baseTypes,
  });
  const { getStrengths, getResistedBy, getNeutral } = Offense({
    typeChart,
    Strengths,
  });
  const { create: createNode } = Node({
    getResistances,
    getWeaknesses,
    getResistedBy,
    getStrengths,
    getNeutral,
  });
  const { byCompliment } = Traversal({ createNode, unique, intersection });
  const { createMergedNode } = DualTypeNode({
    createNode,
    unique,
    intersection,
  });
  const { checkUserInput } = DualTypeUserInput({ createMergedNode });
  const { getCompliments } = DualTypeTraversal({
    createMergedNode,
    byCompliment,
  });

  const { findCoverageGaps } = TypeCoverage({
    createMergedNode,
    intersection,
    unique,
  });

  const getIdealTeam = (
    query: MonsterType[][]
  ): [MonsterType[], MonsterType[][], MonsterType[], MonsterType[]] => {
    const [_isValid, offendingTypes, sharedWeakness] = checkUserInput(query);
    const [gaps, suggestions] = findCoverageGaps(query);
    const results = unique([...query, ...suggestions].flatMap(getCompliments));
    return [results, offendingTypes, sharedWeakness, gaps];
  };

  return getIdealTeam;
}

export default TeamBuilder;
