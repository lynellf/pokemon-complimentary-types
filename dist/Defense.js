"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const difference = (deps) => (typeA, typeB) => {
    const { getDefChart, byResistance, byWeakness } = deps;
    const typeADefChart = getDefChart(typeA);
    const typeBDefChart = getDefChart(typeB);
    const typeAResistances = typeADefChart.filter(byResistance);
    const typeBResistances = typeBDefChart.filter(byResistance);
    const typeAWeaknesses = typeADefChart.filter(byWeakness);
    const typeBWeaknesses = typeBDefChart.filter(byWeakness);
    const typeADiff = typeAResistances.length - typeAWeaknesses.length;
    const typeBDiff = typeBResistances.length - typeBWeaknesses.length;
    return typeBDiff - typeADiff;
};
function default_1(deps) {
    const { Weaknesses, Resistances, baseTypes: { unique, asType, getValueLte, getValueGte, defChart, defenseChart, }, } = deps;
    const { getResistances, byResistance, asResistance } = Resistances({
        asType,
        getValueLte,
        defChart,
        defenseChart,
    });
    const { getWeaknesses, getAllWeaknesses, byWeakness, byUniqueWeakness, getCompliments, } = Weaknesses({
        asType,
        getValueGte,
        defChart,
        defenseChart,
        unique,
    });
    const byTotalResistances = difference({
        getDefChart: defChart(defenseChart),
        byResistance,
        byWeakness,
    });
    return {
        getResistances,
        getWeaknesses,
        getAllWeaknesses,
        byTotalResistances,
        asResistance,
        byUniqueWeakness,
        getCompliments,
    };
}
exports.default = default_1;
