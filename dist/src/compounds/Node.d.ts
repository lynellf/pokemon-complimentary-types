import type { MonsterType } from "../atoms/types";
export declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface INode {
    create: (type: MonsterType) => TNode;
}
export declare const createNode: (type: MonsterType) => TNode;
declare const _default: () => INode;
export default _default;
//# sourceMappingURL=Node.d.ts.map