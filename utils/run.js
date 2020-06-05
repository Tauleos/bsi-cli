const { spawn } = require('child_process');
const chalk = require('chalk');
module.exports = (cmd, args, opts) => {
  if (!opts) {
    opts = args;
    [cmd, ...args] = cmd.split(/\s+/);
  }

  return new Promise((resolve, reject) => {
    const install = spawn(cmd, args, {
      stdio: 'inherit',
      ...opts,
    });
    let outData;
    let errorData = '';
    if (opts && opts.stdio === 'pipe') {
      install.stdout.on('data', (data) => {
        outData = data.toString().replace(/\s/, '');
      });
      install.stderr.on('data', (data) => {
        errorData += data.toString();
      });
    }
    install.on('exit', (code) => {
      if (code === 0) {
        resolve(outData);
      } else {
        reject(errorData ? new Error(errorData) : '');
      }
    });
  });
};
