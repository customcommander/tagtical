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
 */

/** @type HideOpts */
const DEFAULT_OPTS =
  { mask: 'xxx'
  };

/**
 * Hides interpolated values
 *
 * The `hide` tag replaces all interpolated values with a default mask `'xxx'`:
 *
 * ```javascript
 * import {hide} from '@customcommander/tagtical';
 * 
 * hide`Hi ${name}, your credit card number is ${cc_num}`
 * //=> "Hi xxx, your credit card number is xxx"
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r, {mask}) =>
        [ l
        , mask
        , r
        ]
    , DEFAULT_OPTS
    );
