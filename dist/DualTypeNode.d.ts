import { Types as MonsterType } from "./types";
declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface IDualTypeNodeDeps {
    createNode: (type: MonsterType) => TNode;
    unique: <T>(array: T[]) => T[];
    intersection: <T>(a: T[], b: T[]) => T[];
}
interface IDualTypeNode {
    createMergedNode: (query: MonsterType[]) => TNode;
}
declare const _default: (deps: IDualTypeNodeDeps) => IDualTypeNode;
export default _default;
//# sourceMappingURL=DualTypeNode.d.ts.map