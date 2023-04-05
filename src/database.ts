import { Connection, createConnection, MysqlError } from 'mysql'

import configs from './configs'

// import { databaseConnectionOptions } from './configs'

const connect = async () => new Promise<Connection>((resolve, reject) => {
	let hostname: string = configs.database.hostname
	let port: number = configs.database.port
	let username: string = configs.database.username
	let password: string = configs.database.password
	let dbname: string = configs.database.dbname
	
	const connection: Connection = createConnection({
		socketPath: hostname,
		host: hostname,
		port: port,
		user: username,
		password: password,
		database: dbname,
	})
	connection.connect((error: MysqlError) => {
		if (error) {
			console.log(66666, error.code)
      reject(error)
    } else {
			console.log(11111, connection.state)
			resolve(connection)
		}
  })
})
const query = async (query: string) => new Promise(async (resolve, reject) => {
	try {
		const connection: any = await connect()

		// console.log(22222, connection)

		connection.query(query, connection, (error: MysqlError, rows: any) => {
			if (error) {
				console.log(33333, error)
				reject(error)
			} else {
				console.log(44444, rows)
				resolve(JSON.parse(JSON.stringify(rows)))
			}
			connection.end()
		})
	} catch(error: any) {
		console.error(55555, error.code)
	}
})

export { query }
