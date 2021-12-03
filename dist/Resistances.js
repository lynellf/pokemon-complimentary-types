"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resistances = (deps) => (type) => {
    const { getDefChart, byResistance, asType } = deps;
    const defChart = getDefChart(type);
    const resistances = defChart.filter(byResistance).map(asType);
    return resistances;
};
const resistanceFilter = (getResistances) => (query) => {
    const resistances = getResistances(query);
    return resistances;
};
exports.default = (deps) => {
    const { asType, getValueLte, defChart, defenseChart } = deps;
    const byResistance = getValueLte(0.5);
    const getDefChart = defChart(defenseChart);
    const getResistances = resistances({ getDefChart, byResistance, asType });
    const asResistance = resistanceFilter(getResistances);
    return { getResistances, byResistance, asResistance };
};
