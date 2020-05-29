/**
 *
 */
import { QuestionCollection } from 'inquirer';
type Logger = {
  log(): void;
  warning(): void;
  error(): void;
  success(): void;
};

declare function RunCommand(cmd: string, args: string | string[], cwd?: string): Promise<void>;
type ToolsCollection = {
  logger?: Logger;
  runCommand?: typeof RunCommand;
  logWithSpinner?: (symbol: string, msg?: string) => void;
  stopSpinner?: () => void;
};
interface PluginsApi {
  injectPrompt(Prompt: QuestionCollection): void;
  onProjectCreate(cb: Promise<any>): void;
  onGitInit(cb: Promise<any>): void;
}
declare function pluginsCallback(api: PluginsApi, tools: ToolsCollection): Promise<void>;
export function run(templateName?: string): Promise<void>;
export function registerPlugins(cb: typeof pluginsCallback): void;
