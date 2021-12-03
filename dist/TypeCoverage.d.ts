import { Types as MonsterType } from "./types";
declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
interface ITypeCoverageDeps {
    createMergedNode: (query: MonsterType[]) => TNode;
    unique: <T>(arr: T[]) => T[];
    intersection: <T>(arr1: T[], arr2: T[]) => T[];
}
export declare const getCoverage: (deps: ITypeCoverageDeps) => (query: MonsterType[][]) => [MonsterType[], MonsterType[][]];
interface ITypeCoverage {
    findCoverageGaps: (query: MonsterType[][]) => [MonsterType[], MonsterType[][]];
}
declare const _default: (deps: ITypeCoverageDeps) => ITypeCoverage;
export default _default;
//# sourceMappingURL=TypeCoverage.d.ts.map