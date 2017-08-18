import expect, { assert, spyOn } from 'expect';

let parser, fileReadError;
try { parser = require('../Parse.number').default; }
catch(e) { fileReadError = e; }

describe('Parse.number', () => {
  it('should be a file', () => {
    assert(!fileReadError, 'src/Parse.number.js should be a file');
  });

  it('should be a function', () => {
    expect(parser).toBeA(Function);
  });
});
