module.exports = class PromptPluginsAPI {
  constructor(creator) {
    this.creator = creator;
  }
  injectPrompt(prompt) {
    this.creator.injectedPrompts.push(prompt);
  }

  onPromptComplete(cb) {
    this.creator.promptCompleteCbs.push(cb);
  }
};
