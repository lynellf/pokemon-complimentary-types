"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byTotalResistances = exports.getAtkNeutrals = exports.getAtkDisadvantages = exports.getAtkAdvantages = exports.byKeyname = exports.byNeutral = exports.byDisadvantage = exports.byAdvantage = exports.byUniqueWeakness = exports.getAllWeaknesses = exports.getCompliments = exports.getResistances = exports.getWeaknesses = exports.getDefenses = exports.getMatchup = void 0;
const Iterable_1 = __importDefault(require("./Iterable"));
const primitives_1 = require("./primitives");
function getMatchup(defType) {
    return (atkType) => primitives_1.defenseChart.get(defType).get(atkType);
}
exports.getMatchup = getMatchup;
const getDefenses = (type) => {
    return (0, Iterable_1.default)(primitives_1.defenseChart.get(type));
};
exports.getDefenses = getDefenses;
const getWeaknesses = (type) => {
    const byWeakness = (0, primitives_1.getValueGte)(2);
    const defenseTable = (0, exports.getDefenses)(type);
    const listOfWeaknesses = defenseTable.filter(byWeakness).unpack(primitives_1.asType);
    return listOfWeaknesses;
};
exports.getWeaknesses = getWeaknesses;
const getResistances = (type) => {
    const byResistance = (0, primitives_1.getValueLte)(0.5);
    const defenseTable = (0, exports.getDefenses)(type);
    const listOfResistances = defenseTable.filter(byResistance).unpack(primitives_1.asType);
    return listOfResistances;
};
exports.getResistances = getResistances;
const getCompliments = (type) => {
    const weaknesses = (0, Iterable_1.default)((0, exports.getWeaknesses)(type));
    const compliments = weaknesses.flatMap(exports.getWeaknesses).unique().unpack(primitives_1.asSelf);
    return compliments;
};
exports.getCompliments = getCompliments;
const getAllWeaknesses = (team) => {
    return (0, Iterable_1.default)(team).flatMap(exports.getWeaknesses).unique().unpack(primitives_1.asSelf);
};
exports.getAllWeaknesses = getAllWeaknesses;
const byUniqueWeakness = (teamWeaknesses) => (query) => {
    const weaknesses = (0, exports.getWeaknesses)(query);
    const isUnique = weaknesses.every((weakness) => !teamWeaknesses.includes(weakness));
    return isUnique;
};
exports.byUniqueWeakness = byUniqueWeakness;
const byAdvantage = (type) => ([_, table]) => { var _a; return ((_a = table.get(type)) !== null && _a !== void 0 ? _a : -1) >= 2; };
exports.byAdvantage = byAdvantage;
const byDisadvantage = (type) => ([_, table]) => { var _a; return ((_a = table.get(type)) !== null && _a !== void 0 ? _a : 2) <= 0.5; };
exports.byDisadvantage = byDisadvantage;
const byNeutral = (type) => ([_, table]) => table.get(type) === 1;
exports.byNeutral = byNeutral;
const byKeyname = (matchup) => matchup[0];
exports.byKeyname = byKeyname;
const getAtkAdvantages = (type) => (0, Iterable_1.default)(primitives_1.defenseChart).filter((0, exports.byAdvantage)(type)).unpack(exports.byKeyname);
exports.getAtkAdvantages = getAtkAdvantages;
const getAtkDisadvantages = (type) => (0, Iterable_1.default)(primitives_1.defenseChart).filter((0, exports.byDisadvantage)(type)).unpack(exports.byKeyname);
exports.getAtkDisadvantages = getAtkDisadvantages;
const getAtkNeutrals = (type) => (0, Iterable_1.default)(primitives_1.defenseChart).filter((0, exports.byNeutral)(type)).unpack(exports.byKeyname);
exports.getAtkNeutrals = getAtkNeutrals;
const byTotalResistances = (typeA, typeB) => {
    const byWeakness = (0, primitives_1.getValueGte)(2);
    const byResistance = (0, primitives_1.getValueLte)(0.5);
    const typeADefChart = (0, exports.getDefenses)(typeA);
    const typeBDefChart = (0, exports.getDefenses)(typeB);
    const typeAResistances = typeADefChart.filter(byResistance).asArr;
    const typeBResistances = typeBDefChart.filter(byResistance).asArr;
    const typeAWeaknesses = typeADefChart.filter(byWeakness).asArr;
    const typeBWeaknesses = typeBDefChart.filter(byWeakness).asArr;
    const typeADiff = typeAResistances.length - typeAWeaknesses.length;
    const typeBDiff = typeBResistances.length - typeBWeaknesses.length;
    return typeBDiff - typeADiff;
};
exports.byTotalResistances = byTotalResistances;
