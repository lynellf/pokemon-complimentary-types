"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdealTeam = void 0;
const Iterable_1 = require("../atoms/Iterable");
const DualTypeTraversal_1 = require("../compounds/DualTypeTraversal");
const DualTypeUserInput_1 = require("../compounds/DualTypeUserInput");
const TypeCoverage_1 = require("../compounds/TypeCoverage");
function getIdealTeam(query) {
    const [_isValid, offendingTypes, sharedWeakness] = (0, DualTypeUserInput_1.checkUserInput)(query);
    const [gaps, suggestions] = (0, TypeCoverage_1.findCoverageGaps)(query);
    const results = (0, Iterable_1.unique)([...query, ...suggestions].flatMap(DualTypeTraversal_1.getCompliments));
    return [results, offendingTypes, sharedWeakness, gaps];
}
exports.getIdealTeam = getIdealTeam;
function TeamBuilder() {
    return getIdealTeam;
}
exports.default = TeamBuilder;
