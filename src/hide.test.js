const test = require('tape');
const sut = require('./hide');

test('hide: hides all values', t => {
  t.plan(1);

  const foo = 'foo';
  const bar = 'bar';

  t.is( sut`foo=${foo}, bar=${bar}`, "foo=xxx, bar=xxx");
});
