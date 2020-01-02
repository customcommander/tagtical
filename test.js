const test = require('tape');
const tag = require('./dist');
const
  { hide
  , trim
  , upper
  } = require('./dist');

test('tag: can compose other tags', t => {
  t.plan(1);

  const foo = '  foo  ';
  const bar = '  bar  ';

  t.is
    ( tag(upper, trim)`foo=${foo}, bar=${bar}`
    , "foo=FOO, bar=BAR"
    );
});

test('tag: can compose user-defined tags', t => {
  t.plan(1);

  const foo = '  foo  ';
  const bar = '  bar  ';

  const myTag =
    tag.of(
      (l, x, r) =>
        [ '|'
        , x
        , '|'
        ]);

  t.is
    ( tag(upper, myTag, trim)`foo=${foo}, bar=${bar}`
    , "|FOO|BAR|"
    );
});

test('hide: hides all values', t => {
  t.plan(1);

  const foo = 'foo';
  const bar = 'bar';

  t.is
    ( hide`foo=${foo}, bar=${bar}`
    , "foo=xxx, bar=xxx"
    );
});

test('trim: trim all values', t => {
  t.plan(1);

  const foo = ' f oo ';
  const bar = ' b ar ';

  t.is
    ( trim`foo=${foo} , bar=${bar} `
    , "foo=f oo , bar=b ar "
    );
});

test('upper: uppercase all values', t => {
  t.plan(1);

  const foo = 'foo';
  const bar = 'bar';

  t.is
    ( upper`foo=${foo}, bar=${bar}`
    , "foo=FOO, bar=BAR"
    );
});
