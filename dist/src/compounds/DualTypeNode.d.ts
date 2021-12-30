import type { MonsterType, TNode } from "../atoms/types";
interface IDualTypeNode {
    createMergedNode: (query: MonsterType[]) => TNode;
}
export declare function mergeWith(tableB: TNode): (tableA: TNode) => Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", import("../atoms/primitives").MonsterType[]>;
export declare function checkWeaknesses(defTypes: MonsterType[]): (atkTypes: MonsterType[]) => import("../atoms/primitives").MonsterType[];
export declare function checkResistances(defTypes: MonsterType[]): (atkTypes: MonsterType[]) => import("../atoms/primitives").MonsterType[];
export declare function checkNeutral(defTypes: MonsterType[]): (atkTypes: MonsterType[]) => import("../atoms/primitives").MonsterType[];
export declare function filterWeaknesses(node: TNode): TNode;
export declare function filterResistances(node: TNode): TNode;
export declare function filterNeutrals(node: TNode): TNode;
export declare function filterResistedBy(node: TNode): TNode;
export declare const mergeNodes: (outputNode: TNode, query: MonsterType) => TNode;
export declare const createMergedNode: (query: MonsterType[]) => TNode;
declare const _default: () => IDualTypeNode;
export default _default;
//# sourceMappingURL=DualTypeNode.d.ts.map