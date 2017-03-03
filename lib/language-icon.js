'use babel';

import LanguageIconView from './language-icon-view';
import { CompositeDisposable } from 'atom';

export default {

  languageIconView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageIconView = new LanguageIconView(state.languageIconViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageIconView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-icon:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageIconView.destroy();
  },

  serialize() {
    return {
      languageIconViewState: this.languageIconView.serialize()
    };
  },

  toggle() {
    console.log('LanguageIcon was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
