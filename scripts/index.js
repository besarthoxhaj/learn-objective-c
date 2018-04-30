/**
 * Scripts that watches files with extensions FILE_EXT (.m & .c) in the entire `cwd`:
 * - tries compile them
 * - copies them in `/build` folder
 * - runs them
 *
 * NOTE: Interestingly, node child process `exec` returns the log from `NSLog`
 * into stderr.
 */

'use strict';

const fs = require('fs-extra');
const nodemon = require('nodemon');
const notifier = require('node-notifier');
const { exec } = require('child_process');
const chalk = require('chalk');

const parser = require('./parser');
const utils = require('./utils');

const FILE_EXT = 'm c h';

nodemon({
  script: './scripts/_noop.js',
  ext: FILE_EXT,
  ignore: './build',
}).on('start', () => {
  // process started correctly
  // clearTerminal();
  console.log(chalk.green('Watching...'));
}).on('restart', (filesChanged) => {

  // clearTerminal();
  const buildPath = './.build';
  const basePath = process.cwd();
  const fileName = filesChanged[0].split('/').pop();
  const filePath = filesChanged[0].split(basePath)[1];
  const fileDir = filesChanged[0].split('/').slice(0,-1).join('/');
  const fileWithNoExtension = fileName.split('.').slice(0,-1).join('.');

  let buildCmd, execCmd;

  if(utils.isMultiFile(fileDir)) {
    buildCmd = `gcc -o ${buildPath}/main ${utils.getMainFile(fileDir)}`;
    buildCmd = buildCmd  + ' ' + utils.buildLinkerCommand(fileDir);
    buildCmd = buildCmd + ' ' + '-framework Foundation';
    execCmd = `${buildPath}/main`;
  } else {
    buildCmd = `gcc -framework Foundation ${filesChanged[0]} -o ${buildPath}/${fileWithNoExtension}`;
    execCmd = `${buildPath}/${fileWithNoExtension}`;
  }

  fs.removeSync(buildPath);
  fs.mkdirSync(buildPath);

  const cmds = [ buildCmd, execCmd ].join(' && ');
  //
  runCmd({cmds, filePath});
}).on('crash', () => {
  notifier.notify('Faild error');
}).on('exit', () => {
  // process exit correctly with no
  // errors
});

function clearTerminal() {
  // Only clear the console if it's an interactive terminal.
  if (process.stdout.isTTY) {
    process.stdout.write('\u001b[2J');
    process.stdout.write('\u001b[1;1H');
    process.stdout.write('\u001b[3J');
  }
}

/**
 * [runCmd description]
 * @param  {[type]} cmds     [description]
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
function runCmd({cmds, filePath}) {
  console.log(`cmds`, cmds);
  exec(cmds, (err, stout, stderr) => {
    console.log(chalk.green(`COMPILING ${filePath}`));
    if (err) {
      console.log(chalk.red('Error:\n'));
      console.log(stderr);
      return;
    }
    console.log(chalk.green(`SUCCESS ${filePath}\n`));
    console.log(stout + '\n');
    console.log(stderr + '\n');
  });
}
