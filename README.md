## API

* <a name="hide">hide</a> - _Hides interpolated values_
* <a name="trim">trim</a> - _Trim interpolated values_
* <a name="upper">upper</a> - _Uppercase interpolated values_

### <a name="#hide"></a>hide


The `hide` tag replaces all interpolated values with 'xxx':

```javascript
hide`Hi ${name}, you credit card number is ${cc_num}`
//=> "Hi xxx, you credit card number is xxx"
```
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