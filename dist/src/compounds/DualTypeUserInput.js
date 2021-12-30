"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserInput = exports.withOverlappingWeaknesses = exports.withOffendingTypes = exports.withCanContinue = exports.withFrequencyTable = exports.withWeaknesses = exports.setCtx = exports.getOverlappingWeaknesses = exports.getOffendingTypes = exports.checkFrequencies = exports.getFreqTable = exports.getWeaknessesFromNode = exports.createNode = exports.byThreshold = exports.byFrequency = void 0;
const DualTypeNode_1 = require("./DualTypeNode");
const Iterable_1 = require("../atoms/Iterable");
const ezell_toolbelt_1 = require("ezell-toolbelt");
const byFrequency = (table, weakness) => {
    var _a;
    const count = (_a = table.get(weakness)) !== null && _a !== void 0 ? _a : 0;
    table.set(weakness, count + 1);
    return table;
};
exports.byFrequency = byFrequency;
const byThreshold = (max) => ([_, count]) => count >= max;
exports.byThreshold = byThreshold;
function createNode(types) {
    return (0, DualTypeNode_1.createMergedNode)(types);
}
exports.createNode = createNode;
function getWeaknessesFromNode(node) {
    return node.get("weaknesses");
}
exports.getWeaknessesFromNode = getWeaknessesFromNode;
function getFreqTable(types) {
    return (0, ezell_toolbelt_1.Box)(types)
        .map((arr) => (0, Iterable_1.flatten)(arr))
        .map((arr) => arr.reduce(exports.byFrequency, new Map())).value;
}
exports.getFreqTable = getFreqTable;
function checkFrequencies(table) {
    return (threshold) => !Boolean((0, ezell_toolbelt_1.Box)(table)
        .map((map) => (0, Iterable_1.toArray)(map))
        .map((table) => table.find((0, exports.byThreshold)(threshold))).value);
}
exports.checkFrequencies = checkFrequencies;
function getOffendingTypes(weaknesses) {
    return (frequencyTable) => (userInput) => (0, ezell_toolbelt_1.Box)(weaknesses).map((arr) => arr
        .map((weaknessArr, i) => weaknessArr.find((type) => frequencyTable.get(type) >= 2) ? i : -1)
        .filter((i) => i > -1)
        .map((i) => userInput[i])).value;
}
exports.getOffendingTypes = getOffendingTypes;
function getOverlappingWeaknesses(frequencyTable) {
    return (0, ezell_toolbelt_1.Box)(frequencyTable)
        .map((table) => (0, Iterable_1.toArray)(table))
        .map((arr) => arr.filter((0, exports.byThreshold)(2)).map(([type]) => type)).value;
}
exports.getOverlappingWeaknesses = getOverlappingWeaknesses;
function setCtx(newCtx) {
    return (currentCtx) => (Object.assign(Object.assign({}, currentCtx), newCtx));
}
exports.setCtx = setCtx;
function withWeaknesses(userInput) {
    return (ctx) => (Object.assign(Object.assign({}, ctx), { weaknesses: userInput.map(createNode).map(getWeaknessesFromNode) }));
}
exports.withWeaknesses = withWeaknesses;
function withFrequencyTable(ctx) {
    return Object.assign(Object.assign({}, ctx), { frequencyTable: getFreqTable(ctx.weaknesses) });
}
exports.withFrequencyTable = withFrequencyTable;
function withCanContinue(ctx) {
    return Object.assign(Object.assign({}, ctx), { canContinue: checkFrequencies(ctx.frequencyTable)(2) });
}
exports.withCanContinue = withCanContinue;
function withOffendingTypes(userInput) {
    return (ctx) => (Object.assign(Object.assign({}, ctx), { offendingTypes: getOffendingTypes(ctx.weaknesses)(ctx.frequencyTable)(userInput) }));
}
exports.withOffendingTypes = withOffendingTypes;
function withOverlappingWeaknesses(ctx) {
    return Object.assign(Object.assign({}, ctx), { overlappingWeaknesses: getOverlappingWeaknesses(ctx.frequencyTable) });
}
exports.withOverlappingWeaknesses = withOverlappingWeaknesses;
const checkUserInput = (userInput) => {
    const { canContinue, offendingTypes, overlappingWeaknesses } = (0, ezell_toolbelt_1.Box)({})
        .map(withWeaknesses(userInput))
        .map(withFrequencyTable)
        .map(withCanContinue)
        .map(withOffendingTypes(userInput))
        .map(withOverlappingWeaknesses).value;
    return [canContinue, offendingTypes, overlappingWeaknesses];
};
exports.checkUserInput = checkUserInput;
exports.default = () => {
    return { checkUserInput: exports.checkUserInput };
};
