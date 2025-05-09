import {Notice, SuggestModal} from 'obsidian';
import Prompt from './gemini-md-plugin-prompt.interface';
import GeminiMDPlugin from '../main';

export default class GeminiMDPluginSuggestionModal extends SuggestModal<Prompt> {
  private plugin: GeminiMDPlugin;

  constructor(plugin: GeminiMDPlugin) {
    super(plugin.app);
    this.plugin = plugin;
  }

  getSuggestions(query: string): Prompt[] {
    return this.plugin.settings.prompts.filter(prompt =>
      prompt.displayName.toLowerCase().includes(query.toLowerCase()),
    );
  }
  renderSuggestion(value: Prompt, el: HTMLElement): void {
    el.createEl('div', {text: value.displayName});
    el.createEl('small', {text: value.model});
  }
  onChooseSuggestion(item: Prompt): void {
    new Notice(`Selected: ${item.displayName}`);
  }
}
