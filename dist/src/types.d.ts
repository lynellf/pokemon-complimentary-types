export declare type Types = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "fairy" | "steel";
export declare const defenseChart: Map<Types, Map<Types, number>>;
export declare type TType = [Types, number];
export declare type TypeChart = Map<Types, Map<Types, number>>;
export declare const asType: <T>([type]: [T, number]) => T;
export declare const getValueLte: <T>(value: number) => ([_, v]: [T, number]) => boolean;
export declare const getValueGte: <T>(value: number) => ([_, v]: [T, number]) => boolean;
export declare function unique<T>(items: T[]): T[];
export declare const areParallel: <T>(items: T[]) => (item: T) => boolean;
export declare const some: (...bools: boolean[]) => boolean;
export declare const intersection: <T>(arr1: T[], arr2: T[]) => T[];
export declare const defChart: (typeChart: TypeChart) => (type: Types) => [Types, number][];
export declare const baseTypes: {
    asType: <T>([type]: [T, number]) => T;
    getValueLte: <T_1>(value: number) => ([_, v]: [T_1, number]) => boolean;
    getValueGte: <T_2>(value: number) => ([_, v]: [T_2, number]) => boolean;
    unique: typeof unique;
    byNonType: <T_3>(items: T_3[]) => (item: T_3) => boolean;
    byNonIntersection: <T_3>(items: T_3[]) => (item: T_3) => boolean;
    some: (...bools: boolean[]) => boolean;
    defChart: (typeChart: TypeChart) => (type: Types) => [Types, number][];
    defenseChart: Map<Types, Map<Types, number>>;
    intersection: <T_4>(arr1: T_4[], arr2: T_4[]) => T_4[];
};
//# sourceMappingURL=types.d.ts.map