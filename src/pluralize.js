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

const is_pos_int = x =>
  Number.isInteger(x) && x >= 0;

/*
 * Example of strings we need to match:
 *
 * - ' fox/foxes '
 * - ' fox(es) '
 *
 * We need to extract:
 *
 * - The leading whitespaces; lsw
 * - The singular form e.g 'fox'; snf
 * - The plural form e.g. '/foxes' or '(es)'; plf; will be reprocessed
 * - The trailing whitespaces; tws
 */
const RE = /(\s*)(\w+)(\/\w+|\(\w+\))(\s*)/;

const get_singular_form = str =>
  str.replace(RE, (ignored, lws, snf, plf, tws) =>
    lws + snf + tws);

const get_plural_form = str =>
  str.replace(RE, (ignored, lws, snf, plf, tws) =>
    plf[0] === '/'
      ? lws + plf.substring(1) + tws
      : lws + snf + plf.substring(1, plf.length-1) + tws);


/**
 * Choose between singular or plural forms.
 *
 * The `pluralize` tag allows you to build the "template" of a sentence without having
 * to deal with the logic of choosing between singular or plural forms.
 *
 * e.g. given `"There is/are ${n} fox(es) and ${m} wolf/wolves"`
 *
 * The `pluralize` tag scans the string from left to right and picks forms depending
 * on the value of the nearest interpolated value.
 *
 * Forms are separated by a `/` character with the singular form first
 * and the plural form last. e.g. `is/are`.
 *
 * When both forms share the same root e.g. `fox/foxes`
 * an abbreviated notation can also be used: `fox(es)`.
 *
 * ```javascript
 * import {pluralize} from '@customcommander/tagtical';
 *
 * let num;
 *
 * num = 10;
 * pluralize`There is/are ${num} fox(es)`
 * //=> "There are 10 foxes"
 *
 * num = 0;
 * pluralize`There is/are ${num} fox(es)`
 * //=> "There are 0 foxes"
 *
 * num = 1;
 * pluralize`There is/are ${num} fox(es)`
 * //=> "There is 1 fox"
 *
 * // or
 *
 * num = 1;
 * pluralize`There is/are ${num} fox/foxes`
 * //=> "There is 1 fox"
 * ```
 *
 * ⚠️ If an interpolated value isn't an integer >= 0
 * the `pluralize` tag __won't__ perform any replacement on the adjacent text!
 *
 * 📢 A `0` will pick the __plural__ form(s).
 */
module.exports =
  (l, x, r) =>
    [   !is_pos_int(x)  ? l
      : x === 1         ? get_singular_form(l)
                        : get_plural_form(l)

    , x

    ,   !is_pos_int(x)  ? r
      : x === 1         ? get_singular_form(r)
                        : get_plural_form(r)
    ];
