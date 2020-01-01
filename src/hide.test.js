const test = require('tape');
const { hide } = require('../');

test('hide: hides all values', t => {
  t.plan(1);

  const foo = 'foo';
  const bar = 'bar';

  t.is
    ( hide`foo=${foo}, bar=${bar}`
    , "foo=xxx, bar=xxx"
    );
});
