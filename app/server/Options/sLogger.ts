import * as winston from 'winston';


class Logger {
	consoleLogger: any;
	fileLogger: any;

	level: string;

	constructor() {
		this.level = 'debug';

		this.consoleLogger = winston.createLogger({
			level: this.level,
			format: winston.format.combine(
				winston.format.colorize({ all: true }),
				winston.format.timestamp({ format: 'HH:mm:ss.SSS YYYY-MM-DD', }),
				winston.format.printf(info => `[${info.timestamp}][${info.level}]: ${info.message}`)
			),
			transports: [
			  	new winston.transports.Console(),
			],
		});

		this.fileLogger = winston.createLogger({
			level: this.level,
			format: winston.format.combine(
				winston.format.timestamp({ format: 'HH:mm:ss.SSS YYYY-MM-DD', }),
				winston.format.printf(info => `[${info.timestamp}][${info.level}]: ${info.message}`)
			),
			transports: [
			  	new winston.transports.File({ filename: 'logs.log' })
			],
		});
	}

	log(level: string, text: string) {
		this.consoleLogger.log(level, text);
		this.fileLogger.log(level, text);
	}

	silly(text: string) {
		return this.log('silly', text);
	}

	debug(text: string) {
		return this.log('debug', text);
	}

	verbose(text: string) {
		return this.log('verbose', text);
	}

	info(text: string) {
		return this.log('info', text);
	}

	warn(text: string) {
		return this.log('warn', text);
	}

	error(text: string) {
		return this.log('error', text);
	}

}
export default new Logger();