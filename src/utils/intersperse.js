/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {init} = require('./fp');

/**
 * Put `b` inside `a` at regular intervals.
 *
 * @example
 * intersperse([1, 3, 5], [2, 4])
 * //=> [1, 2, 3, 4, 5]
 *
 * @param {Array<?>} a
 * @param {Array<?>} b
 * @return {Array<?>}
 */
const intersperse = (a, b) =>
  init
    ( a.flatMap
        ( (x, i) =>
            [ x
            , b[i]
            ]
        )
    );

module.exports = intersperse;
