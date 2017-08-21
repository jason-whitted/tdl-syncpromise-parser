# [Test-Driven Learning: SyncPromise Parser](../README.md)

## SyncPromise

> NOTE: You do not have to create this, it has been provided for you.

Similar to the SyncPromise that was created in [Test-Driven Learning: SyncPromise](https://github.com/jason-whitted/tdl-syncpromise), but with a few changes.

### Constructor
```js
import SyncPromise from './SyncPromise';

const p = new SyncPromise( /* resolver */ (resolve, reject) => { ... });
```
#### `resolver`
A function that is passed with the arguments `resolve` and `reject`.

-----
### `.then(onResolved)`
```js
p.then(onResolved);

p.then(value => {
  // fulfillment
  return newValue;
});
```
#### `onResolved`
A function called if the SyncPromise is currently resolved.  The current value is passed to the function.  The SyncPromise updates the value to the result of this function.

-----
### `.catch(onRejected)`
```js
p.catch(onRejected);

p.catch(value => {
  // rejection
  return newValue;
});
```

#### `onRejected`
A function called if the SyncPromise is currently rejected.  The current value (or error) is passed to the function.  The SyncPromise updates the value to the result of this function.

-----
### `.value([onValue])`
```js
p.value();
p.value(onValue);

p.value(current => {
  // current.status
  // current.value
  return newValue;
});
```
The value function returns the result of the `onValue` function if specified; otherwise, it returns the current value.

#### `onValue`
An optional function called with an object containing the current status and value.

-----
### `.value.resolved()`
```js
p.value.resolved();
```
Returns the current value if the promise is resolved; otherwise, it returns `undefined`.

-----
### `.value.rejected()`
```js
p.value.rejected();
```
Returns the current value if the promise is rejected; otherwise, it returns `undefined`.
