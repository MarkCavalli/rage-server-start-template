class Options {
    constructor() {
        mp.events.add({		
			"cMisc-CallServerEvent" : (event: string, data: string) => {
                mp.events.callRemote(event, data);
            },
		
			"cMisc-CallServerEventWithTimeout" : (event: string, timeout: number, data: string) => {
				setTimeout(() => {
					mp.events.callRemote(event, data);
				}, timeout);
			},
		
			
		});
    }


}
export default new Options();