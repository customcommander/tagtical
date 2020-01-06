const tag_function = require('./utils/tag-function');
const use_tag = require('./utils/use-tag');
const join = require('./utils/join');
const intersperse = require('./utils/intersperse');
const compose = require('./utils/compose');
const defaults = require('./defaults');
const hide = require('./hide');
const lower = require('./lower');
const pluralize = require('./pluralize');
const trim = require('./trim');
const upper = require('./upper');

const tag = (...fns) =>
  (strs, ...vals) =>
    compose(join(''), ...fns.map(use_tag.unwrap))
      (intersperse(strs, vals));

tag.defaults = use_tag(defaults);
tag.hide = use_tag(hide);
tag.lower = use_tag(lower);
tag.pluralize = use_tag(pluralize);
tag.trim = use_tag(trim);
tag.upper = use_tag(upper);
tag.of = compose(use_tag, tag_function);

module.exports = tag;