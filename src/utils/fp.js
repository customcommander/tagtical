/**
 * @license MIT
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const compose =
  (...fns) =>
    (...args) =>
      init(fns).reduceRight
        ( (ret, fn ) => fn(ret)
        , last(fns)(...args)
        );

/**
 * @param {?} x
 * @return {function(function): ?}
 */
const cont =
  x =>
    fn =>
      fn(x);

/**
 * @param {?} x
 * @return {function(): ?}
 */
const constant =
  x =>
    () =>
      x;

/**
 * Takes an `a` and returns a function that takes a `b`
 * and returns `b` if truthy otherwise `a`.
 *
 * Example:
 *
 * ```javascript
 * ['', 'a', ''].map(fallback('42'))
 * //=> ['42', 'a', '42']
 * ```
 *
 * @param {?} a
 * @return {function(?): ?}
 */
const fallback =
  a =>
    b =>
      b || a;

/**
 * @param {Array} xs
 * @return {?}
 */
const head =
  xs =>
    xs[0];

/**
 * Takes a function `fn` and returns a function that takes a list `xs`
 * and returns a new list where each element of the list has been
 * applied to `fn`.
 *
 * Example:
 * 
 * ```javascript
 * const set_default_answer = map(fallback('42'));
 * set_default_answer(['', 'a', ''])
 * //=> ['42', 'a', '42']
 * ```
 *
 * @param {function} fn
 * @return {function(Array): Array}
 */
const map =
  fn =>
    xs =>
      xs.map(fn);

/**
 * @param {RegExp} re
 * @return {function(string): string}
 */
const match =
  re =>
    str =>
      cont(str.match(re))
        ( compose
            ( head
            , fallback([])
            )
        );

/**
 * Split a string `s` according to given separator `x`.
 * @param {string|RegExp} x A separator
 * @return {function(string): string}
 */
const split =
  x =>
    s =>
      s.split(x);

/**
 * Return given list `xs` minus its head.
 * @param {Array|string} xs A list
 * @return {Array|string} The same list without its head.
 */
const tail =
  xs =>
    xs.slice(1);

/**
 * Return given list `xs` without its last element.
 * @param {Array|string} xs
 * @return {Array|string}
 */
const init =
  xs =>
    xs.slice(0, -1);

/**
 * Return the last element of given list `xs`.
 * @param {Array|string} xs
 * @return {?}
 */
const last =
  xs =>
    xs[xs.length-1];

/**
 * Trim given string `x`.
 * @param {string} x
 * @return {string}
 */
const trim =
  x =>
    x.trim();

/**
 * Joins given list `xs` with given string `s`.
 * @param {string} s String to use to join given list
 * @return {function(Array): string}
 */
const join =
  s =>
    xs =>
      xs.join(s);

module.exports =
  { compose
  , constant
  , cont
  , fallback
  , head
  , init
  , join
  , last
  , map
  , match
  , split
  , tail
  , trim
  };
