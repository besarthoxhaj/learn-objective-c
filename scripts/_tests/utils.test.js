'use strict';

const fs = require('fs-extra');
const test = require('tape');
const utils = require('../utils');

test('utils:isMultiFile', t => {

  const tmpDir = __dirname + '/tmp';
  const fileOne = tmpDir + '/one.ignore';
  const fileTwo = tmpDir + '/two.ignore';

  fs.removeSync(tmpDir);
  fs.mkdirSync(tmpDir);
  fs.writeFileSync(fileOne, 'One');
  fs.writeFileSync(fileTwo, 'Two');

  const resDir = utils.isMultiFile(tmpDir);

  fs.removeSync(tmpDir);
  t.end();
});
