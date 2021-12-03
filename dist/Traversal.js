"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byNearestGoodMatchup = exports.bySharedWeaknesses = void 0;
const bySharedWeaknesses = (deps) => (compliment) => {
    var _a;
    const { createNode, intersection, badMatchups } = deps;
    const compNode = createNode(compliment);
    const compWeaknesses = (_a = compNode.get("weaknesses")) !== null && _a !== void 0 ? _a : [];
    const overlap = intersection(compWeaknesses, badMatchups);
    return overlap.length > 0;
};
exports.bySharedWeaknesses = bySharedWeaknesses;
const byNearestGoodMatchup = (deps) => (potentialCompliment) => {
    var _a;
    const { createNode, unique, intersection, results } = deps;
    const matchupNode = createNode(potentialCompliment);
    const matchupWeaknesses = (_a = matchupNode.get("weaknesses")) !== null && _a !== void 0 ? _a : [];
    const badMatchups = unique([...matchupWeaknesses]);
    const hasOverlappingWeaknesses = results.find((0, exports.bySharedWeaknesses)({
        createNode,
        intersection,
        badMatchups,
    })) !== undefined;
    return hasOverlappingWeaknesses ? false : true;
};
exports.byNearestGoodMatchup = byNearestGoodMatchup;
const lookupCompliments = (deps) => (results, badMatchup) => {
    var _a;
    const { createNode, unique, intersection } = deps;
    const badMatchupNode = createNode(badMatchup);
    const goodMatchups = (_a = badMatchupNode.get("weaknesses")) !== null && _a !== void 0 ? _a : [];
    const hasExistingCoverage = intersection(results, goodMatchups).length > 0;
    if (hasExistingCoverage) {
        return results;
    }
    const nearestCompliments = goodMatchups.filter((0, exports.byNearestGoodMatchup)({
        createNode,
        unique,
        results,
        intersection,
    }));
    const hasNearestCompliment = nearestCompliments.length > 0;
    return hasNearestCompliment ? [...results, ...nearestCompliments] : results;
};
const getAllCompliments = (deps) => (query, _ = 0, queries = []) => {
    var _a;
    const { byCompliment, createNode } = deps;
    const queryNode = createNode(query);
    const queryWeaknesses = (_a = queryNode.get("weaknesses")) !== null && _a !== void 0 ? _a : [];
    const compliments = queryWeaknesses.reduce(byCompliment, [
        query,
        ...queries,
    ]);
    return compliments;
};
exports.default = (deps) => {
    const byCompliment = lookupCompliments(deps);
    const getCompliments = getAllCompliments({
        byCompliment,
        createNode: deps.createNode,
    });
    return { byCompliment, getCompliments };
};
