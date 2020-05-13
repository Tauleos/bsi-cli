const fs = require('fs').promises;
const fse = require('fs-extra');
const globby = require('globby');
const ejs = require('ejs');

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
      const str = await ejs.renderFile(source, renderOptions.data);
      const path = path.join(dest, file);
      await fs.writeFile(path, str, { encoding: 'utf8' });
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
