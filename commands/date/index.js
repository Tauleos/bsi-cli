const chalk = require('chalk');
const inquirer = require('inquirer');

function format(number) {
  number.length === 10 && (number = number * 1000);
  number = +number;
  const date = new Date(number);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, 0)} ${String(date.getHours()).padStart(2, 0)}:${String(date.getMinutes())}:${String(
    date.getSeconds()
  )}`;
}

function validateInput(input) {
  const isTimeStamps = /^\d+$/.test(input);
  if (isTimeStamps) {
    console.log(`输入的时间戳对应的时间为    ${chalk.cyan(format(input))}`);
  } else {
    console.log(`输入的时间对应的时间戳为   ${chalk.cyan(new Date(input).valueOf())}`);
  }
  process.exit(-1);
}

function evaluateData(time) {
  if (time) {
    validateInput(time);
  } else {
    async function getAnswer() {
      return await inquirer.prompt([
        {
          type: 'input',
          name: 'timeStr',
          message: chalk.red('What time do you want?'),
          prefix: '🦄',
        },
      ]);
    }

    getAnswer().then(({ timeStr }) => {
      validateInput(timeStr);
    });
  }
}

module.exports = evaluateData;
