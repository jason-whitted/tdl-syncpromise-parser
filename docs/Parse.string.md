# [Test-Driven Learning: SyncPromise Parser](../README.md)

## Parse.string

A function that will parse an input into a string. It results in a [SyncPromise](SyncPromise.md).

```js
config => value => SyncPromise
```

### Configuration

The first call supplies optional configuration.
```js
Parse.string();
Parse.string({ required: true });
```

#### Default configuration
```js
{
  required: false,
  minLength: 0,
  maxLength: Number.POSITIVE_INFINITY,
  regex: undefined,
  notRegex: undefined,
}
```

-----
### Parsing
The next call attempts to parse the value.  It returns a SyncPromise that is resolved if successful.
```js
const parser = Parse.string({ minLength: 4 });
const success = parser("abc123"); // status=resolved, value='abc123'
const fail = parser("abc"); // status=rejected, value='Too Short'
```

#### Resolve/Reject
- `'Required'` - If the value is `null`, `undefined` or empty string the SyncPromise will reject with 'Required' or resolve with `NaN` depending on if it is configured as required.
- `'Invalid'` - If the value is not a string the SyncPromise should reject as 'Invalid'.
- `'Too Short'` - If the length of value is less than the configured minLength the SyncPromise should reject as 'Too Short'.
- `'Too High'` - If the length of value is more than the configured maxLength the SyncPromise should reject as 'Too Long'.
- `'Invalid'` - If value does not match the configured regex then the SyncPromise should reject with 'Invalid'.  If the value matches the configured notRegex then the SyncPromise should reject with 'Invalid'.
- Otherwise the SyncPromise resolves with the value.

-----
### Execution Plans
```js
const parser = Parse.string({ minLength: 4 })
  .then(v => v.toUpperCase())
  .catch(v => '')
  .value();
const result = parser("abc123"); // 'ABC123'
```
After configuration but before parsing, the parser should support [SyncPromise](SyncPromise.md) functions.  For more details read the [createExecutionPlan](createExexcutionPlan.md) documentation.
