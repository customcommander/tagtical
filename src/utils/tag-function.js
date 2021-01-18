/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @param {TagFunction} fn
 * @param {TagOptions} opts
 * @return {TagFunction|TagConfigFunction}
 */
module.exports =
  (fn, opts = {}) =>
    (...args) =>
      typeof args[0] !== 'object'
        ? fn(...args, opts)
        : (l, x, r) =>
            fn(l, x, r, {...opts, ...args[0]});
