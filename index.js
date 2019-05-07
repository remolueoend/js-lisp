const { evalExp, def, deffun } = require("./core")
const { print, map, ifOrElse, equal, ls } = require("./stdlib")
const { add, sub } = require("./helpers")

/**
 * Returns the value at the n-th position (one-indexed) of the fibonacci-sequence.
 *
 * @param {number} n position in the sequence to read.
 *
 * @example
 * [fibonacci, 1] // 1
 * [fibonacci, 2] // 1
 * [fibonacci, 3] // 2
 * [fibonacci, 7] // 13
 */
let fibonacci = [
  deffun,
  1,
  n => [
    ifOrElse,
    [ls, n, 3],
    () => 1,
    () => [add, [fibonacci, [sub, n, 1]], [fibonacci, [sub, n, 2]]],
  ],
]

/**
 * Expression defining a variable `data` = [1, 2, 3] and `base` = 8.
 * Maps over `data` and adds `base` to each value.
 */
let someRandomExpression = [
  def,
  [1, 2, 3],
  8,
  (data, base) => [map, [add, base], data],
]

evalExp([
  print,
  `the 9th value of the fibonacci-sequence is: %d`,
  [fibonacci, 9],
])

evalExp([
  print,
  `the result of some random expression is: %o`,
  someRandomExpression,
])
