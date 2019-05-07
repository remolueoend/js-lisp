const { def, deffun, evalExp } = require("./core")
const { ifOrElse, print, join, map, or, car, format, at } = require("./stdlib")
const R = require("ramda")

/**
 * Returns if the two given values are equal.
 *
 * @example
 * [isEqual, [1, 2, 3], [1, 2, 3]] // [true, true]
 * [isEqual, 1, 2] // [fale, "expected 1 to equal 2"]
 */
const isEqual = [
  deffun,
  2,
  (v1, v2) => [
    def,
    [R.equals, v1, v2],
    result => [result, [or, result, `expected ${v1} to equal ${v2}`]],
  ],
]

const test = [
  deffun,
  2,
  function test(desc, body) {
    return [
      ifOrElse,
      [car, body],
      () => `SUCCESS..: ${desc}`,
      () => [format, `FAIL.....: ${desc}: %s`, [at, 1, body]],
    ]
  },
]

const testSuite = [
  deffun,
  2,
  function testSuite(desc, ...tests) {
    return [print, `${desc}:\n  %s`, [join, "\n  ", tests]]
  },
]

const execTests = testExpressions => testExpressions.map(evalExp)

module.exports = {
  test,
  testSuite,
  execTests,
  assert: {
    isEqual,
  },
}
