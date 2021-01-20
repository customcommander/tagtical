/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {init} = require('./fp');

/**
 * Put `ys` inside `xs` at regular intervals.
 *
 * @example
 * intersperse([1, 3, 5], [2, 4])
 * //=> [1, 2, 3, 4, 5]
 *
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 */
module.exports = (xs, ys) => init(xs.flatMap((x, i) => [x, ys[i]]));
