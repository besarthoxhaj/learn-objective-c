'use strict';

const fs = require('fs-extra');

module.exports = {
  isMultiFile,
  getMainFile,
  buildLinkerCommand,
};

var getDirTree = (function() {

  const tree = {};

  return function(dirPath) {

    if(!tree[dirPath]) {
      tree[dirPath] = fs.readdirSync(dirPath).map(file => dirPath + '/' + file);
    }

    return tree[dirPath];
  };
})();

/**
 * isMultiFile
 *
 * Simply check if the current directory has a main.m file.
 */
function isMultiFile(dirPath) {

  const dirTree = getDirTree(dirPath);
  return (dirTree.indexOf(dirPath + '/main.m') !== -1);
}

/**
 * [getMainFile description]
 * @return {[type]} [description]
 */
function getMainFile(dirPath) {

  const dirTree = getDirTree(dirPath);

  return dirTree.filter(file => {
    const isMainFile = !!file.match(/main\.m$/);
    return isMainFile;
  }).join('');
}

/**
 * [buildLinkerCommand description]
 * @param  {[type]} dirPath [description]
 * @return {[type]}         [description]
 */
function buildLinkerCommand(dirPath) {

  const dirTree = getDirTree(dirPath);

  const implementationFiles = dirTree.filter(file => {
    const isImpFile = !!file.match(/\.m$/);
    const isMainFile = !!file.match(/main\.m$/);
    return (isImpFile && !isMainFile);
  });

  debugger;

  return implementationFiles.join(' ');
}
