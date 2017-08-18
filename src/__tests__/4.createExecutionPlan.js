import expect, { assert, spyOn } from 'expect';

let createExecutionPlan;
try { createExecutionPlan = require('../createExecutionPlan').default; }
catch(e) {}

describe('createExecutionPlan', () => {
  it('should be a function', () => {
    expect(createExecutionPlan).toBeA(Function);
  });
});
