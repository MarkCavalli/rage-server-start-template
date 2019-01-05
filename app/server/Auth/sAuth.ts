import * as crypto from 'crypto';
import Misc from '../Options/sMisc';
import Mailer from '../Options/sNodemailer';
import Browser from '../Options/sBrowser';
import Logger from '../Options/sLogger';


export default class Auth {
    constructor() {

    }

    wrongCodeVerifyTry(player: PlayerMp, data: string) {
        const tries = JSON.parse(data).tries;
        Logger.warn(`${player.socialClub} entered wrong auth code. Total tries: ${tries}`);
    }

    sendAndGetCode(player: PlayerMp, email: string) {
        const code = Misc.getRandomInt(100, 999);
        const message = this.getVerificationCodeMessage(email, code);
        Mailer.sendMail(message);
        Browser.showNotification(player, `Check your mailbox!`, `green`, 5, `Success`);
        Logger.debug(`${player.name} [${player.socialClub}] sended code to ${email}`);
        return code;
    }

    getVerificationCodeMessage(email: string, code: number) {
        const mail = {
            from: `${Mailer.getMailAddress()}`,
            to: `${email}`,
            subject: `Verification code: ${code}`,
            text: `Hello! Your verification code is: ${code}`,
            html: `<b>Hello!</b><br>Your verification code is: ${code}`,
        }
        return mail;
    }

    hashPassword(pass: string) {
        const cipher = crypto.createCipher('aes256', 'a pass');
        let encrypted = cipher.update(pass, 'utf8', 'hex'); 
        encrypted += cipher.final('hex');
        return encrypted;
    }

}