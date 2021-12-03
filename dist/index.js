"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resistances_1 = __importDefault(require("./Resistances"));
const Weaknesses_1 = __importDefault(require("./Weaknesses"));
const Defense_1 = __importDefault(require("./Defense"));
const TeamBuilder_1 = __importDefault(require("./TeamBuilder"));
const Offense_1 = __importDefault(require("./Offense"));
const Node_1 = __importDefault(require("./Node"));
const Traversal_1 = __importDefault(require("./Traversal"));
const Strengths_1 = __importDefault(require("./Strengths"));
const UserInput_1 = __importDefault(require("./UserInput"));
const DualTypeNode_1 = __importDefault(require("./DualTypeNode"));
const DualTypeTraversal_1 = __importDefault(require("./DualTypeTraversal"));
const DualTypeUserInput_1 = __importDefault(require("./DualTypeUserInput"));
const TypeCoverage_1 = __importDefault(require("./TypeCoverage"));
const types_1 = require("./types");
exports.default = (0, TeamBuilder_1.default)({
    baseTypes: types_1.baseTypes,
    Resistances: Resistances_1.default,
    Weaknesses: Weaknesses_1.default,
    Defense: Defense_1.default,
    Offense: Offense_1.default,
    Node: Node_1.default,
    Traversal: Traversal_1.default,
    Strengths: Strengths_1.default,
    UserInput: UserInput_1.default,
    DualTypeNode: DualTypeNode_1.default,
    DualTypeTraversal: DualTypeTraversal_1.default,
    DualTypeUserInput: DualTypeUserInput_1.default,
    TypeCoverage: TypeCoverage_1.default,
});
