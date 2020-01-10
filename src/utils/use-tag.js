const {compose, join} = require('./fp');
const intersperse = require('./intersperse');
const transform = require('./transform');

const KEY = Symbol();

const is_opts =
  x =>
        x !== null
    && !Array.isArray(x)
    && typeof x === 'object';

const tag_function = fn => {
  const tag_fn =
    (strs, ...vals) =>
      is_opts(strs)
        ? tag_function(fn(strs))
        : compose(join(''), transform(fn), intersperse)
            (strs, vals);

  tag_fn[KEY] = transform(fn);
  return tag_fn;
};

tag_function.unwrap = fn => fn[KEY] || fn;

module.exports = tag_function;
