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

Perhaps this reads better?

```javascript
import {pluralize} from '@customcommander/tagtical';

pluralize`There is/are ${1} fox(es)`;
//=> "There is 1 fox"

pluralize`There is/are ${10} fox(es)`;
//=> "There are 10 foxes"
```

If you find yourself nodding along, then _maybe_ `tagtical` is for you.

## Design philosophy

If an interpolated value is not of the expected type, it is returned as is. This means that you can always apply a tagged template without worrying about types:

```javascript
import {lower} from '@customcommander/tagtical';

lower`I only had ${1} ${'BURRITO'}!`;
//=> "I only had 1 burrito!"

```

## Documentation

* [defaults](#defaults) - _Replace an empty value with a default value_
* [hide](#hide) - _Hides interpolated values_
* [list](#list) - _Textual representation of an array_
* [lower](#lower) - _Lowercase interpolated values_
* [pluralize](#pluralize) - _Choose between singular or plural forms._
* [time](#time) - _Format dates within a string._
* [trim](#trim) - _Trim interpolated values_
* [upper](#upper) - _Uppercase interpolated values_

### defaults


The default value for an empty interpolated value is defined in the string template itself.<br>
It is separated by a single `/` character. e.g. `${name}/guest`.

A value is considered empty if it is:

- `null`
- `undefined`
- An empty string `''`
- An empty array `[]`
- An empty object `{}`
- A number that is either `0` or `NaN`

When the default value is used, the separator (i.e. the `/` character)
is removed from the string.

When the interpolated value is not empty, the default value (and the separator)
is removed from the string.

```javascript
import {defaults} from '@customcommander/tagtical';

defaults`Hi ${''}/guest, you have ${undefined}/no new emails`;
//=> "Hi guest, you have no new emails"

defaults`Hi ${'John'}/guest, you have ${10}/no new emails`;
//=> "Hi John, you have 10 new emails"
```



_(The `defaults` tag does not have any options.)_

### hide


The `hide` tag replaces all interpolated values with a default mask `'xxx'`:

```javascript
import {hide} from '@customcommander/tagtical';

hide`Hi ${'John'}, your credit card number is ${'1234-2345-3456-4567'}`
//=> "Hi xxx, your credit card number is xxx"
```

Options:

* __mask__ (default `'xxx'`)

  The string to use to replace an interpolated value.

   ```javascript
   hide({mask: '???'})`Your name is ${name} and you are ${age} old`;
   //=> "Your name is ??? and you are ??? old"
   ```
* __fill__ (default `false`)

  When set to `true`, the mask will cover the entire space that the interpolated
   value would have taken otherwise.

   Please note that if the interpolated value isn't a string, it will be
   converted into one via a call to `String()`.

   ```javascript
   hide`Your name is ${'John'} and you live in ${'Manchester'}`;
   //=> "Your name is xxx and you live in xxx"

   hide({fill: true})`Your name is ${'John'} and you live in ${'Manchester'}`;
   //=> "Your name is xxxx and you live in xxxxxxxxxx"
   ```


### list


All items in the list are joined with `', '` expected for the last two items
which are joined with `' and '`.

```javascript
import {list} from '@customcommander/tagtical';

const arr = ['Huey', 'Dewey', 'Louie'];
list`Hey ${arr}!`;
//=> "Hey Huey, Dewey and Louie!"
```

Options:

* __delim__ (default `', '`)

  The string to use to join all items expect the last.

   ```javascript
   const arr = ['Huey', 'Dewey', 'Louie'];
   list({delim: '; '})`Hey ${arr}!`;
   //=> "Hey Huey; Dewey and Louie!"
   ```
* __delimlast__ (default `' and '`)

  The string to use to join the last two items.

   ```javascript
   const arr = ['Huey', 'Dewey', 'Louie'];
   list({delimlast: ' & '})`Hey ${arr}!`;
   //=> "Hey Huey, Dewey & Louie!"
   ```


### lower


Lowercase all interpolated values if they are strings.
Non-string values are left as is.

```javascript
import {lower} from '@customcommander/tagtical';

lower`I had ${'BREAD'}, ${'BEANS'} and ${'COVFEFE'} for breakfast`
//=> "I had bread, beans and covfefe for breakfast"
```



_(The `lower` tag does not have any options.)_

### pluralize


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

pluralize`There is/are ${10} fox(es)`
//=> "There are 10 foxes"

pluralize`There is/are ${0} fox(es)`
//=> "There are 0 foxes"

pluralize`There is/are ${1} fox(es)`
//=> "There is 1 fox"

pluralize`There is/are ${1} fox/foxes`
//=> "There is 1 fox"
```

⚠️ If an interpolated value isn't an integer >= 0
the `pluralize` tag __won't__ perform any replacement on the adjacent text!

📢 A `0` will pick the __plural__ form(s).



_(The `pluralize` tag does not have any options.)_

### time


The `time` tag formats all interpolated dates according to a given format.

```javascript
import {time} from '@customcommander/tagtical';

time`Last login on ${new Date()}@Y-m-d`;
//=> "Last login on 2020-01-09"
```

The format is attached to the date as follow `${date}@Y-m-d`.

The `@` sign links a date with a format and the format is made of formatting characters
as seen in [PHP's date function](https://www.php.net/manual/en/function.date.php).
The format is removed from the string after processing.

Only a subset of these options is supported at the moment and English is the only supported locale.

| Character | Description                                     |
|:----------|:------------------------------------------------|
| Y         | Year. Four digits                               |
| y         | Year. Two digits                                |
| m         | Month. Two digits with leading zeros. e.g. "01" |
| n         | Month. No leading zeros. e.g. "1"               |
| d         | Day. Two digits; leading zeros. e.g. "01"       |
| j         | Day. No leading zeros. e.g. "1"                 |
| l         | Day of the week e.g. "Monday"                   |
| D         | Day of the week, short e.g. "Mon"               |

Anything that isn't a formatting character is rendered as is.

When an interpolated value isn't a date, the value is rendered as is and the date format is removed.

```javascript
time`Last login on ${0/0}@Y-m-d`;
//=> Last login on NaN
```



_(The `time` tag does not have any options.)_

### trim


Trim all interpolated values if they are strings.
Non-string values are left as is.

```javascript
import {trim} from '@customcommander/tagtical';

trim`My name is ${'   John    '}!`;
//=> "My name is John!"
```



_(The `trim` tag does not have any options.)_

### upper


Uppercase all interpolated values if they are strings.
Non-string values are left as is.

```javascript
import {upper} from '@customcommander/tagtical';

upper`My name is ${'john'} and I am ${40} years old`
//=> "My name is JOHN and I am 40 years old"
```



_(The `upper` tag does not have any options.)_

