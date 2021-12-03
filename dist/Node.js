"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node = (deps) => (type) => new Map([
    ["self", [type]],
    ["neutral", deps.getNeutral(type)],
    ["resistedBy", deps.getResistedBy(type)],
    ["strengths", deps.getStrengths(type)],
    ["weaknesses", deps.getWeaknesses(type)],
    ["resistances", deps.getResistances(type)],
]);
exports.default = (deps) => {
    const create = node(deps);
    return {
        create,
    };
};
