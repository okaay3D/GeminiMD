import Prompt from './gemini-md-plugin-prompt.interface';

export default interface GeminiMDPluginSettings {
  apiKey: string;
  prompts: Prompt[];
}
