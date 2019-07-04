// LICENSE
// https://github.com/azu/spellcheck-technical-word
// Copyright (c) 2015 azu
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
// SOFTWARE.

const dictonary = require('aws-word-rules')
const StructuredSource = require('structured-source')

const spellCheck = text => {
  const src = new StructuredSource(text)
  const results = []
  dictonary.forEach(item => {
    const query = new RegExp(item.pattern, item.flag)
    const match = query.exec(text)
    if (!match) {
      return
    }
    const matchedString = match[0]
    const expected = matchedString.replace(query, item.expected)
    if (text.slice(match.index).indexOf(expected) === 0) {
      return
    }
    const position = src.indexToPosition(match.index)
    results.push({
      actual: matchedString,
      expected: expected,
      paddingIndex: match.index,
      paddingLine: position.line - 1, // start with 0
      paddingColumn: position.column, // start with 0
    })
  })
  return results.reverse()
}

module.exports = {
  spellCheck: spellCheck,
}
