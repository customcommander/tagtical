const cont = require('./cont');

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
