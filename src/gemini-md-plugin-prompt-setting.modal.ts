import {App, Modal, Setting} from 'obsidian';
import Prompt from './gemini-md-plugin-prompt.interface';

export default class GeminiMDPluginPromptSettingModal extends Modal {
  onSubmit: (prompt: Prompt) => void;

  constructor(app: App, onSubmit: (prompt: Prompt) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  async onOpen(): Promise<void> {
    const {contentEl, titleEl} = this;
    let displayName = '';
    let prompt = '';
    let model = 'gemini-pro';

    contentEl.empty();

    titleEl.setText('Add New Prompt');

    new Setting(contentEl)
      .setName('Display Name')
      .setDesc('The name of the prompt.')
      .addText(text =>
        text
          .setPlaceholder('Display Name')
          .setValue(displayName)
          .onChange(value => {
            displayName = value;
          }),
      );

    new Setting(contentEl)
      .setName('Model')
      .setDesc('The model to use for the prompt.')
      .addText(text =>
        text
          .setPlaceholder('Model')
          .setValue(model)
          .onChange(value => {
            model = value;
          }),
      );

    new Setting(contentEl)
      .setName('Prompt')
      .setDesc('The prompt to send to Gemini.')
      .addTextArea(text =>
        text
          .setPlaceholder('Prompt')
          .setValue(prompt)
          .onChange(value => {
            prompt = value;
          }),
      );

    new Setting(contentEl).addButton(button => {
      button.setButtonText('Save');
      button.setCta();
      button.onClick(() => {
        this.close();
        this.onSubmit({displayName, prompt, model});
      });
    });
  }
}
