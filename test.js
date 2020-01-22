const test = require('tape');
const tag = require('./dist');
const
  { defaults
  , hide
  , lower
  , pluralize
  , time
  , trim
  , upper
  } = require('./dist');

test('tag: can compose other tags', t => {
  t.plan(1);

  t.is
    ( tag(upper, trim)`foo=${'  foo  '}, bar=${'  bar  '}`
    , "foo=FOO, bar=BAR"
    );
});

test('defaults: replace empty values', t => {
  t.plan(2);

  t.is
    ( defaults`foo=${''}/aaa, bar=${undefined}/bbb`
    , 'foo=aaa, bar=bbb'
    , 'empty string and undefined are empty values'
    );

  t.is
    ( defaults`foo=${false}/aaa, bar=${0}/bbb`
    , 'foo=false, bar=bbb'
    , 'false is not an empty value but 0 is'
    );
});

test('tag: can compose user-defined tags', t => {
  t.plan(1);

  const myTag =
    tag.of(
      (l, x, r) =>
        [ '|'
        , x
        , '|'
        ]);

  t.is
    ( tag(upper, myTag, trim)`foo=${'  foo  '}, bar=${'  bar  '}`
    , "|FOO|BAR|"
    );
});

test('user-defined tags can receive options', t => {
  t.plan(1);

  const myTag =
    tag.of
      ( (l, x, r, {foo}) =>
          [ l
          , foo
          , r
          ]
      , { foo: 'fooooooo'
        }
      );

  t.is
    ( myTag({foo: 'baaar'})`Hello ${'world'}!`
    , 'Hello baaar!'
    );
});

test('hide: hides all values', t => {
  t.plan(2);

  t.is
    ( hide`foo=${'foo'}, bar=${'bar'}`
    , "foo=xxx, bar=xxx"
    , 'replace values with default mask'
    );

  t.is
    ( hide({mask: '🌯'})`foo=${'foo'}, bar=${'bar'}`
    , "foo=🌯, bar=🌯"
    , 'replace values with user-defined mask'
    );
});

test('pluralize: choose between singular or plural forms', t => {
  t.plan(4);

  t.is
    ( pluralize`There is/are ${10} fox/foxes`
    , 'There are 10 foxes'
    , 'pick the plural forms'
    );

  t.is
    ( pluralize`There is/are ${10} fox(es)`
    , 'There are 10 foxes'
    , 'pick the simplified plural forms'
    );

  t.is
    ( pluralize`There is/are ${1} fox/foxes`
    , 'There is 1 fox'
    , 'pick the singular forms'
    );

  t.is
    ( pluralize`There is/are ${1} fox(es)`
    , 'There is 1 fox'
    , 'pick the simplified singular forms'
    );
});

test('time: format dates within a string', t => {
  t.plan(3);

  t.is
    ( time`Last login on ${new Date('2020-01-09')}@Y-m-d`
    , "Last login on 2020-01-09"
    , 'support formatting characters Ymd'
    );

  t.is
    ( time`Last login on ${new Date('2020-01-09')}@j/n/y`
    , "Last login on 9/1/20"
    , 'suport formatting characters jny'
    )

  t.is
    ( time`Last login on ${0/0}@j/n/y`
    , "Last login on NaN"
    , 'remove date format when date is not valid'
    )
});

test('trim: trim all values', t => {
  t.plan(1);

  t.is
    ( trim`foo=${' f oo '} , bar=${' b ar '} `
    , "foo=f oo , bar=b ar "
    );
});

test('upper: uppercase all values', t => {
  t.plan(1);

  t.is
    ( upper`foo=${'foo'}, bar=${'bar'}`
    , "foo=FOO, bar=BAR"
    );
});

test('lower: lowercase all values', t => {
  t.plan(1);

  t.is
    ( lower`I had ${'BREAD'}, ${'BEANS'} and ${'COVFEFE'} for breakfast`
    , 'I had bread, beans and covfefe for breakfast'
    );
});
