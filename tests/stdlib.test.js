const { assert, test, testSuite } = require("../test")
const { car, cdr } = require("../stdlib")

const carTests = [
  testSuite,
  "stdlib::car",
  [
    test,
    "returns the first element of a list",
    [assert.isEqual, [car, [42, 43, 44]], 42],
  ],
  [
    test,
    "returns undefined if the given list is empty",
    [assert.isEqual, [car, []], undefined],
  ],
]

const cdrTests = [
  testSuite,
  "std::cdr",
  [
    test,
    "returns the tail of a given list",
    [assert.isEqual, [cdr, [1, 2, 3]], [2, 3]],
  ],
  [
    test,
    "returns an empty list if an empty list is given",
    [assert.isEqual, [cdr, []], []],
  ],
]

module.exports = [carTests, cdrTests]
