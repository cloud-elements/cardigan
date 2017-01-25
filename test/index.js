'use strict';

const test = require('ava');
const {is} = require('@cloudelements/ramda');
const {deserialize, serialize, validFunction, validSerialized, validString} = require('../src');

test('deserialize should return a Function when provided a Function', t => {
  const fn = a => a;

  t.true(is(Function, deserialize(fn)));
});

test('deserialize should return null when provided an invalid argument', t => {
  t.falsy(deserialize(2));
});

test('deserialize should work with function expressions', t => {
  const str = 'function (a) {\n    return a;\n  }';

  t.true(is(Function, deserialize(str)));
});

test('deserialize should work with async function expressions', t => {
  const str = 'async function (a) {\n    return a;\n  }';

  t.true(is(Function, deserialize(str)));
});

test('deserialize should work with unary arrow functions', t => {
  const str0 = 'a => a';
  const str1 = 'a => {\n    return a;\n  }';

  t.true(is(Function, deserialize(str0)));
  t.true(is(Function, deserialize(str1)));
});

test('deserialize should work with async unary arrow functions', t => {
  const str0 = 'async a => a';
  const str1 = 'async a => {\n    return a;\n  }';

  t.true(is(Function, deserialize(str0)));
  t.true(is(Function, deserialize(str1)));
});

test('deserialize should work with n-ary arrow functions', t => {
  const str0 = '(a, b) => a + b';
  const str1 = '(a, b) => {\n    return a + b;\n  }';

  t.true(is(Function, deserialize(str0)));
  t.true(is(Function, deserialize(str1)));
});

test('deserialize should work with async n-ary arrow functions', t => {
  const str0 = 'async (a, b) => a + b';
  const str1 = 'async (a, b) => {\n    return a + b;\n  }';

  t.true(is(Function, deserialize(str0)));
  t.true(is(Function, deserialize(str1)));
});

test('serialize should return a String when provided a String', t => {
  const str = 'function (a) {\n    return a;\n  }';

  t.is(serialize(str), 'function (a) {\n    return a;\n  }');
});

test('serialize should return an empty String when provided an invalid argument', t => {
  t.falsy(serialize(2));
});

test('serialize should work with function expressions', t => {
  const fn = function (a) { return a; };

  t.is(serialize(fn), 'function (a) {\n    return a;\n  }');
});

test('serialize should work with async function expressions', t => {
  const fn = async function (a) { return a; };

  t.is(serialize(fn), 'async function (a) {\n    return a;\n  }');
});

test('serialize should work with unary arrow functions', t => {
  const fn0 = a => a;
  const fn1 = a => { return a; };

  t.is(serialize(fn0), 'a => a');
  t.is(serialize(fn1), 'a => {\n    return a;\n  }');
});

test('serialize should work with async unary arrow functions', t => {
  const fn0 = async a => a;
  const fn1 = async a => { return a; };

  t.is(serialize(fn0), 'async a => a');
  t.is(serialize(fn1), 'async a => {\n    return a;\n  }');
});

test('serialize should work with n-ary arrow functions', t => {
  const fn0 = (a, b) => a + b;
  const fn1 = (a, b) => { return a + b; };

  t.is(serialize(fn0), '(a, b) => a + b');
  t.is(serialize(fn1), '(a, b) => {\n    return a + b;\n  }');
});

test('serialize should work with async n-ary arrow functions', t => {
  const fn0 = async (a, b) => a + b;
  const fn1 = async (a, b) => { return a + b; };

  t.is(serialize(fn0), 'async (a, b) => a + b');
  t.is(serialize(fn1), 'async (a, b) => {\n    return a + b;\n  }');
});

test('validFunction should return true when provided a valid Function', t => {
  const fnExp = function () {};

  t.true(validFunction(fnExp));
  t.true(validFunction(() => {}));
});

test('validFunction should return false when provided an invalid Function', t => {
  t.false(validFunction(undefined));
  t.false(validFunction(null));
});

test('validFunction should return false when provided other data types', t => {
  t.false(validFunction(2));
  t.false(validFunction(new Date()));
  t.false(validFunction('string'));
});

test('validSerialized should return true when provided valid serialization', t => {
  t.true(validSerialized('function (a) {\n    return a;\n  }'));
  t.true(validSerialized('async function (a) {\n    return a;\n  }'));
  t.true(validSerialized('a => a'));
  t.true(validSerialized('a => {\n    return a;\n  }'));
  t.true(validSerialized('async a => a'));
  t.true(validSerialized('async a => {\n    return a;\n  }'));
  t.true(validSerialized('(a, b) => a + b'));
  t.true(validSerialized('(a, b) => {\n    return a + b;\n  }'));
  t.true(validSerialized('async (a, b) => a + b'));
  t.true(validSerialized('async (a, b) => {\n    return a + b;\n  }'));
});

test('validSerialized should return false when provided invalid serialization', t => {
  t.false(validSerialized(undefined));
  t.false(validSerialized(null));
  t.false(validSerialized(''));
  t.false(validSerialized(2));
  t.false(validSerialized('function(a) {\n    return a;\n  }'));
  t.false(validSerialized('async function(a) {\n    return a;\n  }'));
  t.false(validSerialized('a=>a'));
  t.false(validSerialized('a=> {\n    return a;\n  }'));
  t.false(validSerialized('async a=> a'));
  t.false(validSerialized('async a=> {\n    return a;\n  }'));
  t.false(validSerialized('(a,b) => a + b'));
  t.false(validSerialized('(a, b) =>{\n    return a + b;\n  }'));
  t.false(validSerialized('async (a,b) => a + b'));
  t.false(validSerialized('async (a, b)=> {\n    return a + b;\n  }'));
});

test('validString should return true when provided a valid String', t => {
  t.true(validString('string'));
});

test('validString should return false when provided an invalid String', t => {
  t.false(validString(undefined));
  t.false(validString(null));
  t.false(validString(''));
});

test('validString should return false when provided other data types', t => {
  t.false(validString(2));
  t.false(validString(new Date()));
  t.false(validString(() => {}));
});
