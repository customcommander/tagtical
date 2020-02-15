/**
 * Tag options.
 * @typedef {Object} TagOptions
 */

/**
 * Creates a tag function bound to a specific set of options.
 * @typedef {function(TagOptions): TagFunction} TagConfigFunction
 */

/**
 * Tag function.
 * @typedef {function(string, ?, string, TagOptions): Array} TagFunction
 */

/**
 * Position of the day in the week.
 * 0..6 (Mon..Sun)
 * @enum {number}
 */
const weekday =
  { 0: 0
  , 1: 1
  , 2: 2
  , 3: 3
  , 4: 4
  , 5: 5
  , 6: 6
  };

/**
 * Language code (e.g. 'en')
 * @enum {string}
 */
const lang =
  { en: 'en'
  };
