/**
 * @license MIT
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const tag_function = require('./utils/tag-function');

/**
 * Uppercase interpolated values
 *
 * Uppercase all interpolated values if they are strings.
 * Non-string values are left as is.
 *
 * ```javascript
 * import {upper} from '@customcommander/tagtical';
 *
 * upper`My name is ${'john'} and I am ${40} years old`
 * //=> "My name is JOHN and I am 40 years old"
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r) =>
        [ l
        , typeof x === 'string'
            ? x.toUpperCase()
            : x
        , r
        ]
    );
