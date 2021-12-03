"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weaknesses = (deps) => (type) => {
    const { getDefChart, byWeakness, asType } = deps;
    const defChart = getDefChart(type);
    const weaknesses = defChart.filter(byWeakness).map(asType);
    return weaknesses;
};
const compliments = (deps) => (type) => {
    const { getWeaknesses, unique } = deps;
    const weaknesses = getWeaknesses(type);
    const compliments = weaknesses.flatMap(getWeaknesses);
    return unique(compliments);
};
const allWeaknesses = (deps) => (team) => {
    const { unique, getWeaknesses } = deps;
    return unique(team.flatMap(getWeaknesses));
};
const uniqueWeakness = (getWeaknesses) => (teamWeaknesses) => {
    return (type) => {
        const weaknesses = getWeaknesses(type);
        const isUnique = weaknesses.every((weakness) => !teamWeaknesses.includes(weakness));
        return isUnique;
    };
};
exports.default = (deps) => {
    const { getValueGte, asType, defChart, defenseChart, unique } = deps;
    const byWeakness = getValueGte(2);
    const getDefChart = defChart(defenseChart);
    const getWeaknesses = weaknesses({ getDefChart, byWeakness, asType });
    const getAllWeaknesses = allWeaknesses({ unique, getWeaknesses });
    const byUniqueWeakness = uniqueWeakness(getWeaknesses);
    const getCompliments = compliments({ getWeaknesses, unique });
    return {
        getWeaknesses,
        getAllWeaknesses,
        byWeakness,
        byUniqueWeakness,
        getCompliments,
    };
};
