'use strict';

const commonTools = require('..');
const assert = require('assert').strict;

assert.strictEqual(commonTools(), 'Hello from commonTools');
console.info('commonTools tests passed');
