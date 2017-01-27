# cardigan <sub><sup>| node.js function serialization</sup></sub>
[![version](http://img.shields.io/badge/version-0.1.0-blue.svg)](https://www.npmjs.com/package/@cloudelements/cardigan)
[![versioning](http://img.shields.io/badge/versioning-semver-blue.svg)](http://semver.org/)
[![branching](http://img.shields.io/badge/branching-github%20flow-blue.svg)](https://guides.github.com/introduction/flow/)
[![styling](http://img.shields.io/badge/code%20styling-XO-blue.svg)](https://github.com/sindresorhus/xo)
[![build](https://circleci.com/gh/cloud-elements/cardigan.svg?style=shield&circle-token=d2c4daf4faf4449f3a311516944c34058ca791a5)](https://circleci.com/gh/cloud-elements/cardigan)

## Install
```javascript
$ npm install --save @cloudelements/cardigan
```

## Usage

### Function serialization:
```javascript
const {serialize} = require('@cloudelements/cardigan');

const add = serialize((a, b) => a + b);
const subtract = serialize((a, b) => a - b);

// Do something with serialized functions (e.g. send to supporting FaaS, save to disk)
```

> PROTIP: Functions should not reference anything outside their lexical scope.

### Function deserialization:
```javascript
const {deserialize, serialize} = require('@cloudelements/cardigan');

const add = serialize((a, b) => a + b);
const subtract = serialize((a, b) => a - b);

const add2And3 = deserialize(add)(2, 3); // 5
const subtract3And2 = deserialize(subtract)(3, 2); // 1
```

## Supported Function Types

### Function expressions:
```javascript
function (a) { ... }
```

### Async function expressions:
```javascript
async function (a) { ... }
```

### Unary arrow functions:
```javascript
a => { ... }
```

### Async unary arrow functions:
```javascript
async a => { ... }
```

### Polyadic arrow functions:
```javascript
(a, b) => { ... }
```

### Async polyadic arrow functions:
```javascript
async (a, b) => { ... }
```

## Maintainers
* Rocky Madden (rocky@cloud-elements.com)
