import {MarkdownView, Plugin} from 'obsidian';
import GeminiMDSettingTab from './src/gemini-md-plugin-setting-tab';
import GeminiMDPluginSettings from './src/gemini-md-plugin-settings.interface';

const DEFAULT_SETTINGS: GeminiMDPluginSettings = {
  apiKey: 'your-api-key',
};

export default class GeminiMDPlugin extends Plugin {
  settings: GeminiMDPluginSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: 'open-sample-modal-complex',
      name: 'Open sample modal (complex)',
      checkCallback: (checking: boolean) => {
        // Conditions to check
        const markdownView =
          this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          // If checking is true, we're simply "checking" if the command can be run.
          // If checking is false, then we want to actually perform the operation.
          if (!checking) {
            console.log('complex command');
          }

          // This command will only show up in Command Palette when the check function returns true
          return true;
        }
        return false;
      },
    });

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new GeminiMDSettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
