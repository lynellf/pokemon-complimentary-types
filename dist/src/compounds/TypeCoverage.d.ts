import type { MonsterType, TNode } from "../atoms/types";
declare type TCtx = {
    neutral: MonsterType[];
    resistedBy: MonsterType[];
    safeCompliments: MonsterType[][];
    offensiveCompliments: MonsterType[];
    advantages: MonsterType[];
    node: TNode;
    weaknesses: MonsterType[];
};
export declare function getStrengthsFromNode(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getNeutralFromNode(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getResistedByFromNode(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getWeaknessesFromNode(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getNode(query: MonsterType[][]): TNode;
export declare function getAdvantages(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getResistedBy(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getNeutral(node: TNode): import("../atoms/primitives").MonsterType[];
export declare function getOffensiveCompliments(resistedBy: MonsterType[]): import("../atoms/primitives").MonsterType[];
export declare function getSafeCompliments(weaknesses: MonsterType[]): (offensiveCompliments: MonsterType[]) => import("../atoms/primitives").MonsterType[][];
export declare function withNode(query: MonsterType[][]): (ctx: Partial<TCtx>) => {
    node: TNode;
    neutral?: import("../atoms/primitives").MonsterType[];
    resistedBy?: import("../atoms/primitives").MonsterType[];
    safeCompliments?: import("../atoms/primitives").MonsterType[][];
    offensiveCompliments?: import("../atoms/primitives").MonsterType[];
    advantages?: import("../atoms/primitives").MonsterType[];
    weaknesses?: import("../atoms/primitives").MonsterType[];
};
export declare function withNeutral(ctx: Partial<TCtx>): {
    neutral: import("../atoms/primitives").MonsterType[];
    resistedBy?: import("../atoms/primitives").MonsterType[];
    safeCompliments?: import("../atoms/primitives").MonsterType[][];
    offensiveCompliments?: import("../atoms/primitives").MonsterType[];
    advantages?: import("../atoms/primitives").MonsterType[];
    node?: TNode;
    weaknesses?: import("../atoms/primitives").MonsterType[];
};
export declare function withAdvantages(ctx: Partial<TCtx>): {
    advantages: import("../atoms/primitives").MonsterType[];
    neutral?: import("../atoms/primitives").MonsterType[];
    resistedBy?: import("../atoms/primitives").MonsterType[];
    safeCompliments?: import("../atoms/primitives").MonsterType[][];
    offensiveCompliments?: import("../atoms/primitives").MonsterType[];
    node?: TNode;
    weaknesses?: import("../atoms/primitives").MonsterType[];
};
export declare function withResistedBy(ctx: Partial<TCtx>): {
    resistedBy: import("../atoms/primitives").MonsterType[];
    neutral?: import("../atoms/primitives").MonsterType[];
    safeCompliments?: import("../atoms/primitives").MonsterType[][];
    offensiveCompliments?: import("../atoms/primitives").MonsterType[];
    advantages?: import("../atoms/primitives").MonsterType[];
    node?: TNode;
    weaknesses?: import("../atoms/primitives").MonsterType[];
};
export declare const findCoverageGaps: (query: MonsterType[][]) => [MonsterType[], MonsterType[][]];
interface ITypeCoverage {
    findCoverageGaps: (query: MonsterType[][]) => [MonsterType[], MonsterType[][]];
}
declare const _default: () => ITypeCoverage;
export default _default;
//# sourceMappingURL=TypeCoverage.d.ts.map