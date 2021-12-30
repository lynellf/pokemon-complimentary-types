"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCoverageGaps = exports.withResistedBy = exports.withAdvantages = exports.withNeutral = exports.withNode = exports.getSafeCompliments = exports.getOffensiveCompliments = exports.getNeutral = exports.getResistedBy = exports.getAdvantages = exports.getNode = exports.getWeaknessesFromNode = exports.getResistedByFromNode = exports.getNeutralFromNode = exports.getStrengthsFromNode = void 0;
const Iterable_1 = require("../atoms/Iterable");
const DualTypeNode_1 = require("./DualTypeNode");
const Node_1 = require("./Node");
const ezell_toolbelt_1 = require("ezell-toolbelt");
function getStrengthsFromNode(node) {
    return node.get("strengths");
}
exports.getStrengthsFromNode = getStrengthsFromNode;
function getNeutralFromNode(node) {
    return node.get("neutral");
}
exports.getNeutralFromNode = getNeutralFromNode;
function getResistedByFromNode(node) {
    return node.get("resistedBy");
}
exports.getResistedByFromNode = getResistedByFromNode;
function getWeaknessesFromNode(node) {
    return node.get("weaknesses");
}
exports.getWeaknessesFromNode = getWeaknessesFromNode;
function getNode(query) {
    return (0, ezell_toolbelt_1.Box)(query).flatMap(Iterable_1.flatten).flatMap(DualTypeNode_1.createMergedNode).value;
}
exports.getNode = getNode;
function getAdvantages(node) {
    return (0, ezell_toolbelt_1.Box)(node).flatMap(getStrengthsFromNode).value;
}
exports.getAdvantages = getAdvantages;
function getResistedBy(node) {
    return (0, ezell_toolbelt_1.Box)(node).flatMap(getResistedByFromNode).value;
}
exports.getResistedBy = getResistedBy;
function getNeutral(node) {
    return (0, ezell_toolbelt_1.Box)(node).flatMap(getNeutralFromNode).value;
}
exports.getNeutral = getNeutral;
function getOffensiveCompliments(resistedBy) {
    return (0, ezell_toolbelt_1.Box)(resistedBy)
        .map((arr) => arr.map((type) => (0, ezell_toolbelt_1.Box)(type).map(Node_1.createNode).map(getWeaknessesFromNode).value))
        .map(Iterable_1.unique).value;
}
exports.getOffensiveCompliments = getOffensiveCompliments;
function getSafeCompliments(weaknesses) {
    return (offensiveCompliments) => offensiveCompliments
        .filter((type) => !Boolean((0, ezell_toolbelt_1.Box)(type)
        .map(Node_1.createNode)
        .map(getWeaknessesFromNode)
        .map((0, Iterable_1.intersection)(weaknesses))
        .map((arr) => arr.length > 0).value))
        .map((type) => [type]);
}
exports.getSafeCompliments = getSafeCompliments;
function withNode(query) {
    return (ctx) => (Object.assign(Object.assign({}, ctx), { node: getNode(query) }));
}
exports.withNode = withNode;
function withNeutral(ctx) {
    return Object.assign(Object.assign({}, ctx), { neutral: getNeutral(ctx.node) });
}
exports.withNeutral = withNeutral;
function withAdvantages(ctx) {
    return Object.assign(Object.assign({}, ctx), { advantages: getAdvantages(ctx.node) });
}
exports.withAdvantages = withAdvantages;
function withResistedBy(ctx) {
    return Object.assign(Object.assign({}, ctx), { resistedBy: (0, Iterable_1.difference)(getResistedBy(ctx.node))([
            ...ctx.advantages,
            ...ctx.neutral,
        ]) });
}
exports.withResistedBy = withResistedBy;
function withOffensiveCompliments(ctx) {
    return Object.assign(Object.assign({}, ctx), { offensiveCompliments: getOffensiveCompliments(ctx.resistedBy) });
}
function withWeaknesses(ctx) {
    return Object.assign(Object.assign({}, ctx), { weaknesses: getWeaknessesFromNode(ctx.node) });
}
function withSafeCompliments(ctx) {
    return Object.assign(Object.assign({}, ctx), { safeCompliments: getSafeCompliments(ctx.weaknesses)(ctx.offensiveCompliments) });
}
const findCoverageGaps = (query) => {
    const { resistedBy, safeCompliments } = (0, ezell_toolbelt_1.Box)({})
        .map(withNode(query))
        .map(withNeutral)
        .map(withAdvantages)
        .map(withResistedBy)
        .map(withOffensiveCompliments)
        .map(withWeaknesses)
        .map(withSafeCompliments).value;
    return [resistedBy, safeCompliments];
};
exports.findCoverageGaps = findCoverageGaps;
exports.default = () => {
    return { findCoverageGaps: exports.findCoverageGaps };
};
