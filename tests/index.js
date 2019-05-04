const { carTests } = require("./stdlib.test")
const { execTests, testSuite, test } = require("../test")
const { evalExp } = require("../core")

execTests([carTests])

// evalExp([testSuite, "test suite desc: ", [[test, "test desc", false]]])
