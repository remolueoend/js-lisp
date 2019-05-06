const { assert, test, testSuite } = require("../test")
const { car, cdr, len, empty, reduce } = require("../stdlib")
const { add } = require("../helpers")

const car_tests = [
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

const cdr_tests = [
  testSuite,
  "std::cdr",
  [
    test,
    "returns the tail of a given list",
    [assert.isEqual, [2, 3], [cdr, [1, 2, 3]]],
  ],
  [
    test,
    "returns an empty list if an empty list is given",
    [assert.isEqual, [], [cdr, []]],
  ],
]

const len_tests = [
  testSuite,
  "stdlib::len",
  [
    test,
    "returns the length of the given list",
    [assert.isEqual, 3, [len, [1, 2, 3]]],
  ],
  [test, "returns 0 for an empty list", [assert.isEqual, 0, [len, []]]],
]

const empty_tests = [
  testSuite,
  "stdlib::empty",
  [test, "returns true for an empty list", [assert.isEqual, true, [empty, []]]],
  [
    test,
    "returns false for a non-empty list",
    [assert.isEqual, false, [empty, [1, 2, 3]]],
  ],
]

const reduce_tests = [
  testSuite,
  "stdlib::reduce",
  [
    test,
    "reduces the given list using the provided reducer",
    [assert.isEqual, 6, [reduce, add, [1, 2, 3], 0]],
  ],
]

module.exports = [car_tests, cdr_tests, len_tests, empty_tests, reduce_tests]
