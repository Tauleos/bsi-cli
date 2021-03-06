const chalk = require('chalk');
const format = require('util').format;
const prefix = `   ${process.env.CLI_NAME || 'bsi'}-cli`;
const sep = chalk.gray('·');

exports.log = function () {
  const msg = format.apply(format, arguments);
  console.log(chalk.white(prefix), sep, msg);
};

exports.warning = function () {
  const msg = format.apply(format, arguments);
  console.log(chalk.yellow(prefix), sep, msg);
};

exports.error = function (err) {
  if (err instanceof Error) err = err.message.trim();
  const msg = format.apply(format, arguments);
  console.error(chalk.red(prefix), sep, msg);
  process.exit(1);
};

exports.success = function () {
  const msg = format.apply(format, arguments);
  console.log(chalk.green(prefix), sep, msg);
};
