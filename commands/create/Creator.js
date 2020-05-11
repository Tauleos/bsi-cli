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
const runCmd = require('../../lib/run');
const globby = require('globby');
const { PluginsAPI } = require('./Plugins');
const lifeCycle = ['onProjectCreate', 'onGitInit'];
class Creator {
  constructor(name, templateName, context, plugins) {
    this.name = name;
    this.context = context;
    this.templateName = templateName;
    this.targetPath = path.join(process.cwd(), this.name || '.');
    this.templateCacheDirectory = path.join(os.homedir(), '.bsi-templates');
    this.injectedPrompts = [];
    this.promptCompleteCbs = [];

    // this.plugins = [];
    // 注册生命周期队列
    lifeCycle.forEach((i) => {
      this[`${i}Cbs`] = [];
    });
    const runCommand = (cmd) => runCmd(cmd, this.targetPath);
    const pluginsAPI = new PluginsAPI(this);
    plugins.forEach((m) => m(pluginsAPI, { logger, runCommand, logWithSpinner, stopSpinner }));
  }
  async create() {
    //获取插入的prompts
    const answers = await this.resolvePrompts();
    logWithSpinner(`✨`, `Creating project in ${chalk.yellow(this.name)}.`);
    const isExist = await fsUtils.isExist(this.templateName);
    if (isExist) {
      await this._localCopy();
    } else {
      await this._remoteCopy();
    }
    try {
      await fsUtils.remove(this.targetPath);
      const smith = () => {
        return new Promise((resolve, reject) => {
          Metalsmith(this.templateCacheDirectory)
            .clean(false)
            .ignore(function (file, stats) {
              if (/\/(nginx|node_modules)\//.test(file)) {
                return true;
              }
              return false;
            })
            .source('.')
            .destination(this.targetPath)
            .build((err, files) => {
              if (err) {
                console.log();
                logger.error(
                  'Local template synchronization failed, reason: "%s".',
                  err.message.trim()
                );
              }
              resolve();
            });
        });
      };
      await smith();
      // await fsUtils.copy(templateCacheDirectory, targetPath);
    } catch (err) {
      logger.error(err);
    }

    await this.resolveLifeCycles('onProjectCreate');
    const isPackageJsonExist = await globby('{package.json,**/package.json}', {
      cwd: this.targetPath,
    });

    const cwd = `${this.name}/${isPackageJsonExist}`.replace('/package.json', '');
    //初始化git
    logWithSpinner(`🗃`, `Initializing git repository...\n`);
    await runCmd('git init', cwd);

    // commit initial state
    let gitCommitFailed = false;
    await runCmd('git add -A', cwd);

    try {
      await runCmd('git', ['commit', '-m', 'init'], cwd);
    } catch (e) {
      gitCommitFailed = true;
    }

    await this.resolveLifeCycles('onGitInit');
    stopSpinner();

    logger.log(`📦  Installing additional dependencies...`);
    await runCmd('npm', ['install', '--loglevel', 'error'], cwd);

    // log instructions
    console.log();
    logger.log(`🎉  Successfully created project ${chalk.yellow(this.targetPath)}.`);
    logger.log(
      `👉  Get started with the following commands:\n\n` +
        (this.targetPath === process.cwd() ? `` : chalk.cyan(` ${chalk.gray('$')} cd ${cwd}\n`)) +
        chalk.cyan(` ${chalk.gray('$')} yarn serve\n`) +
        chalk.cyan(` ${chalk.gray('$')} or\n`) +
        chalk.cyan(` ${chalk.gray('$')} npm run serve\n`)
    );

    console.log();

    if (gitCommitFailed) {
      logger.warning('Git commit fail. You will need to perform the initial commit yourself.\n');
    }
  }
  async _localCopy() {
    let template = this.templateName;
    if (!path.isAbsolute(template)) {
      template = path.normalize(path.join(process.cwd(), template));
    }

    return new Promise((resolve, reject) => {
      Metalsmith(template)
        .clean(true)
        .source('.')
        .destination(this.templateCacheDirectory)
        .build((err, files) => {
          if (err) {
            console.log();
            logger.error(
              'Local template synchronization failed, reason: "%s".',
              err.message.trim()
            );
          }
          resolve();
        });
    });
  }
  async _remoteCopy() {
    await download(this.templateName, this.templateCacheDirectory, true);
  }
  resolvePrompts() {
    return inquirer.prompt(this.injectedPrompts);
  }
  /**
   *
   * @param {*} lifeCycle  onProjectCreated
   */
  async resolveLifeCycles(lifeCycle) {
    for (let i of this[`${lifeCycle}Cbs`]) {
      await i();
    }
  }
  // static registerPlugins(fn) {
  //   Creator._plugins.push(fn);
  // }
}
// Creator._plugins = [];
module.exports = Creator;
