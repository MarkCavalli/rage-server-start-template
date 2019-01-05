import * as mysql from 'mysql';
import Logger from './sLogger';



class Database {
	connection: any;

	constructor() {
		this.connection =  mysql.createPool({
			host			:	"localhost",
			user			: 	"root",
			password		: 	"",
			database		:	"v8server",
		});

		this.checkConnection();
	}

	checkConnection() {
		this.connection.getConnection((e: any) => {
			if (e) 	{
				Logger.error(`MYSQL SERVER NOT WORKING!`);
				throw e;
			}
			else {
				Logger.info(`MYSQL SERVER READY!`);
			}
		});
	}

	try(query: string) {
		return new Promise((r, j) => this.connection.query(query, null , (err: any, data: any) => {
			if (err) {
				Logger.error(query);
				return j(err);
			}
			r(data);
		}))
	}

	async query(query: string) {
		const start = new Date().getTime(); 
		const data = await this.try(query);
		const time = new Date().getTime() - start;
		if (time >= 500) Logger.warn(`'${query}' ends with: ${time / 1000}s`);
		else Logger.silly(`'${query}' ends with: ${time / 1000}s`);
		return data;
	}

}
const a = new Database();
export default a;


