const { evalExp, deffun } = require("./core")
const R = require("ramda")

const or = [deffun, 2, (v1, v2) => v1 || v2]
const and = [deffun, 2, (v1, v2) => v1 && v2]

/**
 * Inverts the given value.
 */
const not = [deffun, 1, val => !val]

/**
 * Prints the given value to the console
 * and returns it again.
 */
const print = [deffun, 1, (...args) => [or, [console.log, ...args], args]]

/**
 * Returns whether or not the given two values are referentially equal.
 */
const equal = [deffun, 2, (v1, v2) => R.equals(v1, v2)]

/**
 * Returns either the given `ifVal` or `elseVal`, based on the boolish result
 * of the provided condition.
 */
const ifOrElse = [
  deffun,
  3,
  (cond, ifVal, elseVal) => (cond ? ifVal() : elseVal()),
]

/**
 * Function returning the first element of a given list (head)
 */
const car = [deffun, 1, list => list[0]]

/**
 * Function returning the tail of the given list.
 */
const cdr = [deffun, 1, list => list.slice(1)]

/**
 * Prepends the given element to the provided list.
 */
const prepend = [deffun, (list, element) => [element, ...list]]

/**
 * Returns the length of a given list
 */
const len = [deffun, 1, list => list.length]

/**
 * Returns whether or not the given list is empty.
 */
const empty = [deffun, 1, list => [equal, 0, [len, list]]]

/**
 * Reduces the given list from right to left
 * using the provided `reducer(acc, element)` function.
 */
const reduce = [
  deffun,
  2,
  (reducer, list, initialValue) => [
    ifOrElse,
    [empty, list],
    () => initialValue,
    () => [reducer, [reduce, reducer, [cdr, list]], [car, list], initialValue],
  ],
]

const map2 = [
  deffun,
  (transform, list) => [
    reduce,
    (acc, elem) => [prepend, acc, [transform, elem]],
    [],
  ],
]

/**
 * Maps and returns each element of the given list using the given transform function.
 */
const map = [deffun, 2, (transform, list) => R.map(transform, list)]

/**
 * Joins the given list using the provided separator
 */
const join = [deffun, 2, (separator, list) => list.join(separator)]


module.exports = {
  print,
  car,
  cdr,
  empty,
  equal,
  len,
  map,
  ifOrElse,
  join,
  reduce,
  not,
}
