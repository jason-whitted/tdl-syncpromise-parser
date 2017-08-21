import expect, { spyOn } from 'expect';
import { SyncPromise } from 'data-tada';

let parser;
try { parser = require('../Parse.string').default; }
catch(e) {}

describe('Parse.string', () => {
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

    it('().value.resolved() should return ""', () => {
      const promise = parser()();
      expect(promise.value()).toBe("");
      expect(promise.value.resolved()).toBe("");
    });

    it('("o.O").value.resolved() should return "o.O"', () => {
      const promise = parser()("o.O");
      expect(promise.value()).toBe("o.O");
      expect(promise.value.resolved()).toBe("o.O");
    });
  });

  describe('({ required: true })', () => {
    it('().value.rejected() should return "Required"', () => {
      const promise = parser({ required: true })();
      expect(promise.value()).toBe("Required");
      expect(promise.value.rejected()).toBe("Required");
    });

    it('("").value.rejected() should return "Required"', () => {
      const promise = parser({ required: true })("");
      expect(promise.value()).toBe("Required");
      expect(promise.value.rejected()).toBe("Required");
    });

    it('("bueno").value.rejected() should return "bueno"', () => {
      const promise = parser({ required: true })("bueno");
      expect(promise.value()).toBe("bueno");
      expect(promise.value.resolved()).toBe("bueno");
    });
  });

  describe('({ minLength: 5 })', () => {
    it('().value.resolved() should return ""', () => {
      const promise = parser({ minLength: 5 })();
      expect(promise.value()).toBe("");
      expect(promise.value.resolved()).toBe("");
    });

    it('("abcd").value.rejected() should return "Too Short"', () => {
      const promise = parser({ minLength: 5 })("abcd");
      expect(promise.value()).toBe("Too Short");
      expect(promise.value.rejected()).toBe("Too Short");
    });

    it('("ABCDE").value.resolved() should return "ABCDE"', () => {
      const promise = parser({ minLength: 5 })("ABCDE");
      expect(promise.value()).toBe("ABCDE");
      expect(promise.value.resolved()).toBe("ABCDE");
    });
  });

  describe('({ maxLength: 4 })', () => {
    it('().value.resolved() should return ""', () => {
      const promise = parser({ maxLength: 4 })();
      expect(promise.value()).toBe("");
      expect(promise.value.resolved()).toBe("");
    });

    it('("abcd").value.rejected() should return "abcd"', () => {
      const promise = parser({ maxLength: 4 })("abcd");
      expect(promise.value()).toBe("abcd");
      expect(promise.value.resolved()).toBe("abcd");
    });

    it('("ABCDE").value.rejected() should return "Too Long"', () => {
      const promise = parser({ maxLength: 4 })("ABCDE");
      expect(promise.value()).toBe("Too Long");
      expect(promise.value.rejected()).toBe("Too Long");
    });
  });

  describe('({ regex: /bc/ })', () => {
    it('().value.resolved() should return ""', () => {
      const promise = parser({ regex: /bc/ })();
      expect(promise.value()).toBe("");
      expect(promise.value.resolved()).toBe("");
    });

    it('("abcd").value.resolved() should return "abcd"', () => {
      const promise = parser({ regex: /bc/ })("abcd");
      expect(promise.value()).toBe("abcd");
      expect(promise.value.resolved()).toBe("abcd");
    });

    it('("lmnop").value.rejected() should return "Invalid"', () => {
      const promise = parser({ regex: /bc/ })("lmnop");
      expect(promise.value()).toBe("Invalid");
      expect(promise.value.rejected()).toBe("Invalid");
    });
  });

  describe('({ notRegex: /bc/ })', () => {
    it('().value.resolved() should return ""', () => {
      const promise = parser({ notRegex: /bc/ })();
      expect(promise.value()).toBe("");
      expect(promise.value.resolved()).toBe("");
    });

    it('("abcd").value.rejected() should return "Invalid"', () => {
      const promise = parser({ notRegex: /bc/ })("abcd");
      expect(promise.value()).toBe("Invalid");
      expect(promise.value.rejected()).toBe("Invalid");
    });

    it('("lmnop").value.resolved() should return "lmnop"', () => {
      const promise = parser({ notRegex: /bc/ })("lmnop");
      expect(promise.value()).toBe("lmnop");
      expect(promise.value.resolved()).toBe("lmnop");
    });
  });

  describe('({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /xy/ })', () => {
    it('().value.rejected() should return "Required"', () => {
      const promise = parser({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /cd/ })();
      expect(promise.value()).toBe("Required");
      expect(promise.value.rejected()).toBe("Required");
    });

    it('("123").value.rejected() should return "Too Short"', () => {
      const promise = parser({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /cd/ })("123");
      expect(promise.value()).toBe("Too Short");
      expect(promise.value.rejected()).toBe("Too Short");
    });

    it('("1234567").value.rejected() should return "Too Long"', () => {
      const promise = parser({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /cd/ })("1234567");
      expect(promise.value()).toBe("Too Long");
      expect(promise.value.rejected()).toBe("Too Long");
    });

    it('("12345").value.rejected() should return "Invalid"', () => {
      const promise = parser({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /cd/ })("12345");
      expect(promise.value()).toBe("Invalid");
      expect(promise.value.rejected()).toBe("Invalid");
    });

    it('("abcde").value.rejected() should return "Invalid"', () => {
      const promise = parser({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /cd/ })("abcde");
      expect(promise.value()).toBe("Invalid");
      expect(promise.value.rejected()).toBe("Invalid");
    });

    it('("abc123").value.resolved() should return "abc123"', () => {
      const promise = parser({ required: true, minLength: 4, maxLength: 6, regex: /bc/, notRegex: /cd/ })("abc123");
      expect(promise.value()).toBe("abc123");
      expect(promise.value.resolved()).toBe("abc123");
    });
  });
});
