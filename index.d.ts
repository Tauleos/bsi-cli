import { QuestionCollection } from 'inquirer';
import fse from 'fs-extra';
import { Command } from 'commander';
type Logger = {
  log(): void;
  warning(): void;
  error(): void;
  success(): void;
};

declare interface fsUtils extends fse {
  isExist(): Promise<Boolean>;
}

declare function RunCommand(
  cmd: string,
  args: string | string[],
  opts?: SpawnOptionsWithoutStdio
): Promise<void>;
type ToolsCollection = {
  logger?: Logger;
  runCommand?: typeof RunCommand;
  logWithSpinner?: (symbol: string, msg?: string) => void;
  stopSpinner?: () => void;
  fsUtils?: fsUtils;
};
interface PluginsApi {
  injectPrompt(Prompt: QuestionCollection): void;
  onProjectCreate(cb: Promise<any>): void;
  onGitInit(cb: Promise<any>): void;
  customDownload(fn: Promise<void>): void;
}
declare function pluginsCallback(api: PluginsApi, tools: ToolsCollection): Promise<void>;
export function run(appName: string, templateName?: string, cmd?: Command): Promise<void>;
export function registerPlugins(cb: typeof pluginsCallback): void;
