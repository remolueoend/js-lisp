const { last, head } = require("ramda")
const { Some, None } = require("opty")

/**
 * Returns wether or not the given expression is a non-empty list
 *
 * @param {*} exp expression to evaluate
 */
const isListExpression = exp => exp instanceof Array && exp.length

/**
 * Returns an option wrapping the function leading a list expression
 * The first item of the expressin is evaluated before returned.
 *
 * @param {None|Some} option
 */
const getExpressionFn = exp => {
  if (!isListExpression(exp)) {
    return None
  }
  const head = evalExp(exp[0])
  return typeof head === "function" ? Some(head) : None
}

/**
 * Evaluates the given expression and returns the result of it.
 * A valid expression might be:
 *  - a constant value, such as: `1`, `() => 0`, `[1, 2, 3]`
 *  - a Lisp like list-based expression: `[map, square, [1, 2, 3]]`
 */
const evalExp = exp => {
  if (!isListExpression(exp)) {
    return exp
  }

  // head of the expression. Evaluate this first to
  // check its type before evaulating the expression arguments.
  const head = evalExp(exp[0])

  // evaluate the arguments of the expression
  const expArgs = exp.slice(1).map(evalExp)

  if (typeof head !== "function") {
    // return the original expression as it is
    return exp
  }

  // call the expression head with the resolved expression values
  return head.apply(this, expArgs)
}

/**
 * Allows defining one or multiple variables
 * Accepts n arguments of values, where the last argument is
 * the callback called with the defined values.
 * The callback is expected to return an expression.
 *
 * @example
 * [def, 42, "foo", () => 0, (a, b, c) => [
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
const curryN = function curryN(argCount, fn) {
  return function curried(...args) {
    return args.length < argCount
      ? curryN(argCount - args.length, (...rest) => fn(...args, ...rest))
      : fn(...args)
  }
}

/**
 * Allows defining a function as part of an expression.
 * Expects a function body accepting any kind of arguments.
 * The provided function body is expected to return an expression
 *
 * The provided function body is not called,
 * until the number of expected arguments is given (auto-curried).
 *
 * @param {number} number of expected arguments
 * @param {Function} body Function body to apply
 *
 * @example
 * caar = [deffun, list => [car, [car, list]]]
 */
const deffun = function deffun(argCount, body) {
  const curried = curryN(argCount, body)
  return function(...args) {
    return evalExp(curried(...args))
  }
}

const defmac = function defmac(macro) {
  return macro
}

module.exports = {
  evalExp,
  curryN,
  deffun,
  def,
  defmac,
  isListExpression,
}
