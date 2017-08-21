import expect, { assert, spyOn } from 'expect';
import { SyncPromise } from 'data-tada';

let createExecutionPlan;
try { createExecutionPlan = require('../createExecutionPlan').default; }
catch(e) {}

const noop = () => {};
const resolve = value => resolve => resolve(value);
const reject = value => (_, reject) => reject(value);

describe('createExecutionPlan', () => {
  describe('function', () => {
    it('should be a function', () => {
      expect(createExecutionPlan).toBeA(Function);
    });

    it('should throw an error if no executor is provided', () => {
      expect(() => createExecutionPlan()).toThrow();
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
  });
});
