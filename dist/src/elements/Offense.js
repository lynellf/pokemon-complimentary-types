"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Strengths_1 = __importDefault(require("./Strengths"));
exports.default = () => {
    const { getStrengths, getResistedBy, getNeutral } = (0, Strengths_1.default)();
    return {
        getStrengths,
        getResistedBy,
        getNeutral,
    };
};
