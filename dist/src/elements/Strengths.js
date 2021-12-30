"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composites_1 = require("../atoms/composites");
exports.default = () => {
    return { getStrengths: composites_1.getAtkAdvantages, getResistedBy: composites_1.getAtkDisadvantages, getNeutral: composites_1.getAtkNeutrals };
};
