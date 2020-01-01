const test = require('tape');
const { trim } = require('../');

test('trim: trim all values', t => {
  t.plan(1);

  const foo = ' f oo ';
  const bar = ' b ar ';

  t.is
    ( trim`foo=${foo} , bar=${bar} `
    , "foo=f oo , bar=b ar "
    );
});
