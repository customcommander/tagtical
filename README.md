## API

* <a name="hide">hide</a> - _Hides interpolated values_
* <a name="pluralize">pluralize</a> - _Choose between singular or plural forms._
* <a name="trim">trim</a> - _Trim interpolated values_
* <a name="upper">upper</a> - _Uppercase interpolated values_

### <a name="#hide"></a>hide


The `hide` tag replaces all interpolated values with 'xxx':

```javascript
hide`Hi ${name}, you credit card number is ${cc_num}`
//=> "Hi xxx, you credit card number is xxx"
```
### <a name="#pluralize"></a>pluralize


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
### <a name="#trim"></a>trim


Trim all interpolated values if they are strings.
Non-string values are left as is.

```javascript
const name = '   John    ';
trim`My name is ${name}!`;
//=> "My name is John!"
```
### <a name="#upper"></a>upper


Uppercase all interpolated values if they are strings.
Non-string values are left as is.

```javascript
const name = 'john';
const age = 40;
upper`My name is ${name} and I am ${age} years old`
//=> "My name is JOHN and I am 40 years old"
```

## Contributing

Each tag must be the default export of its own module which must be named after the tag and located in the `src` directory.

A tag must be documented with a JSDoc block set on the export statement.

```javascript
// src/foo_bar.js

/**
 * Short description goes here (<= 80 characters)
 *
 * Long description goes here...
 * Long description goes here...
 * Long description goes here...
 *
 * Can use Markdown too!
 *
 * ```javascript
 * foo_bar`hello ${world}!`
 * ```
 */
module.exports = function foo_bar() {
  //...
};
```

Run `yarn doc` to automatically update this README file.