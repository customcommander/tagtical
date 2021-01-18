/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
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
 * All items in the list are joined with `', '` except for the last two items
 * that are joined with `' and '`.
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
