const stdlibTests = require("./stdlib.test")
const { execTests, testSuite, test, assert } = require("../test")
const { evalExp, deffun } = require("../core")
const { and, or, empty, car, cdr, list } = require("../stdlib")
const { add } = require("../helpers")

// execTests([stdlibTests])

const ifOrElse = [
  deffun,
  3,
  (cond, ifVal, elseVal) => (cond ? ifVal() : elseVal()),
]

ifOrElse.transform = ([fn, cond, ifVal, elseVal]) => {
  return [list, fn, cond, () => ifVal, () => elseVal]
}

const sumList = [
  deffun,
  1,
  list => [
    ifOrElse,
    [empty, list],
    0,
    [add, [car, list], [sumList, [cdr, list]]],
  ],
]

execTests([
  [
    testSuite,
    "testsuite",
    [test, "is equal", [assert.isEqual, 6, [sumList, [1, 2, 3]]]],
  ],
])
