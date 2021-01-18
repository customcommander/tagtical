/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const tag_function = require('./utils/tag-function');
const use_tag = require('./utils/use-tag');
const intersperse = require('./utils/intersperse');
const defaults = require('./defaults');
const hide = require('./hide');
const list = require('./list');
const lower = require('./lower');
const pluralize = require('./pluralize');
const time = require('./time');
const trim = require('./trim');
const upper = require('./upper');

const
  { compose
  , join
  } = require('./utils/fp');

const tag = (...fns) =>
  (strs, ...vals) =>
    compose(join(''), ...fns.map(use_tag.unwrap))
      (intersperse(strs, vals));

tag.defaults = use_tag(defaults);
tag.list = use_tag(list);
tag.hide = use_tag(hide);
tag.lower = use_tag(lower);
tag.pluralize = use_tag(pluralize);
tag.time = use_tag(time);
tag.trim = use_tag(trim);
tag.upper = use_tag(upper);
tag.of = compose(use_tag, tag_function);

module.exports = tag;