import type { MonsterType, TNode } from "../atoms/types";
export declare function getWeaknesses(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function isLengthGt<T>(query: number): (arr: T[]) => boolean;
export declare const bySharedWeaknesses: (badMatchups: MonsterType[]) => (compliment: MonsterType) => boolean;
export declare const byNearestGoodMatchup: (results: MonsterType[]) => (potentialCompliment: MonsterType) => boolean;
export declare const byCompliment: (results: MonsterType[], badMatchup: MonsterType) => import("../atoms/primitives").MonsterType[];
export declare const getCompliments: (query: MonsterType, _?: number, queries?: MonsterType[]) => MonsterType[];
export interface ITraversal {
    byCompliment: (results: MonsterType[], weakness: MonsterType) => MonsterType[];
    getCompliments: (query: MonsterType, index?: number, queries?: MonsterType[]) => MonsterType[];
}
declare const _default: () => ITraversal;
export default _default;
//# sourceMappingURL=Traversal.d.ts.map