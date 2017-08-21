# Test-Driven Learning: SyncPromise Parser
_This exercise builds upon [Test-Driven Learning: SyncPromise](https://github.com/jason-whitted/tdl-syncpromise)._

A thorough set of unit tests have been created for you.  Now you just need to make them pass!

## Installation
```
git clone https://github.com/jason-whitted/tdl-syncpromise-parser
cd tdl-syncpromise-parser
npm Installation
```

## Directions
You will be working in the following files:
- `src/Parse.number.js`
- `src/Parse.string.js`
- `src/createExecutionPlan.js`

These _should_ be the ***ONLY*** files you need to change.

Utilize documentation and unit tests to help you create the functions.

### Documentation
Read the docs!  You don't have to fully comprehend them initially, but it is good to get familiar with the documentation.

- [SyncPromise](docs/SyncPromise.md)
- [Parse.number](docs/Parse.number.md)
- [Parse.string](docs/Parse.string.md)
- [createExecutionPlan](docs/createExecutionPlan.md)

### Run Unit Tests
```
npm run test
npm run test:min
npm run test:cov
```

- `npm run test`
  - Displays complete unit test report.
- `npm run test:min`
  - Displays minimal unit test report.
  - Only displays the first unit test error.
- `npm run test:cov`
  - Generates code coverage.
  - When you are finished you can run it and take a look at `coverage/lcov-report/index.html`.
