## API

* <a name="#hide"></a>hide - _Hides interpolated values_

### hide

Hides interpolated values

The `hide` tag replaces all interpolated values with 'xxx':

```javascript
hide`Hi ${name}, you credit card number is ${cc_num}`
//=> "Hi xxx, you credit card number is xxx"
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