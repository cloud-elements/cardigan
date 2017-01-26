'use strict';

const {allPass, anyPass, is, isNotEmpty, isNotNil, test} = require('@cloudelements/ramda');

const regexFnExp = /^(async )?function \(/;
const regexUnaryArrowFn = /^(async )?[a-zA-Z_$][a-zA-Z0-9_$]* => /;
const regexPolyadicArrowFn = /^(async )?\(((, )?[a-zA-Z_$][a-zA-Z0-9_$]*)+\) => /;

const validFunction = allPass([isNotNil, isNotEmpty, is(Function)]);
const validString = allPass([isNotNil, isNotEmpty, is(String)]);
const validSerialized = allPass([validString, anyPass([
  test(regexFnExp),
  test(regexUnaryArrowFn),
  test(regexPolyadicArrowFn)
])]);
// validSerialized will always return true on a function, skip it since we can't truly test it.
const validDeserialized = validFunction;

const serialize = fn => {
  if (validString(fn)) {
    return fn;
  } else if (validDeserialized(fn)) {
    return fn.toString();
  } else {
    return '';
  }
};

const deserialize = str => {
  if (validFunction(str)) {
    return str;
  } else if (validSerialized(str)) {
    if (test(regexFnExp, str)) {
      return eval(`(${str})`);
    } else {
      return eval(str);
    }
  } else {
    return null;
  }
};

module.exports = ({
  deserialize,
  serialize,
  validDeserialized,
  validSerialized
});
