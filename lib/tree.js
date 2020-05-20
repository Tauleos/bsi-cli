const mockData = [
  ['public', 'index.html的模板'],
  [
    'src',
    '源码相关 ',
    [
      ['api', '网络请求相关api'],

      ['common', '项目里公用的一些功能性逻辑', [['eventBus.js', 'vue需要的eventBus']]],
      ['assets', '用到的素材'],
    ],
  ],
];

module.exports = (data) => {
  const rec = (_data, depth) =>
    _data.map((item) => {
      const [name, desc, children] = item;
      return {
        name,
        desc,
        level: depth,
        children: children && rec(children, ++depth),
      };
    });

  const dataMap = rec(mockData, 1);
  console.log(dataMap);
  printData(dataMap);
};

const printData = (data) => {
  for (const i of data) {
    printLine(i);
  }
};
const printLine = ({ node, isLast }) => {};
