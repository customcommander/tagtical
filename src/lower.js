/**
 * @license
 * Copyright (c) 2020 Julien Gonzalez
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const tag_function = require('./utils/tag-function');

/**
 * Lowercase interpolated values
 *
 * Lowercase all interpolated values if they are strings.
 * Non-string values are left as is.
 *
 * ```javascript
 * import {lower} from '@customcommander/tagtical';
 *
 * lower`I had ${'BREAD'}, ${'BEANS'} and ${'COVFEFE'} for breakfast`
 * //=> "I had bread, beans and covfefe for breakfast"
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r) =>
        [ l
        , typeof x === 'string'
            ? x.toLowerCase()
            : x
        , r
        ]
    );
