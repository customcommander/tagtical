/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {cont} = require('./fp');

const transformer = (fn, xs, i=1) =>
  i >= xs.length
    ? xs
    : cont(fn(...xs.slice(i-1, i+2)))
        ( ret =>
            transformer
              ( fn
              , xs.slice(0, i-1).concat(ret, xs.slice(i+2))
              , i+2
              )
        );

module.exports = fn => xs => transformer(fn, xs);
