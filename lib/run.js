const { spawn } = require('child_process');
module.exports = (cmd, args, cwd) => {
  if (!cwd) {
    cwd = args;
    [cmd, ...args] = cmd.split(/\s+/);
  }
  return new Promise((resolve, reject) => {
    const install = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
    });
    install.on('exit', (code) => {
      console.log('aaa', code);
      if (code === 0) {
        resolve();
      } else {
        console.log(`child process close all stdio with code ${code}`);
        reject();
      }
    });
  });
};
