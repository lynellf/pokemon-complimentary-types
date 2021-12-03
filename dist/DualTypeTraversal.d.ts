import type { Types as MonsterType } from "./types";
declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface IDualTypeTraversalDeps {
    byCompliment: (results: MonsterType[], weakness: MonsterType) => MonsterType[];
    createMergedNode: (query: MonsterType[]) => TNode;
}
interface IDualTypeTraversal {
    getCompliments: (query: MonsterType[], index?: number, queries?: MonsterType[][]) => MonsterType[];
}
declare const _default: (deps: IDualTypeTraversalDeps) => IDualTypeTraversal;
export default _default;
//# sourceMappingURL=DualTypeTraversal.d.ts.map