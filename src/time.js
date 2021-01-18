/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const tag_function = require('./utils/tag-function');

const
  { day
  , day_short
  } = require('./utils/l10n');

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

// Date#getDay consider that Sunday is the start of the week.
// Maps to indexes where Monday is the start of the week.
const weekday_map =
  { 0: 6
  , 1: 0
  , 2: 1
  , 3: 2
  , 4: 3
  , 5: 4
  , 6: 5
  };

/** @enum {string} */
const formatOptions =
  { DAY_NUM_LEADING_ZEROS: 'd'
  , DAY_NUM: 'j'
  , DAY_TEXT_LONG: 'l'
  , DAY_TEXT_SHORT: 'D'
  , MONTH_NUM_LEADING_ZEROS: 'm'
  , MONTH_NUM: 'n'
  , YEAR_NUM_LONG: 'Y'
  , YEAR_NUM: 'y'
  };

/**
 * @type {Object<formatOptions, function(lang, Date): string>}
 */
const formatFunctions =
  { [formatOptions.DAY_NUM_LEADING_ZEROS]:
      (l, d) => String(d.getDate()).padStart(2, '0')

  , [formatOptions.DAY_NUM]:
      (l, d) => String(d.getDate())

  , [formatOptions.DAY_TEXT_LONG]:
      (l, d) => day(l, weekday_map[d.getDay()])

  , [formatOptions.DAY_TEXT_SHORT]:
      (l, d) => day_short(l, weekday_map[d.getDay()])

  , [formatOptions.MONTH_NUM_LEADING_ZEROS]:
      (l, d) => String(d.getMonth() + 1).padStart(2, '0')

  , [formatOptions.MONTH_NUM]:
      (l, d) => String(d.getMonth() + 1)

  , [formatOptions.YEAR_NUM_LONG]:
      (l, d) => String(d.getFullYear())

  , [formatOptions.YEAR_NUM]:
      (l, d) => String(d.getFullYear()).slice(-2)
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

/**
 * @param {lang} l
 * @param {Date} d
 * @return {function(string): string}
 */
const formatter =
  (l, d) =>
    f =>
      (formatFunctions[f] || constant(f))
        (l, d);

/**
 * @param {string} f formatting characters
 * @param {lang} l language code
 * @param {Date} d
 */
const format =
  (f, l, d) =>
    compose
      ( join('')
      , map(formatter(l, d))
      , split(/([^YymndjlD]+)/)
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
 * Only a subset of these options is supported at the moment and English is the only supported locale.
 *
 * | Character | Description                                     |
 * |:----------|:------------------------------------------------|
 * | Y         | Year. Four digits                               |
 * | y         | Year. Two digits                                |
 * | m         | Month. Two digits with leading zeros. e.g. "01" |
 * | n         | Month. No leading zeros. e.g. "1"               |
 * | d         | Day. Two digits; leading zeros. e.g. "01"       |
 * | j         | Day. No leading zeros. e.g. "1"                 |
 * | l         | Day of the week e.g. "Monday"                   |
 * | D         | Day of the week, short e.g. "Mon"               |
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
            : format(get_format(r), 'en', x)
        , clear_format(r)
        ]
    );
