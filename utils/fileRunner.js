const fs = require('fs').promises;
const fse = require('fs-extra');
const globby = require('globby');
const path = require('path');
const ejs = require('ejs');
ejs.delimiter = '?';

const isExist = (targetDir) => fs.stat(targetDir).catch(() => false);
async function copyTemplate(src, dest, renderOptions) {
  const files = await globby('**', {
    cwd: src,
    onlyFiles: true,
    gitignore: true,
    dot: true,
    ignore: ['**/node_modules/**', '**/.git/**'],
  });
  if (renderOptions) {
    for (const file of files) {
      const source = path.join(src, file);
      const str = await fs.readFile(source, { encoding: 'utf-8' });
      const destination = path.join(dest, file);
      if (/\.(png|gif|jpg|jpeg|ico|svg)$/.test(file)) {
        await await fse.outputFile(destination, str, { encoding: 'utf8' });
        continue;
      }
      const html = await ejs.render(str, renderOptions.data, { async: true });
      await fse.outputFile(destination, html, { encoding: 'utf8' });
    }
    return;
  }
  await fse.copy(src, dest);
  return;
}
module.exports = Object.assign(fse, {
  isExist,
  copyTemplate,
});
