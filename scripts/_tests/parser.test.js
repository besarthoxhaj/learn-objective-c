'use strict';

const test = require('tape');
const parser = require('../parser');

test('Success', t => {
  t.ok(parser, 'all good');
  t.end();
});
