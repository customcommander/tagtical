/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
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
