import expect, { assert, spyOn } from 'expect';
import { SyncPromise } from 'data-tada';

let createExecutionPlan;
try { createExecutionPlan = require('../createExecutionPlan').default; }
catch(e) {}

const noop = () => {};
const resolve = value => resolve => resolve(value);
const reject = value => (_, reject) => reject(value);
const _throw  = value => { throw value; };

describe('createExecutionPlan', () => {
  describe('function', () => {
    it('should be a function', () => {
      expect(createExecutionPlan).toBeA(Function);
    });

    it('should throw an error if no executor is provided', () => {
      expect(() => createExecutionPlan()).toThrow();
    });

    it('should throw an error if a string is provided as the executor', () => {
      expect(() => createExecutionPlan("abc")).toThrow();
    });

    it('should throw an error if a number is provided as the executor', () => {
      expect(() => createExecutionPlan(123)).toThrow();
    });

    it('should NOT throw an error if an executor is provided', () => {
      expect(() => createExecutionPlan(noop)).toNotThrow();
    });

    it('should have a `then` function', () => {
      expect(createExecutionPlan(noop).then).toBeA(Function);
    });

    it('should have a `catch` function', () => {
      expect(createExecutionPlan(noop).catch).toBeA(Function);
    });

    it('should have a `value` function', () => {
      expect(createExecutionPlan(noop).value).toBeA(Function);
    });

    it('should have a `value.resolved` function', () => {
      expect(createExecutionPlan(noop).value.resolved).toBeA(Function);
    });

    it('should have a `value.rejected` function', () => {
      expect(createExecutionPlan(noop).value.rejected).toBeA(Function);
    });
  });

  describe('executor', () => {
    it('should throw an error if the executor does not return a SyncPromise', () => {
      expect(() => createExecutionPlan(value => 'NotASyncPromise')(123)).toThrow();
    });

    it('should NOT throw an error if a SyncPromise is returned', () => {
      expect(() => createExecutionPlan(value => new SyncPromise(resolve(value)))(123)).toNotThrow();
    });

    it('should NOT call the executor if the executionPlan function is not called', () => {
      const spy = { executor: value => new SyncPromise(resolve(value)) };
      spyOn(spy, 'executor').andCallThrough();
      const plan = createExecutionPlan(spy.executor);
      expect(spy.executor).toNotHaveBeenCalled();
    });

    it('should call the executor if the executionPlan function is called', () => {
      const spy = { executor: value => new SyncPromise(resolve(value)) };
      spyOn(spy, 'executor').andCallThrough();
      const plan = createExecutionPlan(spy.executor);
      plan(123);
      expect(spy.executor).toHaveBeenCalled();
    });

    it('should return a SyncPromise', () => {
      expect(createExecutionPlan(value => new SyncPromise(resolve(value)))(123)).toBeA(SyncPromise);
    });
  });

  describe('then', () => {
    it('should throw an error if an onResolved function is NOT supplied', () => {
      expect(() => createExecutionPlan(value => resolve(value)).then()).toThrow();
    });

    it('should throw an error if a string is supplied as an onResolved function', () => {
      expect(() => createExecutionPlan(value => resolve(value)).then("abc")).toThrow();
    });

    it('should throw an error if a number is supplied as an onResolved function', () => {
      expect(() => createExecutionPlan(value => resolve(value)).then(123)).toThrow();
    });

    it('should NOT throw an error if an onResolved function is supplied', () => {
      expect(() => createExecutionPlan(value => resolve(value)).then(noop)).toNotThrow();
    });

    it('should be chainable', () => {
      const plan = createExecutionPlan(value => resolve(value)).then(noop);
      expect(plan).toBeA(Function);
      expect(plan.then).toBeA(Function, '.then().then is not a function');
      expect(plan.catch).toBeA(Function, '.then().catch is not a function');
      expect(plan.value).toBeA(Function, '.then().value is not a function');
      expect(plan.value.resolved).toBeA(Function, '.then().value.resolved is not a function');
      expect(plan.value.rejected).toBeA(Function, '.then().value.rejected is not a function');
    });
  });

  describe('catch', () => {
    it('should throw an error if an onRejected function is NOT supplied', () => {
      expect(() => createExecutionPlan(value => resolve(value)).catch()).toThrow();
    });

    it('should throw an error if a string is supplied as an onRejected function', () => {
      expect(() => createExecutionPlan(value => resolve(value)).catch("abc")).toThrow();
    });

    it('should throw an error if a number is supplied as an onRejected function', () => {
      expect(() => createExecutionPlan(value => resolve(value)).catch(123)).toThrow();
    });

    it('should NOT throw an error if an onRejected function is supplied', () => {
      expect(() => createExecutionPlan(value => resolve(value)).catch(noop)).toNotThrow();
    });

    it('should be chainable', () => {
      const plan = createExecutionPlan(value => resolve(value)).catch(noop);
        expect(plan).toBeA(Function);
        expect(plan.then).toBeA(Function, '.catch().then is not a function');
        expect(plan.catch).toBeA(Function, '.catch().catch is not a function');
        expect(plan.value).toBeA(Function, '.catch().value is not a function');
        expect(plan.value.resolved).toBeA(Function, '.catch().value.resolved is not a function');
        expect(plan.value.rejected).toBeA(Function, '.catch().value.rejected is not a function');
      });
    });

  describe('value', () => {
    it('should NOT throw an error if an onValue function is NOT supplied', () => {
      expect(() => createExecutionPlan(value => resolve(value)).value()).toNotThrow();
    });

    it('should NOT throw an error if an onResolved function is supplied', () => {
      expect(() => createExecutionPlan(value => resolve(value)).value(noop)).toNotThrow();
    });

    it('should NOT be chainable', () => {
      const plan = createExecutionPlan(value => resolve(value));
      plan.value();
      expect(plan).toBeA(Function);
      expect(plan.then).toNotExist('.value().then is a function');
      expect(plan.catch).toNotExist('.value().catch is a function');
      expect(plan.value).toNotExist('.value().value is a function');
    });
  });

  describe('value.resolved', () => {
    it('should NOT be chainable', () => {
      const plan = createExecutionPlan(value => resolve(value));
      plan.value.resolved();
      expect(plan).toBeA(Function);
      expect(plan.then).toNotExist('.value.rejected().then is a function');
      expect(plan.catch).toNotExist('.value.rejected().catch is a function');
      expect(plan.value).toNotExist('.value.rejected().value is a function');
    });
  });

  describe('value.rejected', () => {
    it('should NOT be chainable', () => {
      const plan = createExecutionPlan(value => resolve(value));
      plan.value.rejected();
      expect(plan).toBeA(Function);
      expect(plan.then).toNotExist('.value.rejected().then is a function');
      expect(plan.catch).toNotExist('.value.rejected().catch is a function');
      expect(plan.value).toNotExist('.value.rejected().value is a function');
    });
  });

  describe('execution', () => {
    describe('then->catch->execute', () => {
      it('should perform then and skip catch if resolved', () => {
        const plan = createExecutionPlan(value => new SyncPromise(resolve(value)))
          .then(v => v * 2)
          .catch(v => 0);
        plan(104).value(state => {
          expect(state).toContain({
            status: 'resolved',
            value: 208,
          });
        });
      });

      it('should skip then and perform catch if rejected', () => {
        const plan = createExecutionPlan(value => new SyncPromise(reject(value)))
          .then(v => v * 2)
          .catch(v => v + 'err');
        plan(54).value(state => {
          expect(state).toContain({
            status: 'resolved',
            value: '54err',
          });
        });
      });
    });

    describe('value->execute', () => {
      it('should return the value if resolved', () => {
        const plan = createExecutionPlan(value => new SyncPromise(resolve(842))).value();
        const expected = plan(7215);
        expect(expected).toBe(842);
      });

      it('should return the value if rejected', () => {
        const plan = createExecutionPlan(value => new SyncPromise(reject(975))).value();
        const expected = plan(5127);
        expect(expected).toBe(975);
      });
    });

    describe('value.resolved->execute', () => {
      it('should return the value if resolved', () => {
        const plan = createExecutionPlan(value => new SyncPromise(resolve(842))).value.resolved();
        const expected = plan(7215);
        expect(expected).toBe(842);
      });

      it('should return undefined if rejected', () => {
        const plan = createExecutionPlan(value => new SyncPromise(reject(975))).value.resolved();
        const expected = plan(5127);
        expect(expected).toBe(undefined);
      });
    });

    describe('value.rejected->execute', () => {
      it('should return undefined if resolved', () => {
        const plan = createExecutionPlan(value => new SyncPromise(resolve(842))).value.rejected();
        const expected = plan(7215);
        expect(expected).toBe(undefined);
      });

      it('should return the value if rejected', () => {
        const plan = createExecutionPlan(value => new SyncPromise(reject(975))).value.rejected();
        const expected = plan(5127);
        expect(expected).toBe(975);
      });
    });

    describe('then->catch->execute->then->catch', () => {
      it('should perform both then functions if resolved', () => {
        const plan = createExecutionPlan(value => new SyncPromise(resolve(value)))
          .then(v => v * 2)
          .catch(v => v + 'err');
        plan(820)
          .then(v => v + 9)
          .catch(v => v + 'ERR')
          .value(state => {
            expect(state).toContain({
              status: 'resolved',
              value: 1649,
            });
          });
      });

      it('should perform both catch functions if rejected', () => {
        const plan = createExecutionPlan(value => new SyncPromise(reject(value)))
          .then(v => v * 2)
          .catch(v => _throw(`${v}err`));
        plan(820)
          .then(v => v + 9)
          .catch(v => _throw(`${v}ERR`))
          .value(state => {
            expect(state).toContain({
              status: 'rejected',
              value: '820errERR',
            });
          });
      });
    });
  });
});
