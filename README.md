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

## Supported Function Types

### Function Expressions
```javascript
function (a) { ... }
```

### Async Function Expressions
```javascript
async function (a) { ... }
```

### Unary Arrow Functions
```javascript
a => { ... }
```

### Async Unary Arrow Functions
```javascript
async a => { ... }
```

### Polyadic Arrow Functions
```javascript
(a, b) => { ... }
```

### Async Polyadic Arrow Functions
```javascript
async (a, b) => { ... }
```

## Maintainers
* Rocky Madden
* Brian Rothhaar
