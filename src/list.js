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
 * @typedef {Object} ListOpts
 * @property {string} [delim=', ']
 *    The string to use to join all items expect the last.
 *
 *    ```javascript
 *    const arr = ['Huey', 'Dewey', 'Louie'];
 *    list({delim: '; '})`Hey ${arr}!`;
 *    //=> "Hey Huey; Dewey and Louie!"
 *    ```
 *
 * @property {string} [delimlast=' and ']
 *    The string to use to join the last two items.
 *
 *    ```javascript
 *    const arr = ['Huey', 'Dewey', 'Louie'];
 *    list({delimlast: ' & '})`Hey ${arr}!`;
 *    //=> "Hey Huey, Dewey & Louie!"
 *    ```
 */

/** @type ListOpts */
const DEFAULT_OPTS =
  { delim: ', '
  , delimlast: ' and '
  };

/**
 * Join `arr` according to given options `opts`.
 * @param {ListOpts} opts
 * @param {Array} arr
 * @return {string}
 */
const join = ({delim, delimlast}, arr) =>
    typeof delim !== 'string'      ? join({delim: DEFAULT_OPTS.delim, delimlast}, arr)
  : typeof delimlast !== 'string'  ? join({delim, delimlast: DEFAULT_OPTS.delimlast}, arr)
  : arr.length === 0               ? ''
  : arr.length === 1               ? arr[0]
  : arr.length === 2               ? arr[0] + delimlast + arr[1]
                                   : arr.slice(0, -1).join(delim) + delimlast + arr[arr.length-1];

/**
 * Textual representation of an array
 *
 * All items in the list are joined with `', '` expected for the last two items
 * which are joined with `' and '`.
 *
 * ```javascript
 * import {list} from '@customcommander/tagtical';
 *
 * const arr = ['Huey', 'Dewey', 'Louie'];
 * list`Hey ${arr}!`;
 * //=> "Hey Huey, Dewey and Louie!"
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r, opts) =>
        [ l
        , Array.isArray(x)
            ? join(opts, x)
            : x
        , r
        ]
    , DEFAULT_OPTS
    );
