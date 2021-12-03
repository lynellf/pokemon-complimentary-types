"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoverage = void 0;
const getCoverage = (deps) => (query) => {
    var _a, _b, _c;
    const { createMergedNode, unique, intersection } = deps;
    const mergedNode = createMergedNode(query.flat());
    const advantages = (_a = mergedNode.get("strengths")) !== null && _a !== void 0 ? _a : [];
    const neutral = (_b = mergedNode.get("neutral")) !== null && _b !== void 0 ? _b : [];
    const resistedBy = ((_c = mergedNode.get("resistedBy")) !== null && _c !== void 0 ? _c : []).filter((type) => ![...advantages, ...neutral].includes(type));
    const offensiveCompliments = unique(resistedBy.flatMap((type) => {
        var _a;
        const node = createMergedNode([type]);
        return (_a = node.get("weaknesses")) !== null && _a !== void 0 ? _a : [];
    }));
    const weaknesses = unique(query
        .map(createMergedNode)
        .flatMap((node) => { var _a; return (_a = node.get("weaknesses")) !== null && _a !== void 0 ? _a : []; }));
    const safeCompliments = offensiveCompliments
        .filter((type) => {
        var _a;
        const node = createMergedNode([type]);
        const nodeWeaknesses = (_a = node.get("weaknesses")) !== null && _a !== void 0 ? _a : [];
        const sharesWeaknesses = intersection(nodeWeaknesses, weaknesses).length > 0;
        return !sharesWeaknesses;
    })
        .map((type) => [type]);
    return [resistedBy, safeCompliments];
};
exports.getCoverage = getCoverage;
exports.default = (deps) => {
    const findCoverageGaps = (0, exports.getCoverage)(deps);
    return { findCoverageGaps };
};
