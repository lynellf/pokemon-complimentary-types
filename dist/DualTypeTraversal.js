"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllCompliments = (deps) => (query, _ = 0, queries = []) => {
    const { byCompliment, createMergedNode } = deps;
    const queryNode = createMergedNode(query);
    const queryWeaknesses = queryNode.get("weaknesses");
    const compliments = queryWeaknesses.reduce(byCompliment, [query, ...queries].flat());
    return compliments;
};
exports.default = (deps) => {
    const getCompliments = getAllCompliments(deps);
    return { getCompliments };
};
