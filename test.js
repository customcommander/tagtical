const test = require('tape');
const tag = require('./dist');
const
  { defaults
  , hide
  , list
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
  t.plan(5);

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

  t.is
    ( hide({fill: true})`Your name is ${'John'} and you live in ${'Manchester'}`
    , 'Your name is xxxx and you live in xxxxxxxxxx'
    , 'fill the space that an interpolated would have taken otherwise'
    );

  const today = new Date();
  const today_str = String(today);

  t.is
    ( hide({fill: true})`Today is ${today}`
    , `Today is ${'x'.repeat(today_str.length)}`
    , 'convert non-string values to strings'
    );

  t.is
    ( hide({mask: [1], fill: [1]})`Hi ${'John'}`
    , 'Hi xxx'
    , 'use default options when user-defined options are invalid'
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
  t.plan(5);

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

  t.is
    ( time`Last login on ${new Date('2020-02-16')}@l`
    , 'Last login on Sunday'
    , 'Support formatting character `l` (day of the week)'
    )

  t.is
    ( time`Last login on ${new Date('2020-02-16')}@D`
    , 'Last login on Sun'
    , 'Support formatting character `D` (day of the week, short)'
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

test('list: returns a textual representation of a list', t => {
  t.plan(6);

  t.is
    ( list`${[]}`
    , ''
    , 'An empty array returns an empty string'
    );

  t.is
    ( list`${['foo']}`
    , 'foo'
    , 'A single-item array simply returns that item'
    );

  t.is
    ( list`${['foo', 'bar']}`
    , 'foo and bar'
    , 'A pair is joined with the default `delimlast` option'
    );

  t.is
    ( list`${['foo', 'bar', 'baz']}`
    , 'foo, bar and baz'
    , 'Items are joined with the default `delim` and `delimlast` options'
    );

  t.is
    ( list({delim: 4, delimlast: 5})`${['foo', 'bar', 'baz']}`
    , 'foo, bar and baz'
    , '`delim` and `delimlast` must be string'
    );

  t.is
    ( list({delim: '; ', delimlast: ' & '})`${['foo', 'bar', 'baz']}`
    , 'foo; bar & baz'
    , '`delim` and `delimlast` can be changed'
    );
});
