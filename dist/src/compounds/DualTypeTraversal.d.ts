import type { MonsterType, TNode } from "../atoms/types";
export interface IDualTypeTraversal {
    getCompliments: (query: MonsterType[], index?: number, queries?: MonsterType[][]) => MonsterType[];
}
export declare function getMergedCompliments(queries: MonsterType[][]): (node: TNode) => import("../atoms/primitives").MonsterType[];
export declare const getCompliments: (query: MonsterType[], _?: number, queries?: MonsterType[][]) => MonsterType[];
declare const _default: () => IDualTypeTraversal;
export default _default;
//# sourceMappingURL=DualTypeTraversal.d.ts.map