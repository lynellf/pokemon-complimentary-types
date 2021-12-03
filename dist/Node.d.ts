import { Types as MonsterType } from "./types";
declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface INodeDeps {
    getStrengths: (type: MonsterType) => MonsterType[];
    getWeaknesses: (type: MonsterType) => MonsterType[];
    getResistances: (type: MonsterType) => MonsterType[];
    getResistedBy: (type: MonsterType) => MonsterType[];
    getNeutral: (type: MonsterType) => MonsterType[];
}
interface INode {
    create: (type: MonsterType) => TNode;
}
declare const _default: (deps: INodeDeps) => INode;
export default _default;
//# sourceMappingURL=Node.d.ts.map