const { spawn } = require('child_process');
module.exports = (cwd) => {
  return new Promise((resolve, reject) => {
    const install = spawn('npm', ['install'], {
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
