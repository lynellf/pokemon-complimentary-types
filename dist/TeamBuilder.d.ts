import type { Types as MonsterType } from "./types";
declare type TypeChart = Map<MonsterType, Map<MonsterType, number>>;
declare type TType = [MonsterType, number];
declare type TByValue = (value: number) => (type: TType) => boolean;
declare type TGetWeaknesses = (type: MonsterType) => MonsterType[];
interface ITypeCoverageDeps {
    createMergedNode: (query: MonsterType[]) => TNodeLiteral;
    unique: <T>(arr: T[]) => T[];
    intersection: <T>(arr1: T[], arr2: T[]) => T[];
}
interface ITypeCoverage {
    findCoverageGaps: (query: MonsterType[][]) => [MonsterType[], MonsterType[][]];
}
declare type TTypeCoverage = (deps: ITypeCoverageDeps) => ITypeCoverage;
interface IDualTypeTraversalDeps {
    byCompliment: (results: MonsterType[], weakness: MonsterType) => MonsterType[];
    createMergedNode: (query: MonsterType[]) => TNodeLiteral;
}
interface IDualTypeTraversal {
    getCompliments: (query: MonsterType[], index?: number, queries?: MonsterType[][]) => MonsterType[];
}
declare type TDualTypeTraversal = (deps: IDualTypeTraversalDeps) => IDualTypeTraversal;
interface IDualTypeNodeDeps {
    createNode: (type: MonsterType) => TNodeLiteral;
    unique: <T>(array: T[]) => T[];
    intersection: <T>(a: T[], b: T[]) => T[];
}
interface IDualTypeNode {
    createMergedNode: (query: MonsterType[]) => TNodeLiteral;
}
declare type TDualTypeNode = (deps: IDualTypeNodeDeps) => IDualTypeNode;
interface IDualTypeUserInputDeps {
    createMergedNode: (query: MonsterType[]) => TNodeLiteral;
}
interface IDualTypeUserInput {
    checkUserInput: (query: MonsterType[][]) => [boolean, MonsterType[][], MonsterType[]];
}
declare type TDualUserInput = (deps: IDualTypeUserInputDeps) => IDualTypeUserInput;
interface IUserInputDeps {
    getWeaknesses: TGetWeaknesses;
}
interface IUserInput {
    checkUserInput: (userInput: MonsterType[]) => [boolean, MonsterType[], MonsterType[]];
}
declare type TUserInput = (deps: IUserInputDeps) => IUserInput;
interface ITraversalDeps {
    createNode: (type: MonsterType) => TNodeLiteral;
    unique: <T>(array: T[]) => T[];
    intersection: <T>(a: T[], b: T[]) => T[];
}
interface ITraversal {
    byCompliment: (results: MonsterType[], weakness: MonsterType) => MonsterType[];
    getCompliments: (query: MonsterType, index?: number, queries?: MonsterType[]) => MonsterType[];
}
declare type TTraversal = (deps: ITraversalDeps) => ITraversal;
declare type TNodeLiteral = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface IStrengthDeps {
    typeChart: TypeChart;
}
interface IStrengths {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
declare type TStrengths = (deps: IStrengthDeps) => IStrengths;
interface IOffenseDeps {
    typeChart: TypeChart;
    Strengths: (deps: IStrengthDeps) => IStrengths;
}
interface IOffense {
    getStrengths: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
declare type TOffense = (deps: IOffenseDeps) => IOffense;
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
declare type TNode = (deps: INodeDeps) => INode;
interface IWeaknesses {
    getWeaknesses: (type: MonsterType) => MonsterType[];
    getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
    byWeakness: (type: TType) => boolean;
    byUniqueWeakness: (teamWeaknesses: MonsterType[]) => (type: MonsterType) => boolean;
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
    byUniqueWeakness: (teamWeaknesses: MonsterType[]) => (type: MonsterType) => boolean;
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
declare type TWeaknesses = (deps: IWeaknessesDeps) => IWeaknesses;
declare type TResistances = (deps: IResistancesDeps) => IResistances;
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
declare type TDefense = (deps: IDefenseDeps) => IDefense;
declare type TGetIdealTeam = (query: MonsterType[][]) => [MonsterType[], MonsterType[][], MonsterType[], MonsterType[]];
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
declare function TeamBuilder(deps: ITeamBuilderDeps): TGetIdealTeam;
export default TeamBuilder;
//# sourceMappingURL=TeamBuilder.d.ts.map