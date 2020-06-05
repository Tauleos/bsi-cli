const chalk = require('chalk');
const path = require('path');
// const ejs = require('ejs');
const fsUtils = require('../../utils/fileRunner');
const inquirer = require('inquirer');
const os = require('os');
const download = require('../../utils/download');
const logger = require('../../utils/logger');
const { logWithSpinner, stopSpinner } = require('../../utils/spinner');
const runCmd = require('../../utils/run');
const globby = require('globby');
const { PluginsAPI } = require('./Plugins');
const lifeCycle = ['onProjectCreate', 'onGitInit'];
const cliName = process.env.CLI_NAME || 'bsi';
class Creator {
  constructor(name, templateName, context, plugins) {
    this.name = name;
    this.context = context;
    this.templateName = templateName;
    this.targetPath = path.join(process.cwd(), this.name || '.');
    this.templateCacheDirectory = path.join(os.homedir(), `.${cliName}-templates`);
    this.injectedPrompts = [];
    this.promptCompleteCbs = [];
    this.downloadFn = null;

    // this.plugins = [];
    // 注册生命周期队列
    lifeCycle.forEach((i) => {
      this[`${i}Cbs`] = [];
    });
    const runCommand = (cmd, opts) => runCmd(cmd, { cwd: this.targetPath, ...opts });
    const pluginsAPI = new PluginsAPI(this);
    plugins.forEach((m) =>
      m(pluginsAPI, { logger, runCommand, logWithSpinner, stopSpinner, fsUtils })
    );
  }
  async create() {
    //获取插入的prompts
    const answers = await this.resolvePrompts();

    logWithSpinner(`✨`, `Creating project in ${chalk.yellow(this.name)}.`);

    //清空模板缓存文件夹
    await fsUtils.emptyDir(this.templateCacheDirectory);
    await this.resolveDownload();
    // try {
    await fsUtils.remove(this.targetPath);
    await fsUtils.copyTemplate(this.templateCacheDirectory, this.targetPath, {
      data: answers,
    });

    await this.resolveLifeCycles('onProjectCreate');

    //初始化git
    logWithSpinner(`🗃`, `Initializing git repository...`);
    await runCmd('git init', { cwd: this.targetPath });

    // commit initial state
    let gitCommitFailed = false;
    await runCmd('git add -A', { cwd: this.targetPath });

    try {
      await runCmd('git', ['commit', '-m', 'init'], { cwd: this.targetPath });
    } catch (e) {
      gitCommitFailed = true;
    }

    await this.resolveLifeCycles('onGitInit');
    stopSpinner();

    const isPackageJsonExist = await globby('{package.json,**/package.json}', {
      cwd: this.targetPath,
      gitignore: true,
    });

    const cwd = `${this.name}/${isPackageJsonExist}`.replace('/package.json', '');
    logger.log(`📦  Installing additional dependencies...`);
    await runCmd('npm', ['install', '--loglevel', 'error'], { cwd });

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

  async resolveDownload() {
    if (this.downloadFn) {
      await this.downloadFn(this.templateCacheDirectory);

      const isExist = await fsUtils.isExist(this.templateCacheDirectory);

      if (!isExist) {
        throw Error('customDownload function do not download template Successfully!!');
      }
      return;
    }
    const isExist = await fsUtils.isExist(this.templateName);
    if (isExist) {
      await this._localCopy();
    } else {
      await this._remoteCopy();
    }
  }
  async _localCopy() {
    let template = this.templateName;
    if (!path.isAbsolute(template)) {
      template = path.normalize(path.join(process.cwd(), template));
    }

    await fsUtils.copy(template, this.templateCacheDirectory);
  }
  async _remoteCopy() {
    await download(this.templateName, this.templateCacheDirectory, true);
  }
  async resolvePrompts() {
    const base = this.injectedPrompts.reduce((pre, cur) => {
      pre[cur.name] = undefined;
      return pre;
    }, {});
    const data = await inquirer.prompt(this.injectedPrompts);
    return { ...base, ...data };
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
