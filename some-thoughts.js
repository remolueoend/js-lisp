ifOrElse = [deffun, arg => arg()]
ifOrElseMacro = [defmac, ([_, arg]) => [ifOrElse, () => arg]]

// before preprocessing
exp = [
    [deffun, 1, (a1, a2) => a1 + a2], 2, 3
]

// after preprocessing
exp = [
    (returnOf(deffun(1, (a1, a2) => a1 + a2)))
]

exp = [
    [deffun, (a1, a2) => [add, a1, a2]], 2, 3
]


// ## Macros
exp = [ifOrElseMacro, 1]
// resovled
exp = [
    [defmac, ([_, arg]) => [ifOrElse, () => arg],
    1
]
// processed
exp = [
    [ifOrElse, () => 1]
]
