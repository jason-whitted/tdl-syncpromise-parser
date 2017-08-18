import expect, { assert, spyOn } from 'expect';

let parser, fileReadError;
try { parser = require('../Parse.string').default; }
catch(e) { fileReadError = e; }

describe('Parse.string', () => {
  it('should be a file', () => {
    assert(!fileReadError, 'src/Parse.string.js should be a file');
  });

  it('should be a function', () => {
    expect(parser).toBeA(Function);
  });
});
