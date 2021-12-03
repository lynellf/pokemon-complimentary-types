"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (deps) => {
    const { typeChart, Strengths } = deps;
    const { getStrengths, getResistedBy, getNeutral } = Strengths({ typeChart });
    return {
        getStrengths,
        getResistedBy,
        getNeutral,
    };
};
