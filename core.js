const { last, head } = require("ramda")

/**
 * Evaluates the given expression and returns the result of it.
 * A valid expression might be:
 *  - a constant value, such as: `1`, `() => 0`, `[1, 2, 3]`
 *  - a Lisp like list-based expression: `[map, square, [1, 2, 3]]`
 */
const evalExp = exp => {
  if (!(exp instanceof Array) || !exp.length) {
    return exp
  }

  // the first element of an expression could itself be
  // an expression which has to be evaluated first.
  // example:
  // const car = [deffun, list => [head, list]]
  // evalExp([car, [1, 2, 3]])
  const expValues = exp.map(evalExp)

  const head = expValues[0]
  if (typeof head !== "function") {
    // return the original expression as it is
    return exp
  }

  // call the expression head with the resolved expression values
  return head.apply(this, expValues.slice(1))
}

/**
 * Allows defining one or multiple variables
 * Accepts n arguments of values, where the last argument is
 * the callback called with the defined values.
 * The callback is expected to return an expression.
 *
 * @example
 * [def, 42, "foo", () => 0, ([a, b, c]) => [
 *    print(a, b, c) // 42, "foo", Function
 * ]]
 */
const def = function() {
  const args = Array.prototype.slice.call(arguments)
  const values = args.slice(0, -1)
  const callback = last(args)
  const cbArgs = values.map(evalExp)

  return evalExp(callback(...cbArgs))
}

/**
 * Curries the given function requesting the provided
 * number of arguments.
 *
 * @param {number} argCount Number of arguments
 * @param {Function} fn Function to curry
 *
 * @example
 * const add3 = (a, b, c) => a + b + c
 * const curried = curryN(3, add3)
 * curried(1)(2)(3) === 6
 * curried(1, 2)(3) === 6
 * curried(1)(2, 3) === 6
 * curried(1, 2, 3) === 6
 */
const curryN = (argCount, fn) => (...args) =>
  args.length < argCount
    ? curryN(argCount - args.length, (...rest) => fn(...args, ...rest))
    : fn(...args)

/**
 * Allows defining a function as part of an expression.
 * Expects a function body accepting any kind of arguments.
 * The provided function body is expected to return an expression
 *
 * @param {Function} body Function body to apply
 *
 * @example
 * caar = [deffun, list => [car, [car, list]]]
 */
const deffun = (argCount, body) => {
  const curried = curryN(argCount, body)
  return function(...args) {
    return evalExp(curried(...args))
  }
}

module.exports = {
  evalExp,
  curryN,
  deffun,
  def,
}
