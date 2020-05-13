const program = require('commander');
const path = require('path');
const fs = require('fs').promises;
const UglifyJS = require('uglify-js');
const { logWithSpinner, failSpinner } = require('../utils/spinner');

module.exports = async function Compress(file, opts) {
  const absPath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  logWithSpinner('starting compress');
  const originCode = await fs.readFile(absPath, {
    encoding: 'utf8',
  });
  const { error, code } = UglifyJS.minify(originCode);
  //  console.log(result);
  if (error) {
    failSpinner(error.message);
  } else {
    if (opts.output) {
      const absPath = path.join(process.cwd(), program.output);
      await fs.writeFile(absPath, code);
    } else {
      console.log(code);
    }
    logWithSpinner('compress success!');
  }
};
