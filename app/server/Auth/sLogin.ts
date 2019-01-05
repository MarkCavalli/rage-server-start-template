/// <reference path="../index.d.ts" />

import Auth from './sAuth';
import Browser from '../Options/sBrowser';
import Camera from '../Options/sCamera';
import Logger from '../Options/sLogger';
import DB from '../Options/sDB';
import Mailer from '../Options/sNodemailer';
import PlayerSingletone from '../Player/sPlayerSingletone';



class Login extends Auth {
    loginScreenPlayerPos: Vector3Mp;
    camPos1: Vector3Mp;
    camPos2: Vector3Mp;
    camViewangle: number;

    constructor() {
        super();
        this.loginScreenPlayerPos = new mp.Vector3(3294, 5216, 17);
        this.camPos1 = new mp.Vector3(3331.6, 5222.5, 23);
        this.camPos2 = new mp.Vector3(0, 0, 212);
        this.camViewangle = 55;


        mp.events.add({		
			"playerReady" : (player: PlayerMp) => {
                this.playerReady(player);
            },

            "sLogin-Login" : (player: PlayerMp, data: string) => {
                this.login(player, data);
            },

            "sLogin-SendCode" : (player: PlayerMp, email: string) => {
                this.trySendCode(player, email);
            },

            "sLogin-WrongCodeVerifyTry" : (player: PlayerMp, data: string) => {
                this.wrongCodeVerifyTry(player, data);
            },

            "sLogin-LoginWithSuccessCode" : (player: PlayerMp, data: string) => {
                this.loginWithSuccessCode(player, data);
            },
		
			
		});
    }

    playerReady(player: PlayerMp) {
        Camera.createCamera(player, this.camPos1, this.camPos2, this.camViewangle);
        player.spawn(this.loginScreenPlayerPos);
        player.dimension = 0;
        Browser.setUrl(player, '/login', true);
        Logger.debug(`${player.name} connected`);
    }

    async login(player: PlayerMp, data: string) {
        const obj = JSON.parse(data);
        const pass = this.hashPassword(obj.password);
        const d: any = await DB.query(`SELECT guid, email, password, socialclub FROM users WHERE email = '${obj.email}' LIMIT 1`);
        if (!d[0]) {
            Browser.showNotification(player, `This email doesn't exists!`, `red`, 4, `Wrong email address`, `error.svg`);
            Logger.warn(`${player.name} | ${player.socialClub} | ${player.ip} entered wrong email! Email: ${obj.email}`);
            return;
        }
        if (d[0].socialclub !== player.socialClub) {
            this.setShowRegistrationCode(player, true);
            return;
        }
        this.checkPasswordAndTryLoadAccount(player, d[0].guid, obj.email, d[0].password, pass);
    }

    setRegistrationCode(player: PlayerMp, code: number | boolean) {
        Browser.pasteJs(player, `appData.views.Login.code = ${code};`);
    }

    setShowRegistrationCode(player: PlayerMp, status: boolean) {
        Browser.pasteJs(player, `appData.views.Login.showCode = ${status};`);
    }

    isAlreadyPlaying(email: string) {
        for (const player of mp.players.toArray()) {
            if (!player.loggedIn) continue;
            if (player.email === email) return true;
        }
        return false;
    }

    async trySendCode(player: PlayerMp, email: string) {
        if (!Mailer.isEmailValid(email)) {
            Browser.showNotification(player, `Please, check your email address!`, `red`, 4, `Wrong email address`, `error.svg`);
            return;
        }
        const code = this.sendAndGetCode(player, email);
        this.setRegistrationCode(player, code);
    }

    async loginWithSuccessCode(player: PlayerMp, data: string) {
        const obj = JSON.parse(data);
        const pass = this.hashPassword(obj.password);
        const d: any = await DB.query(`SELECT guid, email, password FROM users WHERE email = '${obj.email}' LIMIT 1`);
        this.checkPasswordAndTryLoadAccount(player, d[0].guid, obj.email, d[0].password, pass);
    }

    checkPasswordAndTryLoadAccount(player: PlayerMp, guid: number, email:string, password1: string, password2: string) {
        if (password1 !== password2) {
            Browser.showNotification(player, `Wrong password`, `red`, 4, `Error`, `error.svg`);
            Logger.warn(`${player.name} | ${player.socialClub} | ${player.ip} entered wrong password! Email: ${email}`);
            return;
        }
        if (this.isAlreadyPlaying(email)) {
            Browser.showNotification(player, `This user already playing now!`, `red`, 4, `Error`, `error.svg`);
            Logger.warn(`${player.name} | ${player.socialClub} | ${player.ip} tried to log in from another PC! Email: ${email}`);
            return;
        }
        this.loadAccount(player, guid);
    }

    loadAccount(player: PlayerMp, guid: number) {
        Browser.setLoadingScreenState(player, true);
        this.setRegistrationCode(player, false);
        this.setShowRegistrationCode(player, false);
        Browser.setUrl(player, '/', false);
        Camera.resetCamera(player);
        PlayerSingletone.loadAccount(player, guid);
    }

}
new Login();