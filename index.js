const { evalExp, def } = require("./core")
const { print, map } = require("./stdlib")
const { add } = require("./helpers")

let exp = [def, [1, 2, 3], 8, (data, base) => [map, [add, base], data]]

evalExp([print, exp])
