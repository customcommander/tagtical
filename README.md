![](https://github.com/customcommander/tagtical/workflows/release/badge.svg?branch=master)
![](https://github.com/customcommander/tagtical/workflows/continuous%20integration/badge.svg?branch=master)


# tagtical

```
npm i @customcommander/tagtical
```

[![npm version](https://badge.fury.io/js/%40customcommander%2Ftagtical.svg)](https://www.npmjs.com/package/@customcommander/tagtical)

## Why?

Say you're given a number _n_ and depending on its value you return either _"There is 1 fox"_ or _"There are 10 foxes"_.

Here's a typical implementation:

```javascript
`There ${n === 1 ? 'is' : 'are'} ${n} ${n === 1 ? 'fox' : 'foxes'}`
```

Simple enough yet already difficult to parse and the intent is obfuscated.

Can we do better? How about this?

```javascript
import {pluralize} from '@customcommander/tagtical';

let n = 1;
pluralize`There is/are ${n} fox(es)`;
//=> "There is 1 fox"

n = 10;
pluralize`There is/are ${n} fox(es)`;
//=> "There are 10 foxes"
```

If you find yourself nodding along, then _maybe_ `tagtical` is for you.

## Design philosophy

If an interpolated value is not of the expected type, it is returned as is. This means that you can always apply a tagged template without worrying about types:

```javascript
import {lower} from '@customcommander/tagtical';

const num = 1;
const food = 'BURRITO';

lower`I only had ${num} ${food}!`;
//=> "I only had 1 burrito!"

```

## Documentation

* <a name="#defaults">defaults</a> - _Replace an empty value with a default value_
* <a name="#hide">hide</a> - _Hides interpolated values_
* <a name="#lower">lower</a> - _Lowercase interpolated values_
* <a name="#pluralize">pluralize</a> - _Choose between singular or plural forms._
* <a name="#trim">trim</a> - _Trim interpolated values_
* <a name="#upper">upper</a> - _Uppercase interpolated values_

### <a name="defaults"></a>defaults


The default value for an empty interpolated value is defined in the string template itself.<br>
It is separated by a single `/` character. e.g. `${name}/guest`.

A value is considered empty if it is:

- `null`
- `undefined`
- An empty string `''`
- An empty array `[]`
- An empty object `{}`

When the default value is used, the separator (i.e. the `/` character)
is removed from the string.

When the interpolated value is not empty, the default value (and the separator)
is removed from the string.

```javascript
import {defaults} from '@customcommander/tagtical';

var username = '';
var num;
defaults`Hi ${username}/guest, you have ${num}/no new emails`;
//=> "Hi guest, you have no new emails"

var username = 'John';
var num = 10;
defaults`Hi ${username}/guest, you have ${num}/no new emails`;
//=> "Hi John, you have 10 new emails"
```
### <a name="hide"></a>hide


The `hide` tag replaces all interpolated values with 'xxx':

```javascript
import {hide} from '@customcommander/tagtical';

hide`Hi ${name}, your credit card number is ${cc_num}`
//=> "Hi xxx, your credit card number is xxx"
```
### <a name="lower"></a>lower


Lowercase all interpolated values if they are strings.
Non-string values are left as is.

```javascript
import {lower} from '@customcommander/tagtical';

const food =
 [ 'BREAD'
 , 'BEANS'
 , 'COVFEFE'
 ];

lower`I had ${food[0]}, ${food[1]} and ${food[2]} for breakfast`
//=> "I had bread, beans and covfefe for breakfast"
```
### <a name="pluralize"></a>pluralize


The `pluralize` tag allows you to build the "template" of a sentence without having
to deal with the logic of choosing between singular or plural forms.

e.g. given `"There is/are ${n} fox(es) and ${m} wolf/wolves"`

The `pluralize` tag scans the string from left to right and picks forms depending
on the value of the nearest interpolated value.

Forms are separated by a `/` character with the singular form first
and the plural form last. e.g. `is/are`.

When both forms share the same root e.g. `fox/foxes`
an abbreviated notation can also be used: `fox(es)`.

```javascript
import {pluralize} from '@customcommander/tagtical';

let num;

num = 10;
pluralize`There is/are ${num} fox(es)`
//=> "There are 10 foxes"

num = 0;
pluralize`There is/are ${num} fox(es)`
//=> "There are 0 foxes"

num = 1;
pluralize`There is/are ${num} fox(es)`
//=> "There is 1 fox"

// or

num = 1;
pluralize`There is/are ${num} fox/foxes`
//=> "There is 1 fox"
```

⚠️ If an interpolated value isn't an integer >= 0
the `pluralize` tag __won't__ perform any replacement on the adjacent text!

📢 A `0` will pick the __plural__ form(s).
### <a name="trim"></a>trim


Trim all interpolated values if they are strings.
Non-string values are left as is.

```javascript
import {trim} from '@customcommander/tagtical';

const name = '   John    ';
trim`My name is ${name}!`;
//=> "My name is John!"
```
### <a name="upper"></a>upper


Uppercase all interpolated values if they are strings.
Non-string values are left as is.

```javascript
import {upper} from '@customcommander/tagtical';

const name = 'john';
const age = 40;
upper`My name is ${name} and I am ${age} years old`
//=> "My name is JOHN and I am 40 years old"
```
