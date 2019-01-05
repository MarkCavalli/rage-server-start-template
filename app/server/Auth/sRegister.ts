import Auth from './sAuth';
import Mailer from '../Options/sNodemailer';
import DB from '../Options/sDB';
import Browser from '../Options/sBrowser';
import PlayerSingletone from '../Player/sPlayerSingletone';


class Register extends Auth {
    constructor() {
        super();
        mp.events.add({		
			"sRegister-SendCode" : (player: PlayerMp, email: string) => {
                this.trySendCode(player, email);
            },

            "sRegister-WrongCodeVerifyTry" : (player: PlayerMp, data: string) => {
                this.wrongCodeVerifyTry(player, data);
            },

            "sRegister-CheckName" : (player: PlayerMp, data: string) => {
                this.checkName(player, data);
            },

            "sRegister-CreateAccount" : (player: PlayerMp, data: string) => {
                this.tryToCreateAccount(player, data);
            },
		});

    }
    
    async trySendCode(player: PlayerMp, email: string) {
        if (!Mailer.isEmailValid(email)) {
            Browser.showNotification(player, `Please, check your email address!`, `red`, 4, `Wrong email address`, `error.svg`);
            return;
        }
        const d: any = await DB.query(`SELECT email FROM users WHERE email = '${email}' LIMIT 1`);
        if (d[0]) {
            Browser.showNotification(player, `This email already exists!`, `red`, 4, `Wrong email address`, `error.svg`);
            return;
        }
        const code = this.sendAndGetCode(player, email);
        this.setRegistrationCode(player, code);
    }

    async checkName(player: PlayerMp, obj: string) {
        const data = JSON.parse(obj);
        const d: any = await DB.query(`SELECT firstName, lastName FROM users WHERE firstName = '${data.firstName}' AND lastName = '${data.lastName}' LIMIT 1`);
        if (d[0]) {
            Browser.showNotification(player, `This name already exists!`, `red`, 4, `Error`, `error.svg`);
            return;
        }
        this.setRegistrationNameAvailable(player, true);
        Browser.showNotification(player, `You can use this name!`, `green`, 4, `Success`);
    }

    async tryToCreateAccount(player: PlayerMp, obj: string) {
        const data = JSON.parse(obj);
        const d: any = await DB.query(`SELECT email FROM users WHERE email = '${data.email}' LIMIT 1`);
        if (d[0]) {
            Browser.showNotification(player, `This email already exists!`, `red`, 4, `Wrong email address`, `error.svg`);
            return;
        }
        this.createAccount(player, data.email, data.firstName, data.lastName, data.password);
    }

    async createAccount(player: PlayerMp, email: string, firstName: string, lastName: string, password: string) {
        const pass = this.hashPassword(password);
        await PlayerSingletone.createUser(player, email, firstName, lastName, pass);
        const message = this.getRegisterMessage(email, firstName, lastName, password);
        Mailer.sendMail(message);
        Browser.showNotification(player, `Thank you for registration! Now you can log in`, `green`, 8, `Success`);
        this.setRegistrationCode(player, false);
    }

    getRegisterMessage(email: string, firstName: string, lastName: string, password: string) {
        const mail = {
            from: `${Mailer.getMailAddress()}`,
            to: `${email}`,
            subject: `Success registration.`,
            text: `Hello! Thank you for registration. Here is info about your account, in case you will forget it: FirstName: ${firstName} LastName: ${lastName} Password: ${password}`,
            html: ` <b>Hello!</b><br>
                    Thank you for registration.<br>
                    Here is info about your account, in case you will forget it:<br>
                    <b>FirstName:</b> ${firstName}<br>
                    <b>LastName:</b> ${lastName}<br>
                    <b>Password:</b> ${password}<br>`, 
        }
        return mail;
    }

    setRegistrationCode(player: PlayerMp, code: number | boolean) {
        Browser.pasteJs(player, `appData.views.Register.code = ${code};`);
    }

    setRegistrationNameAvailable(player: PlayerMp, status: boolean) {
        Browser.pasteJs(player, `appData.views.Register.nameAvailable = ${status};`);
    }

}
new Register();