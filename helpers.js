const { deffun } = require("./core")

const add = [
  deffun,
  2,
  function add(a, b) {
    return a + b
  },
]
const sub = [deffun, 2, (a, b) => a - b]
const multiply = [deffun, 2, (a, b) => a * b]

/**
 * returns the square of the given number.
 *
 * @param {number} value to square
 */
const square = [deffun, 1, n => [multiply, n, n]]

module.exports = {
  square,
  add,
  sub,
  multiply,
}
