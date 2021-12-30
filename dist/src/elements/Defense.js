"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const composites_1 = require("../atoms/composites");
const Resistances_1 = __importDefault(require("./Resistances"));
const Weaknesses_1 = __importDefault(require("./Weaknesses"));
function default_1() {
    const { getResistances, asResistance } = (0, Resistances_1.default)();
    const { getWeaknesses, getAllWeaknesses, byUniqueWeakness, getCompliments } = (0, Weaknesses_1.default)();
    return {
        getResistances,
        getWeaknesses,
        getAllWeaknesses,
        byTotalResistances: composites_1.byTotalResistances,
        asResistance,
        byUniqueWeakness,
        getCompliments,
    };
}
exports.default = default_1;
