const { assert, test, testSuite } = require("../test")
const { car } = require("../stdlib")

const carTests = [
  testSuite,
  "stdlib::car",
  [
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
  ],
]

module.exports = {
  carTests,
}
