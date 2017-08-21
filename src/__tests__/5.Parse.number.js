import expect, { spyOn } from 'expect';

let parser;
try {
  parser = require('../Parse.number').default;
} catch (e) {}

const _throw = value => { throw value; };

describe('Parse.number', () => {
  describe('()', () => {
    it('should return a function (execution plan)', () => {
      const plan = parser();
      expect(plan).toBeA(Function);
      expect(plan.then).toBeA(Function, 'Parse.number().then is not a function');
      expect(plan.catch).toBeA(Function, 'Parse.number().catch is not a function');
      expect(plan.value).toBeA(Function, 'Parse.number().value is not a function');
      expect(plan.value.resolved).toBeA(Function, 'Parse.number().value.resolved is not a function');
      expect(plan.value.rejected).toBeA(Function, 'Parse.number().value.rejected is not a function');
    });
  });

  describe('({ required: true, min: 42, max: 42 })', () => {
    describe('then->catch->value->execute', () => {
      it('should just work', () => {
        const plan = parser({ required: true, min: 42, max: 42 })
          .then(v => v * 2)
          .catch(v => v + 'err')
          .then(v => v + 3)
          .value();
        const expected = plan("What's the answer to life, the universe, and everything? 42!");
        expect(expected).toBe(87);
      });
    });

    describe('then->catch->execute->then->catch->value.resolved', () => {
      it('should just work', () => {
        const plan = parser({ required: true, min: 42, max: 42 })
          .then(v => v * 2)
          .catch(v => v + 'err')
          .then(v => v + 3);
        const expected = plan('Blink 182')
          .then(v => _throw(`${v}!`))
          .catch(v => v + 'ERR')
          .then(v => v + 7)
          .value.resolved();
        expect(expected).toBe('Too Higherr3!ERR7');
      });
    });
  });
});
