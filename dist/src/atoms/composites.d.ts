import type { MonsterType, MatchupTable, MatchupTuple } from "./types";
export declare function getMatchup(defType: MonsterType): (atkType: MonsterType) => number;
export declare const getDefenses: (type: MonsterType) => {
    value: string | Iterable<[import("./primitives").MonsterType, number]> | Map<unknown, [import("./primitives").MonsterType, number]>;
    map: (fn: (item: [import("./primitives").MonsterType, number], i: number, self: [import("./primitives").MonsterType, number][]) => [import("./primitives").MonsterType, number]) => any;
    filter: (fn: (item: [import("./primitives").MonsterType, number], i: number, self: [import("./primitives").MonsterType, number][]) => boolean) => any;
    reduce: (fn: (acc: [import("./primitives").MonsterType, number][], item: [import("./primitives").MonsterType, number], i: number, self: [import("./primitives").MonsterType, number][]) => [import("./primitives").MonsterType, number][], init: [import("./primitives").MonsterType, number][]) => any;
    flatMap: (fn: (item: [import("./primitives").MonsterType, number], i: number, self: [import("./primitives").MonsterType, number][]) => [import("./primitives").MonsterType, number][]) => any;
    slice: (start: number, end?: number) => any;
    currentType: "string" | "array" | "map" | "set" | "other";
    unit: <T>(value: Iterable<T>, type: "string" | "array" | "map" | "set" | "other") => {
        value: string | Iterable<T> | Map<unknown, T>;
        map: (fn: (item: T, i: number, self: T[]) => T) => any;
        filter: (fn: (item: T, i: number, self: T[]) => boolean) => any;
        reduce: (fn: (acc: T[], item: T, i: number, self: T[]) => T[], init: T[]) => any;
        flatMap: (fn: (item: T, i: number, self: T[]) => T[]) => any;
        slice: (start: number, end?: number) => any;
        currentType: "string" | "array" | "map" | "set" | "other";
        unit: <T_1>(value: Iterable<T_1>, type: "string" | "array" | "map" | "set" | "other") => {
            value: string | Iterable<T_1> | Map<unknown, T_1>;
            map: (fn: (item: T_1, i: number, self: T_1[]) => T_1) => any;
            filter: (fn: (item: T_1, i: number, self: T_1[]) => boolean) => any;
            reduce: (fn: (acc: T_1[], item: T_1, i: number, self: T_1[]) => T_1[], init: T_1[]) => any;
            flatMap: (fn: (item: T_1, i: number, self: T_1[]) => T_1[]) => any;
            slice: (start: number, end?: number) => any;
            currentType: "string" | "array" | "map" | "set" | "other";
            unit: <T_2>(value: Iterable<T_2>, type: "string" | "array" | "map" | "set" | "other") => {
                value: string | Iterable<T_2> | Map<unknown, T_2>;
                map: (fn: (item: T_2, i: number, self: T_2[]) => T_2) => any;
                filter: (fn: (item: T_2, i: number, self: T_2[]) => boolean) => any;
                reduce: (fn: (acc: T_2[], item: T_2, i: number, self: T_2[]) => T_2[], init: T_2[]) => any;
                flatMap: (fn: (item: T_2, i: number, self: T_2[]) => T_2[]) => any;
                slice: (start: number, end?: number) => any;
                currentType: "string" | "array" | "map" | "set" | "other";
                unit: <T_3>(value: Iterable<T_3>, type: "string" | "array" | "map" | "set" | "other") => {
                    value: string | Iterable<T_3> | Map<unknown, T_3>;
                    map: (fn: (item: T_3, i: number, self: T_3[]) => T_3) => any;
                    filter: (fn: (item: T_3, i: number, self: T_3[]) => boolean) => any;
                    reduce: (fn: (acc: T_3[], item: T_3, i: number, self: T_3[]) => T_3[], init: T_3[]) => any;
                    flatMap: (fn: (item: T_3, i: number, self: T_3[]) => T_3[]) => any;
                    slice: (start: number, end?: number) => any;
                    currentType: "string" | "array" | "map" | "set" | "other";
                    unit: <T_4>(value: Iterable<T_4>, type: "string" | "array" | "map" | "set" | "other") => {
                        value: string | Iterable<T_4> | Map<unknown, T_4>;
                        map: (fn: (item: T_4, i: number, self: T_4[]) => T_4) => any;
                        filter: (fn: (item: T_4, i: number, self: T_4[]) => boolean) => any;
                        reduce: (fn: (acc: T_4[], item: T_4, i: number, self: T_4[]) => T_4[], init: T_4[]) => any;
                        flatMap: (fn: (item: T_4, i: number, self: T_4[]) => T_4[]) => any;
                        slice: (start: number, end?: number) => any;
                        currentType: "string" | "array" | "map" | "set" | "other";
                        unit: <T_5>(value: Iterable<T_5>, type: "string" | "array" | "map" | "set" | "other") => {
                            value: string | Iterable<T_5> | Map<unknown, T_5>;
                            map: (fn: (item: T_5, i: number, self: T_5[]) => T_5) => any;
                            filter: (fn: (item: T_5, i: number, self: T_5[]) => boolean) => any;
                            reduce: (fn: (acc: T_5[], item: T_5, i: number, self: T_5[]) => T_5[], init: T_5[]) => any;
                            flatMap: (fn: (item: T_5, i: number, self: T_5[]) => T_5[]) => any;
                            slice: (start: number, end?: number) => any;
                            currentType: "string" | "array" | "map" | "set" | "other";
                            unit: <T_6>(value: Iterable<T_6>, type: "string" | "array" | "map" | "set" | "other") => {
                                value: string | Iterable<T_6> | Map<unknown, T_6>;
                                map: (fn: (item: T_6, i: number, self: T_6[]) => T_6) => any;
                                filter: (fn: (item: T_6, i: number, self: T_6[]) => boolean) => any;
                                reduce: (fn: (acc: T_6[], item: T_6, i: number, self: T_6[]) => T_6[], init: T_6[]) => any;
                                flatMap: (fn: (item: T_6, i: number, self: T_6[]) => T_6[]) => any;
                                slice: (start: number, end?: number) => any;
                                currentType: "string" | "array" | "map" | "set" | "other";
                                unit: <T_7>(value: Iterable<T_7>, type: "string" | "array" | "map" | "set" | "other") => {
                                    value: string | Iterable<T_7> | Map<unknown, T_7>;
                                    map: (fn: (item: T_7, i: number, self: T_7[]) => T_7) => any;
                                    filter: (fn: (item: T_7, i: number, self: T_7[]) => boolean) => any;
                                    reduce: (fn: (acc: T_7[], item: T_7, i: number, self: T_7[]) => T_7[], init: T_7[]) => any;
                                    flatMap: (fn: (item: T_7, i: number, self: T_7[]) => T_7[]) => any;
                                    slice: (start: number, end?: number) => any;
                                    currentType: "string" | "array" | "map" | "set" | "other";
                                    unit: <T_8>(value: Iterable<T_8>, type: "string" | "array" | "map" | "set" | "other") => {
                                        value: string | Iterable<T_8> | Map<unknown, T_8>;
                                        map: (fn: (item: T_8, i: number, self: T_8[]) => T_8) => any;
                                        filter: (fn: (item: T_8, i: number, self: T_8[]) => boolean) => any;
                                        reduce: (fn: (acc: T_8[], item: T_8, i: number, self: T_8[]) => T_8[], init: T_8[]) => any;
                                        flatMap: (fn: (item: T_8, i: number, self: T_8[]) => T_8[]) => any;
                                        slice: (start: number, end?: number) => any;
                                        currentType: "string" | "array" | "map" | "set" | "other";
                                        unit: <T_9>(value: Iterable<T_9>, type: "string" | "array" | "map" | "set" | "other") => {
                                            value: string | Iterable<T_9> | Map<unknown, T_9>;
                                            map: (fn: (item: T_9, i: number, self: T_9[]) => T_9) => any;
                                            filter: (fn: (item: T_9, i: number, self: T_9[]) => boolean) => any;
                                            reduce: (fn: (acc: T_9[], item: T_9, i: number, self: T_9[]) => T_9[], init: T_9[]) => any;
                                            flatMap: (fn: (item: T_9, i: number, self: T_9[]) => T_9[]) => any;
                                            slice: (start: number, end?: number) => any;
                                            currentType: "string" | "array" | "map" | "set" | "other";
                                            unit: <T_10>(value: Iterable<T_10>, type: "string" | "array" | "map" | "set" | "other") => any;
                                            unpack: <T_11>(fn: (item: T_9, i: number, self: T_9[]) => T_11) => T_11[];
                                            unique: () => any;
                                            asArr: T_9[];
                                            intersection: (other: Iterable<T_9>) => any;
                                        };
                                        unpack: <T_12>(fn: (item: T_8, i: number, self: T_8[]) => T_12) => T_12[];
                                        unique: () => any;
                                        asArr: T_8[];
                                        intersection: (other: Iterable<T_8>) => any;
                                    };
                                    unpack: <T_13>(fn: (item: T_7, i: number, self: T_7[]) => T_13) => T_13[];
                                    unique: () => any;
                                    asArr: T_7[];
                                    intersection: (other: Iterable<T_7>) => any;
                                };
                                unpack: <T_14>(fn: (item: T_6, i: number, self: T_6[]) => T_14) => T_14[];
                                unique: () => any;
                                asArr: T_6[];
                                intersection: (other: Iterable<T_6>) => any;
                            };
                            unpack: <T_15>(fn: (item: T_5, i: number, self: T_5[]) => T_15) => T_15[];
                            unique: () => any;
                            asArr: T_5[];
                            intersection: (other: Iterable<T_5>) => any;
                        };
                        unpack: <T_16>(fn: (item: T_4, i: number, self: T_4[]) => T_16) => T_16[];
                        unique: () => any;
                        asArr: T_4[];
                        intersection: (other: Iterable<T_4>) => any;
                    };
                    unpack: <T_17>(fn: (item: T_3, i: number, self: T_3[]) => T_17) => T_17[];
                    unique: () => any;
                    asArr: T_3[];
                    intersection: (other: Iterable<T_3>) => any;
                };
                unpack: <T_18>(fn: (item: T_2, i: number, self: T_2[]) => T_18) => T_18[];
                unique: () => any;
                asArr: T_2[];
                intersection: (other: Iterable<T_2>) => any;
            };
            unpack: <T_19>(fn: (item: T_1, i: number, self: T_1[]) => T_19) => T_19[];
            unique: () => any;
            asArr: T_1[];
            intersection: (other: Iterable<T_1>) => any;
        };
        unpack: <T_20>(fn: (item: T, i: number, self: T[]) => T_20) => T_20[];
        unique: () => any;
        asArr: T[];
        intersection: (other: Iterable<T>) => any;
    };
    unpack: <T_21>(fn: (item: [import("./primitives").MonsterType, number], i: number, self: [import("./primitives").MonsterType, number][]) => T_21) => T_21[];
    unique: () => any;
    asArr: [import("./primitives").MonsterType, number][];
    intersection: (other: Iterable<[import("./primitives").MonsterType, number]>) => any;
};
export declare const getWeaknesses: (type: MonsterType) => MonsterType[];
export declare const getResistances: (type: MonsterType) => MonsterType[];
export declare const getCompliments: (type: MonsterType) => MonsterType[];
export declare const getAllWeaknesses: (team: MonsterType[]) => MonsterType[];
export declare const byUniqueWeakness: (teamWeaknesses: MonsterType[]) => (query: MonsterType) => boolean;
export declare const byAdvantage: (type: MonsterType) => ([_, table]: [MonsterType, MatchupTable]) => boolean;
export declare const byDisadvantage: (type: MonsterType) => ([_, table]: [MonsterType, MatchupTable]) => boolean;
export declare const byNeutral: (type: MonsterType) => ([_, table]: [MonsterType, MatchupTable]) => boolean;
export declare const byKeyname: (matchup: MatchupTuple) => MonsterType;
export declare const getAtkAdvantages: (type: MonsterType) => MonsterType[];
export declare const getAtkDisadvantages: (type: MonsterType) => MonsterType[];
export declare const getAtkNeutrals: (type: MonsterType) => MonsterType[];
export declare const byTotalResistances: (typeA: MonsterType, typeB: MonsterType) => number;
//# sourceMappingURL=composites.d.ts.map