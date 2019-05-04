const { evalExp, deffun } = require("./core")
const R = require("ramda")

const or = [deffun, 2, (v1, v2) => v1 || v2]
const and = [deffun, 2, (v1, v2) => v1 && v2]

/**
 * Prints the given value to the console
 * and returns it again.
 */
const print = [deffun, 1, (...args) => [or, [console.log, ...args], args]]

const ifOrElse = [
  deffun,
  3,
  (cond, ifVal, elseVal) => [or, [and, cond, ifVal], elseVal],
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
 * Maps and returns each element of the given list using the given transform function.
 */
const map = [deffun, 2, (transform, list) => R.map(transform, list)]

/**
 * Joins the given list using the provided separator
 */
const join = [deffun, 2, (separator, list) => list.join(separator)]

/**
 * Throws the given error.
 */
const raise = [
  deffun,
  1,
  error => {
    throw error
  },
]

module.exports = {
  print,
  car,
  cdr,
  map,
  ifOrElse,
  join,
}
