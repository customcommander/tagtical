/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
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
 * defaults`Hi ${''}/guest, you have ${undefined}/no new emails`;
 * //=> "Hi guest, you have no new emails"
 *
 * defaults`Hi ${'John'}/guest, you have ${10}/no new emails`;
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
