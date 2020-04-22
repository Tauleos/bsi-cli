const program = require('commander');
const chalk = require('chalk');
const path = require('path');
// const ejs = require('ejs');
const fsUtils = require('../../lib/fileRunner');
const inquirer = require('inquirer');
const os = require('os');
const download = require('../../lib/download');
const Metalsmith = require('metalsmith');
const logger = require('../../lib/logger');
const { logWithSpinner, stopSpinner } = require('../../lib/spinner');

program.option('-c, --clone', 'use git clone');

program.on('--help', function () {
  console.log();
  console.log('  Examples:');
  console.log();
  console.log(chalk.gray('    # create a new project with an official template'));
  console.log('    $ cm create my-project template');
  console.log();
  console.log(chalk.gray('    # create a new project straight from a github template'));
  console.log('    $ cm create my-project username/repo');
  console.log();
  console.log(chalk.gray('    # create a new project straight from a local template'));
  console.log('    $ cm create my-project ~/fs/path/to-custom-template');
  console.log();
});
program.parse(process.argv);

console.log();
process.on('exit', function () {
  console.log();
});
const appName = program.args[0];
let templateName = program.args[1];
const isHere = !appName || appName === '.';
const name = isHere ? path.relative('../', process.cwd()) : appName;
const targetPath = path.join(process.cwd(), appName || '.');
const clone = program.clone || true;

async function getAnswer() {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'What framework do you want?',
      choices: ['VueAdmin', 'VueComponent', 'React', 'ReactComponent', 'Koa', 'Express'],
      prefix: '🐢',
    },
  ]);
}
async function run(_templateName) {
  if (!_templateName) {
    const info = await getAnswer();
    templateName = '123';
  }
  templateName = program.args[1] || _templateName;
  const isExist = await fsUtils.isExist(targetPath);
  if (isExist) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: isHere
            ? 'Generate project in current directory?'
            : 'Target directory exists. Continue?',
          name: 'ok',
        },
      ])
      .then((answers) => {
        if (answers.ok) {
          start();
        }
      });
  } else {
    start();
  }
}
const templateCacheDirectory = path.join(os.homedir(), '.think-templates');
async function start() {
  logWithSpinner(`✨`, `Creating project in ${chalk.yellow(name)}.`);
  const isExist = await fsUtils.isExist(templateName);
  if (isExist) {
    await localCopy();
  } else {
    await remoteCopy();
  }
  // log instructions
  stopSpinner();
  logger.log();
  logger.log(`🎉  Successfully created project ${chalk.yellow(targetPath)}.`);
  logger.log(
    `👉  Get started with the following commands:\n\n` +
      (targetPath === process.cwd() ? `` : chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`)) +
      chalk.cyan(` ${chalk.gray('$')} ${'yarn serve'}`) +
      chalk.cyan(` ${chalk.gray('$')} or`) +
      chalk.cyan(` ${chalk.gray('$')} npm run serve`)
  );

  logger.log();
}

async function localCopy() {
  let template = templateName;
  if (!path.isAbsolute(template)) {
    template = path.normalize(path.join(process.cwd(), template));
  }
  console.log(template);

  return new Promise((resolve, reject) => {
    Metalsmith(template)
      .clean(true)
      .source('.')
      .destination(templateCacheDirectory)
      .build((err, files) => {
        console.log('files', files);
        if (err) {
          console.log();
          logger.error('Local template synchronization failed, reason: "%s".', err.message.trim());
        }
        resolve();
      });
  });
}
async function remoteCopy() {
  await download(templateName, templateCacheDirectory, clone);
  try {
    await fsUtils.copy(templateCacheDirectory, targetPath);
  } catch (err) {
    logger.error(err);
  }
}

module.exports = run;
