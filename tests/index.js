const stdlibTests = require("./stdlib.test")
const { execTests, testSuite, test, assert } = require("../test")
const { evalExp } = require("../core")

execTests([stdlibTests])

// execTests([
//   [testSuite, "testsuite", [test, "is equal", [assert.isEqual, 1, 2]]],
// ])
