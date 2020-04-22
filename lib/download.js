const downloadRaw = require('download-git-repo');
const fse = require('fs-extra');
const fs = require('fs').promises;
const ora = require('ora');
const logger = require('../lib/logger');
const { logWithSpinner, stopSpinner } = require('../lib/spinner');

const Download = function () {
  return new Promise((resolve, reject) => {
    downloadRaw(...arguments, function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
module.exports = async function download(template, targetDir, clone) {
  logWithSpinner('Downloading template');
  // const spinner = ora({ text: 'downloading template...', spinner: 'arrow3' }).start();
  const isExist = await fs.stat(targetDir).catch(() => false);
  if (isExist) {
    await fse.remove(targetDir);
  }
  await fs.mkdir(targetDir);
  try {
    await Download(template, targetDir, { clone });
    stopSpinner();
    return targetDir;
  } catch (err) {
    stopSpinner();
    logger.error(err);
  }
};
