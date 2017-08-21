# [Test-Driven Learning: SyncPromise Parser](../README.md)

## Parse.number

A function that will parse an input into a number. It results in a [SyncPromise](SyncPromise.md).

```js
config => value => SyncPromise
```

### Configuration

The first call supplies optional configuration.
```js
Parse.number();
Parse.number({ required: true });
```

#### Default configuration
```js
{
  required: false,
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
}
```

-----
### Parsing
The next call attempts to parse the value.  It returns a SyncPromise that is resolved if successful.
```js
const parser = Parse.number({ min: 100 });
const success = parser("123"); // status=resolved, value=123
const fail = parser("50"); // status=rejected, value='Too Low'
```

It should be able to successfully parse the following values:
```js
const parser = Parse.number();
parser(123).value(); // 123
parser("$-12,345.67").value(); // -12345.67
parser("You must be at least 18 years old!").value(); // 18
```

#### Resolve/Reject
- `'Required'` - If the value is `null`, `undefined` or empty string the SyncPromise will reject with 'Required' or resolve with `NaN` depending on if it is configured as required.
- `'Invalid'` - If the value cannot be parsed into a number the SyncPromise should reject as 'Invalid'.
- `'Too Low'` - If the parsed value is less than the configured minimum value the SyncPromise should reject as 'Too Low'.
- `'Too High'` - If the parsed value is more than the configured maximum value the SyncPromise should reject as 'Too High'.
- Otherwise the SyncPromise resolves with the parsed value.

-----
### Execution Plans
```js
const parser = Parse.number()
  .then(v => v * 2)
  .catch(v => 0)
  .value();
const result = parser("123"); // 246
```
After configuration but before parsing, the parser should support [SyncPromise](SyncPromise.md) functions.  For more details read the [createExecutionPlan](createExexcutionPlan.md) documentation.
