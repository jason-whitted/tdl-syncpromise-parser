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
    it('should return a function', () => {
      expect(parser()).toBeA(Function);
    });

    it('() should return a SyncPromise', () => {
      const promise = parser()();
      expect(promise).toBeA(SyncPromise);
    });

    it('().value.resolved() should return NaN', () => {
      const promise = parser()();
      expect(isNaN(promise.value())).toBe(true);
      expect(isNaN(promise.value.resolved())).toBe(true);
    });

    it('("").value.resolved() should return NaN', () => {
      const promise = parser()("");
      expect(isNaN(promise.value())).toBe(true);
      expect(isNaN(promise.value.resolved())).toBe(true);
    });

    it('(0).value.resolved() should return 0', () => {
      const promise = parser()(0);
      expect(promise.value()).toBe(0);
      expect(promise.value.resolved()).toBe(0);
    });

    it('("-123").value.resolved() should return -123', () => {
      const promise = parser()("-123");
      expect(promise.value()).toBe(-123);
      expect(promise.value.resolved()).toBe(-123);
    });

    it('("xyz").value.rejected() should return "Invalid"', () => {
      const promise = parser()('xyz');
      expect(promise.value()).toBe('Invalid');
      expect(promise.value.rejected()).toBe('Invalid');
    });

    it('(-12345.67).value.resolved() should return -12345.67', () => {
      const promise = parser()(-12345.67);
      expect(promise.value()).toBe(-12345.67);
      expect(promise.value.resolved()).toBe(-12345.67);
    })

    it('("$12,345.67").value.resolved() should return 12345.67', () => {
      const promise = parser()("$12,345.67");
      expect(promise.value()).toBe(12345.67);
      expect(promise.value.resolved()).toBe(12345.67);
    });

    it('("The first few digits of Pi are 3.1415!")', () => {
      const promise = parser()("The first few digits of Pi are 3.1415!");
      expect(promise.value()).toBe(3.1415);
      expect(promise.value.resolved()).toBe(3.1415);
    })
  });

  describe('({ required: true })', () => {
    it('().value.rejected() should return "Required"', () => {
      const promise = parser({ required: true })();
      expect(promise.value()).toBe('Required');
      expect(promise.value.rejected()).toBe('Required');
    });

    it('("").value.rejected() should return "Required"', () => {
      const promise = parser({ required: true })("");
      expect(promise.value()).toBe('Required');
      expect(promise.value.rejected()).toBe('Required');
    });

    it('(0).value.resolved() should return 0', () => {
      const promise = parser({ required: true })(0);
      expect(promise.value()).toBe(0);
      expect(promise.value.resolved()).toBe(0);
    });

    it('(".123").value.resolved() should return 0.123', () => {
      const promise = parser({ required: true })('.123');
      expect(promise.value()).toBe(0.123);
      expect(promise.value.resolved()).toBe(0.123);
    });

    it('("abc").value.rejected() should return "Invalid"', () => {
      const promise = parser({ required: true })("abc");
      expect(promise.value()).toBe('Invalid');
      expect(promise.value.rejected()).toBe('Invalid');
    });
  });

  describe('({ min: 0 })', () => {
    it('("-0.001").value.rejected() should return "Too Low"', () => {
      const promise = parser({ min: 0 })("-0.001");
      expect(promise.value()).toBe("Too Low");
      expect(promise.value.rejected()).toBe("Too Low");
    });

    it('("+0.001").value.resolved() should return 0.001', () => {
      const promise = parser({ min: 0 })("+0.001");
      expect(promise.value()).toBe(0.001);
      expect(promise.value.resolved()).toBe(0.001);
    });

    it('(0).value.resolved() should return 0', () => {
      const promise = parser({ min: 0 })(0);
      expect(promise.value()).toBe(0);
      expect(promise.value.resolved()).toBe(0);
    });

    it('().value.resolved() should return NaN', () => {
      const promise = parser({ min: 0 })();
      expect(isNaN(promise.value())).toBe(true);
      expect(isNaN(promise.value.resolved())).toBe(true);
    });
  });

  describe('({ max: 0 })', () => {
    it('("-0.001").value.resolved() should return -0.001', () => {
      const promise = parser({ max: 0 })("-0.001");
      expect(promise.value()).toBe(-0.001);
      expect(promise.value.resolved()).toBe(-0.001);
    });

    it('("+0.001").value.rejected() should return "Too High"', () => {
      const promise = parser({ max: 0 })("+0.001");
      expect(promise.value()).toBe('Too High');
      expect(promise.value.rejected()).toBe('Too High');
    });

    it('(0).value.resolved() should return 0', () => {
      const promise = parser({ max: 0 })(0);
      expect(promise.value()).toBe(0);
      expect(promise.value.resolved()).toBe(0);
    });

    it('().value.resolved() should return NaN', () => {
      const promise = parser({ max: 0 })();
      expect(isNaN(promise.value())).toBe(true);
      expect(isNaN(promise.value.resolved())).toBe(true);
    });
  });

  describe('({ required: true, min: 10, max: 15 })', () => {
    it('().value.rejected() should return "Required"', () => {
      const promise = parser({ required: true, min: 10, max: 15 })();
      expect(promise.value()).toBe("Required");
      expect(promise.value.rejected()).toBe("Required");
    });

    it('("0").value.rejected() should return "Too Low"', () => {
      const promise = parser({ required: true, min: 10, max: 15 })("0");
      expect(promise.value()).toBe("Too Low");
      expect(promise.value.rejected()).toBe("Too Low");
    });

    it('("?9.876?").value.rejected() should return "Too Low"', () => {
      const promise = parser({ required: true, min: 10, max: 15 })("?9.876?");
      expect(promise.value()).toBe("Too Low");
      expect(promise.value.rejected()).toBe("Too Low");
    });

    it('("?15.341?").value.rejected() should return "Too High"', () => {
      const promise = parser({ required: true, min: 10, max: 15 })("?15.341?");
      expect(promise.value()).toBe("Too High");
      expect(promise.value.rejected()).toBe("Too High");
    });

    it('("??").value.rejected() should return "Invalid"', () => {
      const promise = parser({ required: true, min: 10, max: 15 })("??");
      expect(promise.value()).toBe("Invalid");
      expect(promise.value.rejected()).toBe("Invalid");
    });

    it('("?12.752?").value.resolved() should return 12.752', () => {
      const promise = parser({ required: true, min: 10, max: 15 })("?12.752?");
      expect(promise.value()).toBe(12.752);
      expect(promise.value.resolved()).toBe(12.752);
    });
  });
});
