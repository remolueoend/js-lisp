const { deffun, evalExp } = require("./core")
const { ifOrElse, print, join, map } = require("./stdlib")

const isEqual = [deffun, 2, (v1, v2) => v1 === v2]

const test = [
  deffun,
  2,
  (desc, body) => [ifOrElse, body, `${desc}: success`, `${desc}: fail`],
]

const testSuite = [
  deffun,
  2,
  (desc, ...tests) => [print, `${desc}:\n  %s`, [join, "\n  ", tests]],
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
