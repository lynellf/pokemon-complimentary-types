"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNode = void 0;
const Defense_1 = __importDefault(require("../elements/Defense"));
const Offense_1 = __importDefault(require("../elements/Offense"));
const createNode = (type) => {
    const { getNeutral, getStrengths, getResistedBy } = (0, Offense_1.default)();
    const { getWeaknesses, getResistances } = (0, Defense_1.default)();
    return new Map([
        ["self", [type]],
        ["neutral", getNeutral(type)],
        ["resistedBy", getResistedBy(type)],
        ["strengths", getStrengths(type)],
        ["weaknesses", getWeaknesses(type)],
        ["resistances", getResistances(type)],
    ]);
};
exports.createNode = createNode;
exports.default = () => {
    return {
        create: exports.createNode,
    };
};
