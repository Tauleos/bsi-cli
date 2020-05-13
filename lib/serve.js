const serve = require('serve-handler');
const url = require('url');
const chalk = require('chalk');
const os = require('os');
const path = require('path');
const http = require('http');
const portfinder = require('portfinder');

function parseUrl(hostname, port, bold = true, pathname = '/') {
  return url.format({
    protocol: 'http',
    hostname,
    port: bold ? chalk.bold(port) : port,
    pathname,
  });
}
function getIp() {
  const interfaces = os.networkInterfaces();
  for (const key of Object.keys(interfaces)) {
    for (const i of interfaces[key]) {
      if (i.family === 'IPv4' && !i.internal) {
        return i.address;
      }
    }
  }
}
function getPort(port) {
  return portfinder.getPortPromise({ port });
}

module.exports = async function run(dirName, { port }) {
  port = await getPort(port);
  const app = http.createServer((req, res) => {
    return serve(req, res, {
      public: dirName,
    });
  });
  app.listen(port, () => {
    console.log();
    console.log(' 🎉 App running at:');
    console.log(`  - Local:   ${chalk.cyan(parseUrl('localhost', port))}`);
    console.log(`  - Network: ${chalk.cyan(parseUrl(getIp(), port))}`);
    // if (open) {
    // await browser(parseUrl('localhost', serverPort, false));
    // }
  });
};
