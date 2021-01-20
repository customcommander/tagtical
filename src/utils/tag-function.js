/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @param {TagFunction} fn
 * @param {!TagOptions=} opts
 * @return {TagFunction|TagConfigFunction}
 */
module.exports =
  (fn, opts = {}) =>  (...args) =>
    { const is_config_call = typeof args[0] === 'object'; // foo`…` vs foo({…})`…`
      return (is_config_call
                ? (l, x, r) => fn(l, x, r, {...opts, ...args[0]})
                : fn(...args, opts));
    };
