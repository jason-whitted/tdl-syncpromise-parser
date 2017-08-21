# [Test-Driven Learning: SyncPromise Parser](../README.md)

## createExecutionPlan

`createExecutionPlan` is a function when executed will return a [SyncPromise](SyncPromise.md).  The function has `then`, `catch`, and `value` functions like a SyncPromise, but they allow the functionality to be specified BEFORE the SyncPromise is created.

```js
const plan = createExecutionPlan( /* executor */ value => {
  return new SyncPromise(resolve => resolve(value));
});
const promise = plan(123);
```

-----
### `.then(onResolved)`
```js
const executor = value => new SyncPromise(resolve => resolve(value));
const plan = createExecutionPlan(executor)
  .then(v => v * 2);
const promise = plan(123); // SyncPromise: status=resolved, value=246
```

-----
### `.catch(onRejected)`
```js
const executor = value => new SyncPromise((resolve, reject) => reject('err'));
const plan = createExecutionPlan(executor)
  .catch(v => 0);
const promise = plan(123); // SyncPromise: status=resolved, value=0
```

-----
### `.value([onValue])`
```js
const executor = value => new SyncPromise(resolve => resolve(value));
const plan = createExecutionPlan(executor)
  .value();
const result = plan(123); // 123
```

-----
### `.value.resolved()`
```js
const executor = value => new SyncPromise(resolve => resolve(value));
const plan = createExecutionPlan(executor)
  .value.resolved();
const result = plan(123); // 123
```

-----
### `.value.rejected()`
```js
const executor = value => new SyncPromise((resolve, reject) => reject('err'));
const plan = createExecutionPlan(executor)
  .value.rejected();
const result = plan(123); // 'err'
```
