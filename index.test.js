const test = require('tape');
const tag = require('./');
const {trim, upper} = tag;

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
