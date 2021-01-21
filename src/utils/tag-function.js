/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {cont, init} = require('./fp');

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
const intersperse =
  (xs, ys) =>
    init(xs.flatMap((x, i) => [x, ys[i]]));

/**
 * Given `fn` a function that takes three parameters and returns
 * a tuple 'x' of three elements, apply `fn` to tuples 'y' of three elements.
 * The first tuple 'y' is made of the first three elements of `xs`.
 * The next tuple 'y' (and all others) takes its first element from the
 * last element of tuple 'x' returned by `fn` when applied to the previous tuple 'y'.
 * The last two elements of tuple 'y' are taken from the next two consecutive elements of `xs`.
 *
 * Example:
 *
 * ```javascript
 * const fn = (a, b, c) => [a+1, b+2, c+3];
 * const xs = [10, 20, 30, 40, 50, 60];
 * transformer(fn, xs);
 * //   [10, 20, 30, 40, 50, 60, 70]
 * //    ^^  ^^  ^^
 * //   [11, 22, 33, 40, 50, 60, 70]
 * //            ^^  ^^  ^^
 * //   [11, 22, 34, 42, 53, 60, 70]
 * //                    ^^  ^^  ^^
 * //=> [11, 22, 34, 43, 54, 62, 73]
 * ```
 *
 * @param {function()} fn
 * @param {Array} xs
 * @param {number} [i=1]
 * @return {Array}
 */
const transformer =
  (fn, xs, i=1) =>
      i >= xs.length
        ? xs
        : cont(fn(...xs.slice(i-1, i+2)))
            ( ret =>
                transformer
                  ( fn
                  , xs.slice(0, i-1).concat(ret, xs.slice(i+2))
                  , i+2
                  ));

const read_user_config =
  fn => (strings_or_config, ...values) =>
    Array.isArray(strings_or_config)
      ? fn({}, strings_or_config, values)
      : (strings, ...values) => fn(strings_or_config, strings, values);

/**
 * @param {TagFunction} fn
 * @param {!TagOptions=} opts
 * @return {TagFunction|TagConfigFunction}
 */
module.exports =
  (fn, default_config = {}, postprocess = xs => xs.join('')) =>
    read_user_config((user_config, strings, values) =>
      { const final_config = {...default_config, ...user_config};
        const parts = intersperse(strings, values);
        const preprocess = (l, x, r) => fn(l, x, r, final_config);
        return postprocess(transformer(preprocess, parts));
      });