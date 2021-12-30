"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composites_1 = require("../atoms/composites");
exports.default = () => {
    return {
        getWeaknesses: composites_1.getWeaknesses,
        getAllWeaknesses: composites_1.getAllWeaknesses,
        byUniqueWeakness: composites_1.byUniqueWeakness,
        getCompliments: composites_1.getCompliments,
    };
};
