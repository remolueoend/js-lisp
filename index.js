const { evalExp, def, deffun, curryN } = require("./core")
const { print } = require("./stdlib")
const { head, map } = require("ramda")
const { square, add } = require("./helpers")
const { test, execTests, assert } = require("./test")

let exp = [def, [1, 2, 3], 8, (data, base) => [map, [add, base], data]]

console.log(evalExp(exp))
