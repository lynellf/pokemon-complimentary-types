"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseTypes = exports.defChart = exports.intersection = exports.some = exports.areParallel = exports.unique = exports.getValueGte = exports.getValueLte = exports.asType = exports.defenseChart = void 0;
const normalDefense = new Map([
    ["fighting", 2],
    ["ghost", 0],
]);
const fireDefense = new Map([
    ["fire", 0.5],
    ["water", 2],
    ["grass", 0.5],
    ["ice", 0.5],
    ["ground", 2],
    ["bug", 0.5],
    ["rock", 2],
    ["steel", 0.5],
    ["fairy", 0.5],
]);
const waterDefense = new Map([
    ["fire", 0.5],
    ["water", 0.5],
    ["electric", 2],
    ["grass", 2],
    ["ice", 0.5],
    ["steel", 0.5],
]);
const electricDefense = new Map([
    ["electric", 0.5],
    ["ground", 2],
    ["flying", 0.5],
    ["steel", 0.5],
]);
const grassDefense = new Map([
    ["fire", 2],
    ["water", 0.5],
    ["electric", 0.5],
    ["grass", 0.5],
    ["ice", 2],
    ["poison", 2],
    ["ground", 0.5],
    ["flying", 2],
    ["bug", 2],
]);
const iceDefense = new Map([
    ["fire", 2],
    ["ice", 0.5],
    ["fighting", 2],
    ["rock", 2],
    ["steel", 2],
]);
const fightingDefense = new Map([
    ["flying", 2],
    ["psychic", 2],
    ["bug", 0.5],
    ["rock", 0.5],
    ["dark", 0.5],
    ["fairy", 2],
]);
const poisonDefense = new Map([
    ["grass", 0.5],
    ["fighting", 0.5],
    ["poison", 0.5],
    ["ground", 2],
    ["psychic", 2],
    ["bug", 0.5],
    ["fairy", 0.5],
]);
const groundDefense = new Map([
    ["electric", 0],
    ["water", 2],
    ["grass", 2],
    ["ice", 2],
    ["poison", 0.5],
    ["rock", 0.5],
]);
const flyingDefense = new Map([
    ["electric", 2],
    ["grass", 0.5],
    ["ice", 2],
    ["fighting", 0.5],
    ["ground", 0],
    ["bug", 0.5],
    ["rock", 2],
]);
const psychicDefense = new Map([
    ["fighting", 0.5],
    ["psychic", 0.5],
    ["bug", 2],
    ["ghost", 2],
    ["dark", 2],
]);
const bugDefense = new Map([
    ["fire", 2],
    ["grass", 0.5],
    ["fighting", 0.5],
    ["ground", 0.5],
    ["flying", 2],
    ["rock", 2],
]);
const ghostDefense = new Map([
    ["normal", 0],
    ["fighting", 0],
    ["poison", 0.5],
    ["bug", 0.5],
    ["ghost", 2],
    ["dark", 2],
]);
const dragonDefense = new Map([
    ["fire", 0.5],
    ["water", 0.5],
    ["electric", 0.5],
    ["grass", 0.5],
    ["ice", 2],
    ["dragon", 2],
    ["fairy", 2],
]);
const darkDefense = new Map([
    ["fighting", 2],
    ["psychic", 0],
    ["bug", 2],
    ["ghost", 0.5],
    ["dark", 0.5],
    ["fairy", 2],
]);
const fairyDefense = new Map([
    ["fighting", 0.5],
    ["poison", 2],
    ["bug", 0.5],
    ["dragon", 0],
    ["dark", 0.5],
    ["steel", 2],
]);
const steelDefense = new Map([
    ["normal", 0.5],
    ["fire", 2],
    ["grass", 0.5],
    ["ice", 0.5],
    ["fighting", 2],
    ["poison", 0],
    ["ground", 2],
    ["flying", 0.5],
    ["psychic", 0.5],
    ["bug", 0.5],
    ["rock", 0.5],
    ["dragon", 0.5],
    ["steel", 0.5],
    ["fairy", 0.5],
]);
const rockDefense = new Map([
    ["normal", 0.5],
    ["fire", 0.5],
    ["water", 2],
    ["grass", 2],
    ["fighting", 2],
    ["poison", 0.5],
    ["ground", 2],
    ["flying", 0.5],
    ["steel", 2],
]);
exports.defenseChart = new Map([
    ["normal", normalDefense],
    ["fire", fireDefense],
    ["water", waterDefense],
    ["electric", electricDefense],
    ["grass", grassDefense],
    ["ice", iceDefense],
    ["fighting", fightingDefense],
    ["poison", poisonDefense],
    ["ground", groundDefense],
    ["flying", flyingDefense],
    ["psychic", psychicDefense],
    ["bug", bugDefense],
    ["ghost", ghostDefense],
    ["dragon", dragonDefense],
    ["dark", darkDefense],
    ["fairy", fairyDefense],
    ["steel", steelDefense],
    ["rock", rockDefense],
]);
const asType = ([type]) => type;
exports.asType = asType;
const getValueLte = (value) => ([_, v]) => v <= value;
exports.getValueLte = getValueLte;
const getValueGte = (value) => ([_, v]) => v >= value;
exports.getValueGte = getValueGte;
function unique(items) {
    return [...new Set(items)];
}
exports.unique = unique;
const areParallel = (items) => (item) => !items.includes(item);
exports.areParallel = areParallel;
const some = (...bools) => bools.some(Boolean);
exports.some = some;
const intersection = (arr1, arr2) => {
    return arr1.filter((item) => arr2.includes(item));
};
exports.intersection = intersection;
const defChart = (typeChart) => (type) => {
    var _a, _b;
    return Array.from((_b = (_a = typeChart.get(type)) === null || _a === void 0 ? void 0 : _a.entries()) !== null && _b !== void 0 ? _b : []);
};
exports.defChart = defChart;
exports.baseTypes = {
    asType: exports.asType,
    getValueLte: exports.getValueLte,
    getValueGte: exports.getValueGte,
    unique,
    byNonType: exports.areParallel,
    byNonIntersection: exports.areParallel,
    some: exports.some,
    defChart: exports.defChart,
    defenseChart: exports.defenseChart,
    intersection: exports.intersection,
};
