/**
 * @license
 * Copyright (c) 2019 Julien Gonzalez
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
 * @typedef {Object} HideOpts
 * @property {string} [mask='xxx']
 *    The string to use to replace an interpolated value.
 *
 *    ```javascript
 *    hide({mask: '???'})`Your name is ${name} and you are ${age} old`;
 *    //=> "Your name is ??? and you are ??? old"
 *    ```
 *
 * @property {boolean} [fill=false]
 *    When set to `true`, the mask will cover the entire space that the interpolated
 *    value would have taken otherwise.
 *
 *    Please note that if the interpolated value isn't a string, it will be
 *    converted into one via a call to `String()`.
 *
 *    ```javascript
 *    hide`Your name is ${'John'} and you live in ${'Manchester'}`;
 *    //=> "Your name is xxx and you live in xxx"
 *
 *    hide({fill: true})`Your name is ${'John'} and you live in ${'Manchester'}`;
 *    //=> "Your name is xxxx and you live in xxxxxxxxxx"
 *    ```
 */

/** @type HideOpts */
const DEFAULT_OPTS =
  { mask: 'xxx'
  , fill: false
  };

/**
 * Returns the appropriate mask for given string `str` according to given options `opts`.
 * @param {HideOpts} opts
 * @param {string} str
 * @return {string}
 */
const create_mask = ({mask, fill}, str) =>
    typeof mask !== 'string'  ? create_mask({mask: DEFAULT_OPTS.mask, fill}, str)
  : typeof fill !== 'boolean' ? create_mask({mask, fill: DEFAULT_OPTS.fill}, str)
  : fill === true             ? mask.repeat(Math.ceil(str.length/mask.length)).substring(0, str.length)
                              : mask;

/**
 * Hides interpolated values
 *
 * The `hide` tag replaces all interpolated values with a default mask `'xxx'`:
 *
 * ```javascript
 * import {hide} from '@customcommander/tagtical';
 * 
 * hide`Hi ${'John'}, your credit card number is ${'1234-2345-3456-4567'}`
 * //=> "Hi xxx, your credit card number is xxx"
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r, opts) =>
        [ l
        , create_mask(opts, String(x))
        , r
        ]
    , DEFAULT_OPTS
    );
