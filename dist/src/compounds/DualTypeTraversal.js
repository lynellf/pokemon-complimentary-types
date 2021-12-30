"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompliments = exports.getMergedCompliments = void 0;
const Traversal_1 = require("./Traversal");
const DualTypeNode_1 = require("./DualTypeNode");
const ezell_toolbelt_1 = require("ezell-toolbelt");
function getMergedCompliments(queries) {
    return (node) => (0, ezell_toolbelt_1.Box)(node.get("weaknesses")).map((weaknesses) => weaknesses.reduce(Traversal_1.byCompliment, queries.flat())).value;
}
exports.getMergedCompliments = getMergedCompliments;
const getCompliments = (query, _ = 0, queries = []) => (0, ezell_toolbelt_1.Box)((0, DualTypeNode_1.createMergedNode)(query)).map(getMergedCompliments([query, ...queries]))
    .value;
exports.getCompliments = getCompliments;
exports.default = () => {
    return { getCompliments: exports.getCompliments };
};
