import {PluginSettingTab, App, Setting} from 'obsidian';
import GeminiMDPlugin from '../main';

export default class GeminiMDSettingTab extends PluginSettingTab {
  plugin: GeminiMDPlugin;

  constructor(app: App, plugin: GeminiMDPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Gemini API Key')
      .setDesc('Bring your own Gemini API key to use the plugin.')
      .addText(text =>
        text
          .setPlaceholder('API Key')
          .setValue(this.plugin.settings.apiKey)
          .onChange(async value => {
            this.plugin.settings.apiKey = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
