import { Connection, createConnection, MysqlError } from 'mysql'

const connect = async () => new Promise<Connection>((resolve, reject) => {
	/*
	let hostname: string = 'localhost'
	let port: number = 3306
	let username: string = 'root'
	let password: string = ''
	let dbname: string = 'raven'
	*/

	let hostname: string = 'database-2.cbhtnajgxbkj.ap-south-1.rds.amazonaws.com'
	let port: number = 3306
	let username: string = 'admin'
	let password: string = '123456789'
	let dbname: string = 'database-2'

	const connection: Connection = createConnection({
		host: hostname,
		port: port,
		user: username,
		password: password,
		database: dbname
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
