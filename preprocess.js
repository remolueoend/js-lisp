const { evalExp, isListExpression, defmac } = require("./core")

/**
 * Returns wether or not the given expression is a macro definition, such as:
 * `[defmac, ...]`
 *
 * @param {*} exp expressino to evaluate
 */
const isMacroDefinition = exp => isListExpression(exp) && exp[0] === defmac

/**
 * Resolves a potential macro in the given expression and returns
 * the transformed expression (eg. the result of the macro).
 * If no macro could be found, the given expression is returned.
 *
 * @param {*} exp expression to resolve
 *
 * @example
 * resolveMacro([macro, arg1, arg2]) // [macroResult, arg1', arg2']
 */
const resovleMacro = exp => {
  if (isMacroDefinition(exp[0])) {
    const macro = evalExp(exp[0])
    const transformedExpression = macro(exp)

    return transformedExpression
  } else {
    return exp
  }
}

/**
 * Preprocesses the given expression by:
 * - resolving all macros
 *
 * @param {*} exp expression to evaluate
 */
const preprocess = exp => {
  const resolvedExp = resovleMacro(exp)

  if (!isListExpression(resolvedExp)) {
    return resolvedExp
  }

  return resolvedExp.map(preprocess)
}

module.exports = {
  preprocess,
}
