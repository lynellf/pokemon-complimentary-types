import type { Types as MonsterType } from "./types";
declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface ITraversalDeps {
    createNode: (type: MonsterType) => TNode;
    unique: <T>(array: T[]) => T[];
    intersection: <T>(a: T[], b: T[]) => T[];
}
interface ITraversal {
    byCompliment: (results: MonsterType[], weakness: MonsterType) => MonsterType[];
    getCompliments: (query: MonsterType, index?: number, queries?: MonsterType[]) => MonsterType[];
}
interface ISharedWeaknessesDeps {
    createNode: (type: MonsterType) => TNode;
    intersection: <T>(a: T[], b: T[]) => T[];
    badMatchups: MonsterType[];
}
export declare const bySharedWeaknesses: (deps: ISharedWeaknessesDeps) => (compliment: MonsterType) => boolean;
interface INearestMatchDeps {
    createNode: (type: MonsterType) => TNode;
    unique: <T>(array: T[]) => T[];
    results: MonsterType[];
    intersection: <T>(a: T[], b: T[]) => T[];
}
export declare const byNearestGoodMatchup: (deps: INearestMatchDeps) => (potentialCompliment: MonsterType) => boolean;
declare const _default: (deps: ITraversalDeps) => ITraversal;
export default _default;
//# sourceMappingURL=Traversal.d.ts.map