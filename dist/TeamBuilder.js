"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TeamBuilder(deps) {
    const { Weaknesses, Resistances, Defense, baseTypes, Offense, Node, Strengths, Traversal, DualTypeUserInput, DualTypeNode, DualTypeTraversal, TypeCoverage, } = deps;
    const { unique, intersection, defenseChart: typeChart } = baseTypes;
    const { getWeaknesses, getResistances } = Defense({
        Weaknesses,
        Resistances,
        baseTypes,
    });
    const { getStrengths, getResistedBy, getNeutral } = Offense({
        typeChart,
        Strengths,
    });
    const { create: createNode } = Node({
        getResistances,
        getWeaknesses,
        getResistedBy,
        getStrengths,
        getNeutral,
    });
    const { byCompliment } = Traversal({ createNode, unique, intersection });
    const { createMergedNode } = DualTypeNode({
        createNode,
        unique,
        intersection,
    });
    const { checkUserInput } = DualTypeUserInput({ createMergedNode });
    const { getCompliments } = DualTypeTraversal({
        createMergedNode,
        byCompliment,
    });
    const { findCoverageGaps } = TypeCoverage({
        createMergedNode,
        intersection,
        unique,
    });
    const getIdealTeam = (query) => {
        const [_isValid, offendingTypes, sharedWeakness] = checkUserInput(query);
        const [gaps, suggestions] = findCoverageGaps(query);
        const results = unique([...query, ...suggestions].flatMap(getCompliments));
        return [results, offendingTypes, sharedWeakness, gaps];
    };
    return getIdealTeam;
}
exports.default = TeamBuilder;
