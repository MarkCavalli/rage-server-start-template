class BrowserSingletone {
	browser: BrowserMp;

	constructor() {
		this.browser = mp.browsers.new('package://cef/index.html#');
		

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
		const path = `app.$router.push('${url}');`;
		this.setInteractState(enableCursor);
		this.pasteJS(path);
	}

	pasteJS(data: string) {
		this.browser.execute(data);
	}

	setInteractState(state: boolean) {
		mp.gui.cursor.visible = state;
		mp.game.ui.displayRadar(!state);
		mp.gui.chat.show(!state);
		mp.nametags.enabled = !state;
	}
}
new BrowserSingletone();
