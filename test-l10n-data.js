const Ajv = require('ajv');
const test = require('tape');

const validate = (new Ajv).compile(require('./l10n-data-schema.json'));

test('l10n data is consistent', (t) => {
  t.plan(1);
  const data = require('./dist/utils/l10n-data.json');
  const res = validate(data);
  if (res) {
    t.pass('l10n data looks ok');
  } else {
    t.fail(JSON.stringify(validate.errors[0], null, 2));
  }
});