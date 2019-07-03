// LICENSE
// https://github.com/azu/textlint-rule-spellcheck-tech-word
// Copyright (c) 2014 azu
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

const RuleHelper = require("textlint-rule-helper").RuleHelper
const spellCheck = require('./spellCheck').spellCheck

const reporter = context => {
  const helper = new RuleHelper(context)
  const { getSource, fixer, report, Syntax, RuleError } = context
  return {
    Syntax: {
      Str: node => {
        if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
          return
        }
        const text = getSource(node)
        const results = spellCheck(text)
        results.forEach(result => {
          const fixCommand = fixer.replaceTextRange([
            result.paddingIndex, result.paddingIndex + result.actual.length
          ], result.expected)
          context.report(node, new context.RuleError(result.actual + " => " + result.expected, {
            index: result.paddingIndex,
            fix: fixCommand
          }))
        })
      },
    }
  }
}

module.exports = {
  linter: reporter,
  fixer: reporter
}