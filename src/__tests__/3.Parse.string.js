import expect, { spyOn } from 'expect';

let parser;
try { parser = require('../Parse.string').default; }
catch(e) {}

describe('Parse.string', () => {
  it('should be a function', () => {
    expect(parser).toBeA(Function);
  });
});
