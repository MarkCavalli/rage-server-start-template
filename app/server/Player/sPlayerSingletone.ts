/// <reference path="../index.d.ts" />

import DB from '../Options/sDB';
import Logger from '../Options/sLogger';
import PlayerLoader from './sPlayerLoader';
import Browser from '../Options/sBrowser';


class PlayerSingletone {
    startCoord: EntityCoord;

    constructor() {
        this.startCoord = {
            pos: new mp.Vector3(-2166.795, 5197.364, 16.88),
            rot: 120,
            dim: 0,
        }
    }

    async createUser(player: PlayerMp, email: string, firstName: string, lastName: string, password: string) {
        const pos: string = JSON.stringify(this.startCoord);
        const socialClub: string = player.socialClub;
        await DB.query(`INSERT INTO users (email, firstName, lastName, socialclub, position, password) VALUES ('${email}', '${firstName}', '${lastName}', '${socialClub}', '${pos}', '${password}')`);
        Logger.debug(`New Account: ${email} | ${firstName} ${lastName} | ${socialClub}`);
    }

    async loadAccount(player: PlayerMp, guid: number) {
        const d: any = await DB.query(`SELECT * from users WHERE guid = '${guid}' LIMIT 1`);
        player.guid = guid;
        player.email = d[0].email;
        player.firstName = d[0].firstName;
        player.lastName = d[0].lastName;
        player.adminlvl = d[0].adminlvl;
        player.lang = d[0].lang;

        new PlayerLoader(player);

        setTimeout(() => {
            player.teleport(JSON.parse(d[0].position));
        }, 500);
        setTimeout(() => {
            Browser.setLoadingScreenState(player, false);
        }, 1000); 


        player.loggedIn = true;
    }
}
export default new PlayerSingletone();