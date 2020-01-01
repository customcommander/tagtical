const tag_function = require('./src/utils/tag_function');
const join = require('./src/utils/join');
const intersperse = require('./src/utils/intersperse');
const compose = require('./src/utils/compose');
const hide = require('./src/hide');
const trim = require('./src/trim');
const upper = require('./src/upper');

const tag = (...fns) =>
  (strs, ...vals) =>
    compose(join(''), ...fns.map(tag_function.unwrap))
      (intersperse(strs, vals));

tag.hide = tag_function(hide);
tag.trim = tag_function(trim);
tag.upper = tag_function(upper);
tag.of = tag_function;

module.exports = tag;