import expect, { assert, spyOn } from 'expect';

let createExecutionPlan, fileReadError;
try { createExecutionPlan = require('../createExecutionPlan').default; }
catch(e) { fileReadError = e; }

describe('createExecutionPlan', () => {
  it('should be a file', () => {
    assert(!fileReadError, 'src/createExecutionPlan.js should be a file');
  })

  it('should be a function', () => {
    expect(createExecutionPlan).toBeA(Function);
  });
});
