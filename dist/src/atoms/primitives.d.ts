export declare type MonsterType = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "fairy" | "steel";
export declare const defenseChart: Map<MonsterType, Map<MonsterType, number>>;
export declare const getValueLte: <T>(value: number) => ([_, v]: [T, number]) => boolean;
export declare const getValueGte: <T>(value: number) => ([_, v]: [T, number]) => boolean;
export declare function unique<T>(items: T[]): T[];
export declare const areParallel: <T>(items: T[]) => (item: T) => boolean;
export declare const some: (...bools: boolean[]) => boolean;
export declare const every: (...bools: boolean[]) => boolean;
export declare const asType: <T>([type]: [T, number]) => T;
export declare const asSelf: <T>(x: T) => T;
export declare const add: (x: number) => (y: number) => number;
export declare const product: (x: number) => (y: number) => number;
export declare const intersection: <T>(arr1: T[], arr2: T[]) => T[];
//# sourceMappingURL=primitives.d.ts.map