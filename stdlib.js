const util = require("util")
const { evalExp, deffun } = require("./core")
const { equals: ramda_equals } = require("ramda")

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
const equal = [
  deffun,
  2,
  function equal(v1, v2) {
    return ramda_equals(v1, v2)
  },
]

const gt = [deffun, 2, (v1, v2) => v1 > v2]
const ls = [deffun, 2, (v1, v2) => v1 < v2]

/**
 * Returns either the given `ifVal` or `elseVal`, based on the boolish result
 * of the provided condition.
 */
const ifOrElse = [
  deffun,
  3,
  function ifOrElse(cond, ifVal, elseVal) {
    return evalExp(cond ? ifVal() : elseVal())
  },
]

/**
 * Function returning the first element of a given list (head)
 */
const car = [deffun, 1, list => list[0]]

/**
 * Function returning the tail of the given list.
 */
const cdr = [deffun, 1, list => list.slice(1)]

const at = [deffun, 2, (index, list) => list[index]]

/**
 * Prepends the given element to the provided list.
 */
const prepend = [deffun, 2, (list, element) => [element, ...list]]

/**
 * Returns a list with the given items
 */
const list = [deffun, 1, (...items) => items]

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
  function reduceFn(reducer, list, initialValue) {
    return [
      ifOrElse,
      [empty, list],
      () => initialValue,
      () => [
        reducer,
        [reduce, reducer, [cdr, list], initialValue],
        [car, list],
      ],
    ]
  },
]

const map = [
  deffun,
  2,
  function(transform, list) {
    return [reduce, (acc, elem) => [prepend, acc, [transform, elem]], list, []]
  },
]

/**
 * Joins the given list using the provided separator
 */
const join = [deffun, 2, (separator, list) => list.join(separator)]

const format = [
  deffun,
  2,
  function format(str, ...args) {
    return util.format(str, ...args)
  },
]

module.exports = {
  and,
  or,
  print,
  car,
  cdr,
  at,
  empty,
  equal,
  gt,
  ls,
  len,
  map,
  ifOrElse,
  list,
  join,
  reduce,
  not,
  format,
}
