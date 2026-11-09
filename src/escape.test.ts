/**
 * MIT License
 *
 * Copyright (c) 2026–Present Xiao Hanyu (https://github.com/xiaohanyu)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { describe, expect, it } from 'vitest'
import { escapeTypst } from './escape'

describe(escapeTypst, () => {
  it('returns empty and plain text unchanged', () => {
    expect(escapeTypst('')).toBe('')
    expect(escapeTypst('Hello, Typst!')).toBe('Hello, Typst!')
  })

  it('preserves Unicode and whitespace', () => {
    const input = '你好 👩\u200d💻\tline one\n\nline two'

    expect(escapeTypst(input)).toBe(input)
  })

  it.each([
    ['\\', '\\\\'],
    ['/', '\\/'],
    ['[', '\\['],
    [']', '\\]'],
    ['~', '\\~'],
    ['-', '\\-'],
    ['.', '\\.'],
    ["'", "\\'"],
    ['"', '\\"'],
    ['*', '\\*'],
    ['_', '\\_'],
    [':', '\\:'],
    ['`', '\\`'],
    ['$', '\\$'],
    ['<', '\\<'],
    ['>', '\\>'],
    ['@', '\\@'],
    ['#', '\\#'],
    ['=', '\\='],
    ['+', '\\+'],
  ])('escapes %s', (input, expected) => {
    expect(escapeTypst(input)).toBe(expected)
  })

  it('escapes emphasis and strong markup', () => {
    expect(escapeTypst('_emphasis_ and *strong*')).toBe(
      '\\_emphasis\\_ and \\*strong\\*'
    )
  })

  it('escapes code, math, labels, and references', () => {
    expect(escapeTypst('#rect $x^2$ <label> @label `raw`')).toBe(
      '\\#rect \\$x^2\\$ \\<label\\> \\@label \\`raw\\`'
    )
  })

  it('escapes comments and automatic links', () => {
    expect(escapeTypst('// comment /* block */ https://example.com')).toBe(
      '\\/\\/ comment \\/\\* block \\*\\/ https\\:\\/\\/example\\.com'
    )
  })

  it('escapes smart quotes and symbol shorthands', () => {
    expect(escapeTypst(`"quoted" 'single' --- ... ~`)).toBe(
      `\\"quoted\\" \\'single\\' \\-\\-\\- \\.\\.\\. \\~`
    )
  })

  it('escapes line-leading block markers and numbering', () => {
    const input = '= Heading\n- item\n+ item\n/ Term: description\n1. item'

    expect(escapeTypst(input)).toBe(
      '\\= Heading\n\\- item\n\\+ item\n\\/ Term\\: description\n1\\. item'
    )
  })
})
