const tag_function = require('./utils/tag_function');
const join = require('./utils/join');
const intersperse = require('./utils/intersperse');
const compose = require('./utils/compose');
const hide = require('./hide');
const pluralize = require('./pluralize');
const trim = require('./trim');
const upper = require('./upper');

const tag = (...fns) =>
  (strs, ...vals) =>
    compose(join(''), ...fns.map(tag_function.unwrap))
      (intersperse(strs, vals));

tag.hide = tag_function(hide);
tag.pluralize = tag_function(pluralize);
tag.trim = tag_function(trim);
tag.upper = tag_function(upper);
tag.of = tag_function;

module.exports = tag;