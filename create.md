# create a new Cli with Abstract Cli

## Install

```
npm install  bsi-cli
```

## Usage

```js
const { run, registerPlugins } = require('bsi-cli');
registerPlugins(async function (api, { logger, runCommand, logWithSpinner, fsUtils }) {
  api.onGitInit();
  api.injectPrompt();
});

return run(appName, templateName);
```

## API

### **run**

```js
run(appName, templateName);
```

#### Props

- **appName** : the name which will be created by yourself CLI
- **templateName**: the template which will be used by yourself CLI

### registerPlugins

```js
registerPlugins(function callback() {});
```

#### **callback** props1

- **api**: the plugin container api
  - **injectPrompt**：custom your prompts in terminal.
  - **onProjectCreate**: hooks api after project files has created.
  - **onGitInit**: hooks api after git info has been initialized.
  - **customDownload**: custom your download behavior
- tools: the tools used in the abstract CLI which maybe used in yourself CLI
  - **logger**
  - **runCommand**
  - **logWithSpinner**
  - **stopSpinner**
  - **fsUtils**
