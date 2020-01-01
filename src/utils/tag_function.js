const compose = require('./compose');
const join = require('./join');
const intersperse = require('./intersperse');
const transform = require('./transform');

const KEY = Symbol();

const tag_function = fn => {
  const tag_fn = (strs, ...vals) =>
    compose(join(''), transform(fn), intersperse)
      (strs, vals);

  tag_fn[KEY] = transform(fn);
  return tag_fn;
};

tag_function.unwrap = fn => fn[KEY] || fn;

module.exports = tag_function;
