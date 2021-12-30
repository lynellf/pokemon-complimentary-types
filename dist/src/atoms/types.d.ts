import type { MonsterType as Base } from "./primitives";
export declare type MonsterType = Base;
export declare type TypeChart = Map<MonsterType, Map<MonsterType, number>>;
export declare type TType = [MonsterType, number];
export declare type MatchupTuple = [MonsterType, MatchupTable];
export declare type MatchupTable = Map<MonsterType, number>;
export declare type TNode = Map<"strengths" | "weaknesses" | "resistances" | "resistedBy" | "self" | "neutral", MonsterType[]>;
//# sourceMappingURL=types.d.ts.map