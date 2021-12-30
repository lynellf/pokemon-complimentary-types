"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompliments = exports.byCompliment = exports.byNearestGoodMatchup = exports.bySharedWeaknesses = exports.isLengthGt = exports.getWeaknesses = void 0;
const Node_1 = require("../compounds/Node");
const Iterable_1 = require("../atoms/Iterable");
const ezell_toolbelt_1 = require("ezell-toolbelt");
function getWeaknesses(node) {
    return node.get("weaknesses");
}
exports.getWeaknesses = getWeaknesses;
function isLengthGt(query) {
    return (arr) => arr.length > query;
}
exports.isLengthGt = isLengthGt;
const bySharedWeaknesses = (badMatchups) => (compliment) => Boolean((0, ezell_toolbelt_1.Box)((0, Node_1.createNode)(compliment))
    .map(getWeaknesses)
    .map((arr) => (0, Iterable_1.intersection)(arr)(badMatchups))
    .map(isLengthGt(0)).value);
exports.bySharedWeaknesses = bySharedWeaknesses;
const byNearestGoodMatchup = (results) => (potentialCompliment) => Boolean((0, ezell_toolbelt_1.Box)((0, Node_1.createNode)(potentialCompliment))
    .map(getWeaknesses)
    .map(Iterable_1.unique)
    .map(isLengthGt(0)).value);
exports.byNearestGoodMatchup = byNearestGoodMatchup;
const byCompliment = (results, badMatchup) => {
    var _a;
    return (_a = (0, ezell_toolbelt_1.Box)((0, Node_1.createNode)(badMatchup))
        .map(getWeaknesses)
        .map((arr) => arr.filter((0, exports.byNearestGoodMatchup)(results)))
        .map((0, Iterable_1.union)(results)).value) !== null && _a !== void 0 ? _a : results;
};
exports.byCompliment = byCompliment;
const getCompliments = (query, _ = 0, queries = []) => {
    var _a;
    return (_a = (0, ezell_toolbelt_1.Box)((0, Node_1.createNode)(query))
        .map(getWeaknesses)
        .map((arr) => arr.reduce(exports.byCompliment, [query, ...queries])).value) !== null && _a !== void 0 ? _a : [];
};
exports.getCompliments = getCompliments;
exports.default = () => {
    return { byCompliment: exports.byCompliment, getCompliments: exports.getCompliments };
};
