const {isMacroDefinition} = require("../core")
const {assert, testSuite, test} = require("../test")

const isMacroDefinition_tests = [
    testSuite,
    "core::isMacroDefinition",
    [
        test,
        "returns true for macro definitions",
        [assert.isEqual, true, [isMacroDefinition]]
    ]
]

