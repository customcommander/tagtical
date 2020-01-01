const test = require('tape');
const { upper } = require('../');

test('upper: uppercase all values', t => {
  t.plan(1);

  const foo = 'foo';
  const bar = 'bar';

  t.is
    ( upper`foo=${foo}, bar=${bar}`
    , "foo=FOO, bar=BAR"
    );
});
