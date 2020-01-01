const init = require('./init');
const last = require('./last');

module.exports = (...fns) =>
  (...args) =>
    init(fns).reduceRight
      ( (ret, fn) => fn(ret)
      , last(fns)(...args)
      );
