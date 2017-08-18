import expect, { spyOn } from 'expect';
import { SyncPromise } from 'data-tada';

let parser;
try { parser = require('../Parse.number').default; }
catch(e) {}

describe('Parse.number', () => {
  it('should be a function', () => {
    expect(parser).toBeA(Function);
  });

  describe('()', () => {
    it('() should return a function', () => {
      expect(parser()).toBeA(Function);
    });

    it('()() should return a SyncPromise', () => {
      const promise = parser()();
      expect(promise).toBeA(SyncPromise);
    });

    it('()().value.resolved() should return NaN', () => {
      const expected = parser()().value.resolved();
      expect(isNaN(expected)).toBe(true);
    });

    it('()("-123").value.resolved() should return -123', () => {
      const expected = parser()("123").value.resolved();
      expect(expected).toBe(-123);
    });

    it('()("xyz").value.rejected() should return "Invalid"', () => {
      const expected = parser()('xyz').value.rejected();
      expect(expected).toBe('Invalid');
    });

    it('()("$12,345.67").value.resolved() should return 12345.67', () => {
      const expected = parser()("$12,345.67").value.resolved();
      expect(expected).toBe(12345.67);
    });
  });

  describe('({ required: true })', () => {
    it('().value.rejected() should return "Required"', () => {
      const expected = parser({ required: true })().value.rejected();
      expect(expected).toBe('Required');
    });

    it('(".123").value.resolved() should return 0.123', () => {
      const expected = parser({ required: true })('.123').value.resolved();
      expect(expected).toBe(0.123);
    });

    it('("abc").value.rejected() should return "Invalid"', () => {
      const expected = parser({ required: true })("abc").value.rejected();
      expect(expected).toBe('Invalid');
    });
  });

  describe('({ min: 0 })', () => {
    it('("-0.001").value.rejected() should return "Too Low"', () => {
      const expected = parser({ min: 0 })("-0.001").value.rejected();
      expect(expected).toBe("Too Low");
    });

    it('("+0.001").value.resolved() should return 0.001', () => {
      const expected = parser({ min: 0 })("+0.001").value.resolved();
      expect(expected).toBe(0.001);
    });

    it('(0).value.resolved() should return 0', () => {
      const expected = parser({ min: 0 })(0).value.resolved();
      expect(expected).toBe(0);
    });
  });

  describe('({ max: 0 })', () => {
    it('("-0.001").value.resolved() should return -0.001', () => {
      const expected = parser({ max: 0 })("-0.001").value.resolved();
      expect(expected).toBe(-0.001);
    });

    it('("+0.001").value.rejected() should return "Too High"', () => {
      const expected = parser({ max: 0 })("+0.001").value.rejected();
      expect(expected).toBe('Too High');
    });

    it('(0).value.resolved() should return 0', () => {
      const expected = parser({ max: 0 })(0).value.resolved();
      expect(expected).toBe(0);
    });
  });

  describe('({ required: true, min: 10, max: 15 })', () => {
    it('().value.rejected() should return "Required"', () => {
      const expected = parser({ required: true, min: 10, max: 15 })().value.rejected();
      expect(expected).toBe("Required");
    });

    it('("?9.876?").value.rejected() should return "Too Low"', () => {
      const expected = parser({ required: true, min: 10, max: 15 })("?9.876?").value.rejected();
      expect(expected).toBe("Too Low");
    });

    it('("?15.341?").value.rejected() should return "Too High"', () => {
      const expected = parser({ required: true, min: 10, max: 15 })("?15.341?").value.rejected();
      expect(expected).toBe("Too High");
    });

    it('("??").value.rejected() should return "Invalid"', () => {
      const expected = parser({ required: true, min: 10, max: 15 })("??").value.rejected();
      expect(expected).toBe("Invalid");
    });

    it('("?12.752?").value.resolved() should return 12.752', () => {
      const expected = parser({ required: true, min: 10, max: 15 })("?12.752?").value.resolved();
      expect(expected).toBe(12.752);
    });
  });
});
