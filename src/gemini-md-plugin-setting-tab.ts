import {PluginSettingTab, App, Setting} from 'obsidian';
import GeminiMDPlugin from '../main';
import GeminiMDPluginPromptSettingModal from './gemini-md-plugin-prompt-setting.modal';
import Prompt from './gemini-md-plugin-prompt.interface';

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

    new Setting(containerEl)
      .setHeading()
      .setName('Prompts')
      .setDesc('Configure your prompts for Gemini.')
      .addExtraButton(button => {
        /* button.setIcon('plus');
        button.setTooltip('Add Prompt');
        button.onClick(() => {
          this.plugin.settings.prompts.push({
            displayName: 'New Prompt',
            prompt: '',
            model: 'gemini',
          });
          this.display();
        });*/
        button.setIcon('plus');
        button.setTooltip('Add Prompt');
        button.onClick(() => {
          new GeminiMDPluginPromptSettingModal(
            this.app,
            async (prompt: Prompt) => {
              this.plugin.settings.prompts.push(prompt);
              await this.plugin.saveSettings();
              this.display();
            },
          ).open();
        });
      });

    this.plugin.settings.prompts.forEach((prompt, index) => {
      new Setting(containerEl)
        .setName(prompt.displayName)
        .addTextArea(text =>
          text
            .setPlaceholder('Prompt')
            .setValue(prompt.prompt)
            .onChange(async value => {
              this.plugin.settings.prompts[index].prompt = value;
              await this.plugin.saveSettings();
            }),
        )
        .addExtraButton(button => {
          button.setIcon('cross');
          button.setTooltip('Delete Prompt');
          button.onClick(async () => {
            this.plugin.settings.prompts.splice(index, 1);
            await this.plugin.saveSettings();
            this.display();
          });
        });
    });
  }
}
