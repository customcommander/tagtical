/**
 * @license MIT
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
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
