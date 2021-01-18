/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const tag_function = require('./utils/tag-function');

/**
 * Trim interpolated values
 *
 * Trim all interpolated values if they are strings.
 * Non-string values are left as is.
 *
 * ```javascript
 * import {trim} from '@customcommander/tagtical';
 *
 * trim`My name is ${'   John    '}!`;
 * //=> "My name is John!"
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r) =>
        [ l
        , typeof x === 'string'
            ? x.trim()
            : x
        , r
        ]
    )
