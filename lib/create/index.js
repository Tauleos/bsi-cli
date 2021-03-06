const program = require('commander');
const chalk = require('chalk');
const path = require('path');
const fsUtils = require('../../utils/fileRunner');
const inquirer = require('inquirer');
const Creator = require('./Creator');
const { PluginsContainer } = require('./Plugins');
const logger = require('../../utils/logger');
const { stopSpinner } = require('../../utils/spinner');
// const cliName = process.env.CLI_NAME || 'bsi';

// program.on('--help', function () {
//   console.log();
//   console.log('  Examples:');
//   console.log();
//   console.log(chalk.gray('    # create a new project with an official template'));
//   console.log(`    $ ${cliName} create my-project`);
//   console.log();
//   console.log(chalk.gray('    # create a new project straight from a github template'));
//   console.log(`    $ ${cliName} create my-project username/repo`);
//   console.log();
//   console.log(chalk.gray('    # create a new project straight from a local template'));
//   console.log(`    $ ${cliName} create my-project ~/fs/path/to-custom-template`);
//   console.log();
// });
// program.parse(process.argv);

// console.log();
process.on('exit', function () {
  console.log();
});

// const clone = program.clone || true;
// const templateCacheDirectory = path.join(os.homedir(), '.bsi-templates');

async function getAnswer() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'What framework do you want?',
      choices: ['VueAdmin', 'VueComponent', 'React', 'ReactComponent', 'Koa', 'Express'],
      prefix: '🐢',
    },
  ]);
}
let pluginsContainer = new PluginsContainer();
async function run(appName, templateName) {
  const isHere = !appName || appName === '.';
  const name = isHere ? path.relative('../', process.cwd()) : appName;
  const targetPath = path.join(process.cwd(), appName || '.');
  // if (!appName) {
  //   program.outputHelp();
  //   console.log(`  ` + chalk.red(`Missing required argument ${chalk.yellow(`<app-name>`)}.`));
  //   console.log();
  //   process.exit(1);
  // }
  console.log(targetPath);

  const isExist = await fsUtils.isExist(targetPath);
  if (isExist) {
    const { ok } = await inquirer.prompt([
      {
        type: 'confirm',
        message: isHere
          ? 'Generate project in current directory?'
          : 'Target directory exists. Continue?',
        name: 'ok',
      },
    ]);
    if (!ok) {
      return;
    }
  }

  if (!templateName) {
    const info = await getAnswer();
    templateName = path.join(__dirname, `../../template/${info.framework}`);
  }

  // start();
  const creator = new Creator(name, templateName, targetPath, pluginsContainer.plugins);
  await creator.create().catch((err) => {
    stopSpinner(false); // do not persist
    logger.error(err.stack);
    process.exit(1);
  });
}

module.exports = {
  run,
  registerPlugins: pluginsContainer.registerPlugins.bind(pluginsContainer),
};
