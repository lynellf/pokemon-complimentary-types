"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectWeaknesses = exports.byThreshold = exports.byFreqency = void 0;
const byFreqency = (table, weakness) => {
    var _a;
    const count = (_a = table.get(weakness)) !== null && _a !== void 0 ? _a : 0;
    table.set(weakness, count + 1);
    return table;
};
exports.byFreqency = byFreqency;
const byThreshold = (max) => ([_, count]) => count >= max;
exports.byThreshold = byThreshold;
const inspectWeaknesses = (createMergedNode) => (userInput) => {
    const weaknesses = userInput.map((input) => {
        const node = createMergedNode(input);
        return node.get("weaknesses");
    });
    const allWeaknesses = weaknesses.flat();
    const frequencyTable = allWeaknesses.reduce(exports.byFreqency, new Map());
    const canContinue = !(Array.from(frequencyTable).find((0, exports.byThreshold)(2)) !== undefined);
    const offendingTypes = weaknesses
        .map((weaknessArr, i) => weaknessArr.find((type) => frequencyTable.get(type) >= 2) !== undefined
        ? i
        : -1)
        .filter((i) => i !== -1)
        .map((i) => userInput[i]);
    const overlappingWeaknesses = Array.from(frequencyTable)
        .filter((0, exports.byThreshold)(2))
        .map(([type]) => type);
    return [canContinue, offendingTypes, overlappingWeaknesses];
};
exports.inspectWeaknesses = inspectWeaknesses;
exports.default = (deps) => {
    const checkUserInput = (0, exports.inspectWeaknesses)(deps.createMergedNode);
    return { checkUserInput };
};
