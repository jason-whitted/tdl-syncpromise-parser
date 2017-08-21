import expect, { spyOn } from 'expect';

let parser;
try { parser = require('../Parse.string').default; }
catch(e) {}

const _throw = value => { throw value; };

describe('Parse.string', () => {
  describe('()', () => {
    it('should return a function (execution plan)', () => {
      const plan = parser();
      expect(plan).toBeA(Function);
      expect(plan.then).toBeA(Function, 'Parse.string().then is not a function');
      expect(plan.catch).toBeA(Function, 'Parse.string().catch is not a function');
      expect(plan.value).toBeA(Function, 'Parse.string().value is not a function');
      expect(plan.value.resolved).toBeA(Function, 'Parse.string().value.resolved is not a function');
      expect(plan.value.rejected).toBeA(Function, 'Parse.string().value.rejected is not a function');
    });
  });

  describe('({ required: true, minLength: 4, maxLength: 4, regex: /bc/, notRegex: /cd/ })', () => {
    describe('then->catch->value->execute', () => {
      it('should just work', () => {
        const plan = parser({ required: true, minLength: 4, maxLength: 4, regex: /bc/, notRegex: /cd/ })
          .then(v => v + 2)
          .catch(v => v + 'err')
          .then(v => v + 3)
          .value();
        const expected = plan("abc!");
        expect(expected).toBe('abc!23');
      });
    });

    describe('then->catch->execute->then->catch->value.resolved', () => {
      it('should just work', () => {
        const plan = parser({ required: true, minLength: 4, maxLength: 4, regex: /bc/, notRegex: /cd/ })
          .then(v => v + 2)
          .catch(v => v + 'err')
          .then(v => v + 3);
        const expected = plan('abcd')
          .then(v => _throw(`${v}!`))
          .catch(v => v + 'ERR')
          .then(v => v + 7)
          .value.resolved();
        expect(expected).toBe('Invaliderr3!ERR7');
      });
    });
  });
});
