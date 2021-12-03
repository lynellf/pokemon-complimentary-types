"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
function main() {
    const query = [
        ["grass", "ground"],
        ["electric"],
        ["water", "flying"],
        ["normal"],
        ["ghost"],
        // ["fire", "dark"],
        // ["fire", "fighting"],
        // ["water", "flying"],
        // ["poison", "dark"],
        // ["psychic"],
        // ["ground", "flying"],
        // ["ice"],
        // ["psychic", "steel"],
        // ["dragon", "steel"],
        // ["psychic"],
        // ["normal"],
        // ["water", "fairy"],
        // ["water"],
        // ["psychic", "steel"],
        // ["dragon", "steel"],
        // ["ground", "dragon"],
        // ["fairy", "flying"],
        // ["grass", "poison"],
        // ["bug", "fighting"],
    ];
    // const query: any = [
    //   "water",
    //   "flying",
    //   "fire",
    //   "fighting",
    //   "poison",
    //   "dark",
    //   "ice",
    //   "grass",
    // ];
    const [results, overlap, sharedWeakness, gaps] = (0, index_1.default)(query);
    console.log({ gaps });
    if (overlap.length) {
        console.log("query:", query);
        console.log("Overlapping inputs:", overlap);
        console.log("Shared weakness:", sharedWeakness);
    }
    else {
        console.log("no overlapping weaknesses!");
        console.log("query:", query);
    }
    const flatResults = Array.from(new Set(results.flat()));
    const uniqueInputs = Array.from(new Set(query.flat()));
    const difference = (a, b) => a.filter((x) => !b.includes(x));
    const additions = difference(flatResults, uniqueInputs);
    const hasDifference = additions.length > 0;
    if (hasDifference) {
        console.log(`recommended team type additions:`, additions);
    }
}
main();
