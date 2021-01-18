/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const tag_function = require('./utils/tag-function');

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
 * pluralize`There is/are ${10} fox(es)`
 * //=> "There are 10 foxes"
 *
 * pluralize`There is/are ${0} fox(es)`
 * //=> "There are 0 foxes"
 *
 * pluralize`There is/are ${1} fox(es)`
 * //=> "There is 1 fox"
 *
 * pluralize`There is/are ${1} fox/foxes`
 * //=> "There is 1 fox"
 * ```
 *
 * ⚠️ If an interpolated value isn't an integer >= 0
 * the `pluralize` tag __won't__ perform any replacement on the adjacent text!
 *
 * 📢 A `0` will pick the __plural__ form(s).
 */
module.exports =
  tag_function
    ( (l, x, r) =>
        [   !is_pos_int(x)  ? l
          : x === 1         ? get_singular_form(l)
                            : get_plural_form(l)

        , x

        ,   !is_pos_int(x)  ? r
          : x === 1         ? get_singular_form(r)
                            : get_plural_form(r)
        ]
    );
