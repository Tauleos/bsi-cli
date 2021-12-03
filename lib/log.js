const chalk = require('chalk');
const path = require('path');
module.exports = (filePath, opts) => {
  console.log('aaa', path.extname(filePath), opts);
  let data;
  if (path.extname(filePath) === '.json') {
    data = require(filePath);
  }
  const rec = (_data, depth) =>
    _data.map((item) => {
      const [name, desc, children] = item;
      return {
        name,
        desc,
        level: depth,
        children: children && rec(children, depth + 1),
      };
    });

  const dataMap = rec(data, 0);
  const tree = printData(dataMap, opts.level);
  console.log(tree);
};

const printData = (data, finalLevel) => {
  let log = '';
  console.log(data);

  data.forEach((node, index) => {
    log += printLine({ node, isLast: data.length - 1 === index });
    console.log(node.level, finalLevel);

    if (node.level <= finalLevel && node.children) {
      log += printData(node.children, finalLevel);
    }
  });

  return log;
};
const printLine = ({ node, isLast }) => {
  let left = '';
  let time = node.level;
  while (time) {
    left += '│   ';
    time--;
  }
  let output =
    left + `${isLast ? '└' : '├'}── ${coloredName(node.name)}    ${chalk.blueBright(node.desc)}\n`;
  if (isLast) {
    output += left + '\n';
  }
  return output;
};
const coloredName = (name) => {
  if (/^\w+$/.test(name)) {
    return chalk.cyan(name);
  }
  return chalk.white(name);
};
