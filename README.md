# LISPY-JS

Fun-project for playing around with Lisp-alike array-based Javascript expressions.

The idea is to express a whole program using only javascript arrays, and - where necessary - arrow functions.

The core of this project is a function called `evalExp<R>(Expression): R` located at `./core.js`, accepting an array-based expression and returning the resolved value.

This project might help me to understand the advantages of Lisp-related languages, especially in context of meta-programming.

Check out `./index.js` for some basic examples.

## Other things to try

Let's assume we want to define a function which accepts a list of numeric values and returns their sum.
To solve this recursively, we could just add the head of the list to the result of the recursive call for the tail of the same list. If the list is empty, we return `0`:
```js
const addList = [deffun, 1, list => [
    ifOrElse,
    [empty, list],
    0,
    [add, [car, list], [addList, [cdr, list]]]
]]
```

`ifOrElse` is defined as:
```js
const ifOrElse = [deffun, 3, (cond, ifVal, elseVal) => [
    or, [and, cond, ifVal], elseVal // le's just ignore all flaws of these simple comparisons
]
```

Our `addList` function won't work. Instead it fails with `RangeError: Maximum call stack size exceeded`. This happens because when evaluating the resulting expression of `addList`, `ifVal` and `elseVal` are always evaluated regardless of the condition, leaving us with an indefinitely recurring function. To avoid this error, we have to provide separate arrow functions for `ifVal` and `elseVal` to delay the evaluation:
```js
const addList = [deffun, 1, list => [
    ifOrElse,
    [empty, list],
    () => 0,
    () => [add, [car, list], [addList, [cdr, list]]]
]]
```

What if the evaluation routine (`evalExp`) could instead automate this transformation? Because our expressions are nothing else than plain Javascript arrays, this should be fairly easy:
```js
const transformIfOrElse = [deffun, 1, ([cond, ifVal, elseVal]) => [
    cond, () => ifVal, () => elseVal
]]
```

**➡ We need some kind of function decorators on expressions allowing us to declare transformations executed before evaluation .**
