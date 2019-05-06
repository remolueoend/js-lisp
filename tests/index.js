const stdlibTests = require("./stdlib.test")
const { execTests, testSuite, test } = require("../test")
const { evalExp } = require("../core")

execTests([stdlibTests])
