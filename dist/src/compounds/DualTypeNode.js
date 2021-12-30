"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMergedNode = exports.mergeNodes = exports.filterResistedBy = exports.filterNeutrals = exports.filterResistances = exports.filterWeaknesses = exports.checkNeutral = exports.checkResistances = exports.checkWeaknesses = exports.mergeWith = void 0;
const primitives_1 = require("../atoms/primitives");
const composites_1 = require("../atoms/composites");
const Iterable_1 = require("../atoms/Iterable");
const Node_1 = require("../compounds/Node");
const ezell_toolbelt_1 = require("ezell-toolbelt");
function mergeWith(tableB) {
    return (tableA) => new Map([...tableA].map(([key, entry]) => {
        var _a;
        return [
            key,
            [...entry, ...((_a = tableB.get(key)) !== null && _a !== void 0 ? _a : [])],
        ];
    }));
}
exports.mergeWith = mergeWith;
function checkWeaknesses(defTypes) {
    return (atkTypes) => (0, Iterable_1.unique)(atkTypes.filter((atkType) => defTypes.reduce((acc, defType) => (0, primitives_1.product)(acc)((0, composites_1.getMatchup)(defType)(atkType)), 1) > 1));
}
exports.checkWeaknesses = checkWeaknesses;
function checkResistances(defTypes) {
    return (atkTypes) => (0, Iterable_1.unique)(atkTypes.filter((atkType) => defTypes.reduce((acc, defType) => (0, primitives_1.product)(acc)((0, composites_1.getMatchup)(defType)(atkType)), 1) < 1));
}
exports.checkResistances = checkResistances;
function checkNeutral(defTypes) {
    return (atkTypes) => (0, Iterable_1.unique)(atkTypes.filter((atkType) => defTypes.reduce((acc, defType) => (0, primitives_1.product)(acc)((0, composites_1.getMatchup)(defType)(atkType)), 1) === 1));
}
exports.checkNeutral = checkNeutral;
function filterWeaknesses(node) {
    return node.set("weaknesses", checkWeaknesses(node.get("self"))(node.get("weaknesses")));
}
exports.filterWeaknesses = filterWeaknesses;
function filterResistances(node) {
    return node.set("resistances", checkResistances(node.get("self"))(node.get("resistances")));
}
exports.filterResistances = filterResistances;
function filterNeutrals(node) {
    return node.set("neutral", checkNeutral(node.get("self"))(node.get("neutral")));
}
exports.filterNeutrals = filterNeutrals;
function filterResistedBy(node) {
    return node.set("resistedBy", checkResistances(node.get("resistedBy"))(node.get("self")));
}
exports.filterResistedBy = filterResistedBy;
const mergeNodes = (outputNode, query) => {
    return (0, ezell_toolbelt_1.Box)((0, Node_1.createNode)(query))
        .map(mergeWith(outputNode))
        .map(filterWeaknesses)
        .map(filterResistances)
        .map(filterNeutrals).value;
};
exports.mergeNodes = mergeNodes;
const createMergedNode = (query) => query.reduce(exports.mergeNodes, new Map());
exports.createMergedNode = createMergedNode;
exports.default = () => {
    return { createMergedNode: exports.createMergedNode };
};
