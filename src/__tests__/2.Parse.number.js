import expect, { spyOn } from 'expect';
import { SyncPromise } from 'data-tada';

let parser;
try { parser = require('../Parse.number').default; }
catch(e) {}

describe('Parse.number', () => {
  it('should be a function', () => {
    expect(parser).toBeA(Function);
  });

  it('() should return a function', () => {
    expect(parser()).toBeA(Function);
  });

  it('()() should return a SyncPromise', () => {
    const promise = parser()();
    expect(promise).toBeA(SyncPromise);
  });

  it('()("123").value() should return 123', () => {
    const expected = parser()("123").value();
    expect(expected).toBe(123);
  });

  it('()("xyz").value() should return "Invalid"', () => {
    const expected = parser()('xyz').value();
    expect(expected).toBe('Invalid');
  });
});
