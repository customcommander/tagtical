/**
 * @license MIT
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const data = require('./l10n-data.json');

/**
 * Day of the week (e.g. 'Monday')
 * @param {lang} l
 * @param {weekday} n
 * @return {string}
 */
const day = (l, n) => data.days[n][l];

/**
 * Day of the week abbreviated (e.g. 'Mon')
 * @param {lang} l
 * @param {weekday} n
 * @return {string}
 */
const day_short = (l, n) => data.days_short[n][l];

module.exports =
  { day
  , day_short
  };
