const fs = require('fs').promises;
const fse = require('fs-extra');

const isExist = (targetDir) => fs.stat(targetDir).catch(() => false);

module.exports = Object.assign(fse, {
  isExist,
});
