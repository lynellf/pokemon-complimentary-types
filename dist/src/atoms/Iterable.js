"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.union = exports.intersection = exports.difference = exports.sort = exports.flatten = exports.interGroup = exports.diffGroup = exports.doesInclude = exports.doesNotInclude = exports.group = exports.byLongestLength = exports.unique = exports.toSet = exports.toArray = void 0;
const ezell_toolbelt_1 = require("ezell-toolbelt");
function toArray(iterable) {
    return [...iterable];
}
exports.toArray = toArray;
function toSet(iterable) {
    return new Set(iterable);
}
exports.toSet = toSet;
function unique(iterable) {
    const output = (0, ezell_toolbelt_1.Box)(iterable).map(toSet).map(toArray).value;
    return output;
}
exports.unique = unique;
function byLongestLength(arrA, arrB) {
    return arrB.length - arrA.length;
}
exports.byLongestLength = byLongestLength;
function group(iterableA) {
    return (iterableB) => [(0, ezell_toolbelt_1.Box)(iterableA).map(toArray).value, (0, ezell_toolbelt_1.Box)(iterableB).map(toArray).value];
}
exports.group = group;
function doesNotInclude(arr) {
    return (item) => !arr.includes(item);
}
exports.doesNotInclude = doesNotInclude;
function doesInclude(arr) {
    return (item) => arr.includes(item);
}
exports.doesInclude = doesInclude;
function diffGroup([longest, shortest]) {
    return [
        ...longest.filter(doesNotInclude(shortest)),
        ...shortest.filter(doesNotInclude(longest)),
    ];
}
exports.diffGroup = diffGroup;
function interGroup([longest, shortest]) {
    return [
        ...longest.filter(doesInclude(shortest)),
        ...shortest.filter(doesInclude(longest)),
    ];
}
exports.interGroup = interGroup;
function flatten(iterable) {
    return (0, ezell_toolbelt_1.Box)(iterable)
        .map((itr) => toArray(itr))
        .map((arr) => arr.flat()).value;
}
exports.flatten = flatten;
function sort(compareFn) {
    return (arr) => arr.sort(compareFn);
}
exports.sort = sort;
function difference(iterable) {
    return (other) => (0, ezell_toolbelt_1.Box)(iterable).map(group(other)).map(sort(byLongestLength)).map(diffGroup)
        .value;
}
exports.difference = difference;
function intersection(iterableA) {
    return (iterableB) => (0, ezell_toolbelt_1.Box)(iterableA)
        .map(group(iterableB))
        .map(sort(byLongestLength))
        .map(interGroup).value;
}
exports.intersection = intersection;
function union(iterableA) {
    return (iterableB) => (0, ezell_toolbelt_1.Box)([...iterableA, ...iterableB])
        .map(toSet)
        .map(toArray).value;
}
exports.union = union;
function getIterType(query) {
    const isArray = Array.isArray(query);
    const isString = typeof query === "string";
    const isMap = query instanceof Map;
    const isSet = query instanceof Set;
    const cases = [
        [isArray, "array"],
        [isString, "string"],
        [isMap, "map"],
        [isSet, "set"],
        [false, "other"],
    ];
    return cases.find(([condition]) => condition)[1];
}
function Iter(iterable, type) {
    const currentType = type ? type : getIterType(iterable);
    const toArray = () => Array.from(iterable);
    const toString = () => iterable.toString();
    const toMap = () => new Map(iterable);
    const toSet = () => new Set(iterable);
    const toIterable = () => iterable;
    const cases = [
        ["array", toArray],
        ["string", toString],
        ["map", toMap],
        ["set", toSet],
        ["other", toIterable],
    ];
    const caseMap = new Map(cases);
    const toUnwrap = caseMap.get(currentType);
    const value = toUnwrap();
    const asArr = Array.from(iterable);
    const unit = (value, type) => Iter(value, type);
    const map = (fn) => unit(asArr.map(fn), currentType);
    const filter = (fn) => unit(asArr.filter(fn), currentType);
    const reduce = (fn, init) => unit(asArr.reduce(fn, init), currentType);
    const flatMap = (fn) => unit(asArr.flatMap(fn), currentType);
    const slice = (start, end) => unit(asArr.slice(start, end), currentType);
    const intersection = (other) => {
        const otherArr = Array.from(other);
        return unit(asArr.filter((item) => otherArr.includes(item)), currentType);
    };
    /**
     * @description same as map but unwraps the result as no longer
     * guaranteed to be an iterable of the same type
     */
    const unpack = (fn) => asArr.map(fn);
    const unique = () => unit(new Set(asArr), currentType);
    return {
        value,
        map,
        filter,
        reduce,
        flatMap,
        slice,
        currentType,
        unit,
        unpack,
        unique,
        asArr,
        intersection,
    };
}
exports.default = Iter;
