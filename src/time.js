/**
 * @license
 * Copyright (c) 2020 Julien Gonzalez
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

const
  { compose
  , constant
  , fallback
  , join
  , map
  , match
  , split
  , tail
  , trim
  } = require('./utils/fp');

const INVALID_DATE = String(new Date('All those moments will be lost in time, like tears in the rain.'));
const RE = /^\s*@\S+/;

/** @enum {string} */
const formatOptions =
  { DAY_NUM_LEADING_ZEROS: 'd'
  , DAY_NUM: 'j'
  , MONTH_NUM_LEADING_ZEROS: 'm'
  , MONTH_NUM: 'n'
  , YEAR_NUM_LONG: 'Y'
  , YEAR_NUM: 'y'
  };

/**
 * @type {Object<string, function(Date): string>}
 */
const formatFunctions =
  { [formatOptions.DAY_NUM_LEADING_ZEROS]:
      d => String(d.getDate()).padStart(2, '0')

  , [formatOptions.DAY_NUM]:
      d => String(d.getDate())

  , [formatOptions.MONTH_NUM_LEADING_ZEROS]:
      d => String(d.getMonth() + 1).padStart(2, '0')

  , [formatOptions.MONTH_NUM]:
      d => String(d.getMonth() + 1)

  , [formatOptions.YEAR_NUM_LONG]:
      d => String(d.getFullYear())

  , [formatOptions.YEAR_NUM]:
      d => String(d.getFullYear()).slice(-2)
  };

const is_date =
  x =>
        x instanceof Date
    &&  String(x) !== INVALID_DATE;

/**
 * Extract a date format from a string
 *
 * @example
 * get_format('@Y-m-d some extraneous text');
 * //=> "Y-m-d"
 *
 * @function
 * @param {string} str
 * @return {string}
 */
const get_format =
  compose
    ( tail
    , trim
    , fallback('')
    , match(RE)
    );

const clear_format = str => str.replace(RE, '');

const formatter =
  d =>
    f =>
      (formatFunctions[f] || constant(f))
        (d);

const format =
  (f, d) =>
    compose
      ( join('')
      , map(formatter(d))
      , split(/([^Yymndj]+)/)
      )(f);

/**
 * Format dates within a string.
 *
 * The `time` tag formats all interpolated dates according to a given format.
 *
 * ```javascript
 * import {time} from '@customcommander/tagtical';
 * 
 * time`Last login on ${new Date()}@Y-m-d`;
 * //=> "Last login on 2020-01-09"
 * ```
 *
 * The format is attached to the date as follow `${date}@Y-m-d`.
 *
 * The `@` sign links a date with a format and the format is made of formatting characters
 * as seen in [PHP's date function](https://www.php.net/manual/en/function.date.php).
 * The format is removed from the string after processing.
 *
 * Only a subset of these options is supported at the moment:
 *
 * | Character | Description                                     |
 * |:----------|:------------------------------------------------|
 * | Y         | Year. Four digits                               |
 * | y         | Year. Two digits                                |
 * | m         | Month. Two digits with leading zeros. e.g. "01" |
 * | n         | Month. No leading zeros. e.g. "1"               |
 * | d         | Day. Two digits; leading zeros. e.g. "01"       |
 * | j         | Day. No leading zeros. e.g. "1"                 |
 *
 * Anything that isn't a formatting character is rendered as is.
 *
 * When an interpolated value isn't a date, the value is rendered as is and the date format is removed.
 *
 * ```javascript
 * time`Last login on ${0/0}@Y-m-d`;
 * //=> Last login on NaN
 * ```
 */
module.exports =
  tag_function
    ( (l, x, r) =>
        [ l
        , !is_date(x) || !get_format(r)
            ? x
            : format(get_format(r), x)
        , clear_format(r)
        ]
    );
