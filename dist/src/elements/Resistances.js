"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composites_1 = require("../atoms/composites");
const asResistance = (query) => {
    const resistances = (0, composites_1.getResistances)(query);
    return resistances;
};
exports.default = () => {
    return { getResistances: composites_1.getResistances, asResistance };
};
