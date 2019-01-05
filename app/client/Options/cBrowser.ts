class BrowserSingletone {
	pathToBrowser: string;
	browser: any;

	constructor() {
		this.pathToBrowser = 'package://cef/index.html#';
		this.browser = mp.browsers.new(this.pathToBrowser);
		

		mp.events.add({
			"cBrowser-SetUrl" : (url: string, enableCursor: boolean) => {
				this.setUrl(url, enableCursor);
			},

			"cBrowser-PasteJs" : (data: string) => {
				this.pasteJS(data);
			},
		});
	}

	setUrl(url: string, enableCursor: boolean) {
		const path = `${this.pathToBrowser}${url}`;
		this.browser.url = path;
		this.setInteractState(enableCursor);
	}

	pasteJS(data: string) {
		this.browser.execute(data);
		this.browser.url = this.browser.url; // FIX! app.showLoading() dont work, if you are not in browser, or before not update browser path...
	}

	setInteractState(state: boolean) {
		mp.gui.cursor.visible = state;
		mp.game.ui.displayRadar(!state);
		mp.gui.chat.show(!state);
		mp.nametags.enabled = !state;
	}
}
new BrowserSingletone();