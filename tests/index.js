const stdlibTests = require("./stdlib.test")
const { execTests, testSuite, test, assert } = require("../test")
const { evalExp, deffun, defmac } = require("../core")
const { preprocess } = require("../preprocess")
const { and, or, empty, car, cdr, list, print, ifOrElse } = require("../stdlib")
const { add } = require("../helpers")

// execTests([stdlibTests])

const ifOrElseMacro = [
  defmac,
  ([fn, cond, ifVal, elseVal]) => [ifOrElse, cond, () => ifVal, () => elseVal],
]

const sumList = [
  deffun,
  1,
  list => [
    ifOrElseMacro,
    [empty, list],
    0,
    [add, [car, list], [sumList, [cdr, list]]],
  ],
]

// execTests([
//   [
//     testSuite,
//     "testsuite",
//     [test, "is equal", [assert.isEqual, 6, [sumList, [1, 2, 3]]]],
//   ],
// ])

const getList = [deffun, 0, () => [[add, 1, 2]]]

// evalExp([print, [ifOrElseMacro, true, 2, 1]])

testFn = [deffun, 1, arg => arg()]
testFnMacro = [defmac, ([_, arg]) => [testFn, () => arg]]

// [[defmac, ([_, arg]) => [testFn, () => arg], 1]
const processedExpression = preprocess([testFnMacro, 1])
evalExp([print, processedExpression])
