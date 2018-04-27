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

const nodemon = require('nodemon');
const notifier = require('node-notifier');
const { exec } = require('child_process');
const chalk = require('chalk');
const parser = require('./parser');

const FILE_EXT = 'm c';

nodemon({
  script: './scripts/_noop.js',
  ext: FILE_EXT,
  ignore: './build',
}).on('start', () => {
  // process started correctly
  clearTerminal();
  console.log(chalk.green('Watching...'));
}).on('restart', (filesChanged) => {

  clearTerminal();
  const basePath = process.cwd();
  const fileName = filesChanged[0].split('/').pop();
  const filePath = filesChanged[0].split(basePath)[1];
  const fileWithNoExtension = fileName.split('.').slice(0,-1).join('.');

  const cmds = [
    'rm -Rf build',
    'mkdir build',
    `gcc -framework Foundation ${filesChanged[0]} -o ./build/${fileWithNoExtension}`,
    `./build/${fileWithNoExtension}`
  ].join(' && ');

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
