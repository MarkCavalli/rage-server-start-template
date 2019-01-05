import * as nodemailer from 'nodemailer';
import Logger from './sLogger';


class MailerSingletone {
	user: string;
	password: string;
	emailTitle: string;
	transporter: any;

    constructor() {
		this.user = 'yourmail@gmail.com';
		this.password = 'password';
		this.emailTitle = 'Email title';

		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: { user: this.user, pass: this.password },
		});

		this.checkConnection();
	}
	
	checkConnection() {
		this.transporter.verify((error: any, success: any) => {
			if (error) Logger.error(error); 
			else Logger.info('EMAIL SERVER READY!');
		});
	}
    
    getMailAddress() {
		return `${this.emailTitle} <${this.user}>`;
    }

    isEmailValid(email: string) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return re.test(email);
    }

    sendMail(message: object) {
        this.transporter.sendMail(message, (err: any, info: any) => {
            if (err) {
                Logger.error(`Error occurred. ${err.message}`);
                return process.exit(1);
            }
        });
    }

}
export default new MailerSingletone();
