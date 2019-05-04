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
const car = [deffun, 1, list => [list[0]]]

const map = [deffun, 2, (mapper, list) => [R.map(mapper, list)]]

const join = [deffun, 2, (separator, list) => list.join(separator)]

module.exports = {
  print,
  car,
  map,
  ifOrElse,
  join,
}
