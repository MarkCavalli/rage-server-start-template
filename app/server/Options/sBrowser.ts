 class Browser {
	constructor() {

    }
    
    showNotification(player: PlayerMp, text: string, theme?: string, time?: number, title?: string, img?: string) {
        let str = `app.addNotification({`;
        str += `text: "${text}",`;
        if (theme) str += `theme: "${theme}",`;
        if (time) str += `time: "${time}",`;
        if (title) str += `title: "${title}",`;
        if (img) str += `img: "${img}",`;
        str += `});`;
        this.pasteJs(player, str);
    }

    setLoadingScreenState(player: PlayerMp, state: boolean) {
        this.pasteJs(player, `app.showLoading(${state});`);
    }

	setUrl(player: PlayerMp, url: string, enableCursor: boolean) {
		player.call("cBrowser-SetUrl", [url, enableCursor]);
    }
    
    pasteJs(player: PlayerMp, data: string) {
        player.call("cBrowser-PasteJs", [data]);
    }

}
export default new Browser();