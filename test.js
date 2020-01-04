const test = require('tape');
const tag = require('./dist');
const
  { defaults
  , hide
  , lower
  , pluralize
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

test('defaults: replace empty values', t => {
  t.plan(2);

  let foo;
  let bar;

  foo = '';

  t.is
    ( defaults`foo=${foo}/aaa, bar=${bar}/bbb`
    , 'foo=aaa, bar=bbb'
    );

  foo = false,
  bar = 0;

  t.is
    ( defaults`foo=${foo}/aaa, bar=${bar}/bbb`
    , 'foo=false, bar=bbb'
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

test('pluralize: choose between singular or plural forms', t => {
  t.plan(4);

  let num;

  num = 10;

  t.is
    ( pluralize`There is/are ${num} fox/foxes`
    , 'There are 10 foxes'
    );

  t.is
    ( pluralize`There is/are ${num} fox(es)`
    , 'There are 10 foxes'
    );

  num = 1;

  t.is
    ( pluralize`There is/are ${num} fox/foxes`
    , 'There is 1 fox'
    );

  t.is
    ( pluralize`There is/are ${num} fox(es)`
    , 'There is 1 fox'
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

test('lower: lowercase all values', t => {
  t.plan(1);

  const food =
    [ 'BREAD'
    , 'BEANS'
    , 'COVFEFE'
    ];

  t.is
    ( lower`I had ${food[0]}, ${food[1]} and ${food[2]} for breakfast`
    , 'I had bread, beans and covfefe for breakfast'
    );
});
