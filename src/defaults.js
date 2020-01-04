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

const RE = /^(\s*)(\/)([a-zA-Z0-9]+)(\s*)/;

const is_empty = x =>
      x === null
  ||  x === undefined
  ||  (   typeof x === 'number'
      &&  !x
      )
  ||  (   (   typeof x === 'string'
          ||  Array.isArray(x)
          )
      &&  x.length === 0
      )
  ||  (   typeof x === 'object'
      &&  Object.keys(x).length === 0
      );

const get_default = str =>
  str.replace
    ( RE
    , (ignored, lws, sep, replacement, tws) =>
        `${lws}${replacement}${tws}`
    );

const remove_default = str =>
  str.replace
    ( RE
    , (ignored, lws, sep, replacement, tws) =>
        `${lws}${tws}`
    );

/**
 * Replace an empty value with a default value
 *
 * The default value for an empty interpolated value is defined in the string template itself.<br>
 * It is separated by a single `/` character. e.g. `${name}/guest`.
 * 
 * A value is considered empty if it is:
 *
 * - `null`
 * - `undefined`
 * - An empty string `''`
 * - An empty array `[]`
 * - An empty object `{}`
 * - A number that is either `0` or `NaN`
 *
 * When the default value is used, the separator (i.e. the `/` character)
 * is removed from the string.
 *
 * When the interpolated value is not empty, the default value (and the separator)
 * is removed from the string.
 *
 * ```javascript
 * import {defaults} from '@customcommander/tagtical';
 *
 * var username = '';
 * var num;
 * defaults`Hi ${username}/guest, you have ${num}/no new emails`;
 * //=> "Hi guest, you have no new emails"
 *
 * var username = 'John';
 * var num = 10;
 * defaults`Hi ${username}/guest, you have ${num}/no new emails`;
 * //=> "Hi John, you have 10 new emails"
 * ```
 */
module.exports =
  (l, x, r) =>
    [ l
    , is_empty(x)
        ? ''
        : x
    , is_empty(x)
        ? get_default(r)
        : remove_default(r)
    ];
