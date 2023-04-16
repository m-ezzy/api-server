import { Connection, createConnection, MysqlError } from 'mysql'

// import configs from './configs'

// import { databaseConnectionOptions } from './configs'

export let errors: any = []

const connect = async () => new Promise<Connection>((resolve, reject) => {
	// when deploying on google cloud
	// socketPath: '/cloudsql/my-project-12345:us-central1:mydatabase',

	const connection: Connection = createConnection({
		// socketPath: hostname,
		host: process.env.DB_HOSTNAME,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	})
	connection.connect((error: MysqlError) => {
		if (error) {
			errors.push(99999, process.env, process.env.DB_HOSTNAME)
			errors.push(66666, error)
			console.log(66666, error.code)
      reject(error)
    } else {
			errors.push(11111, connection)
			console.log(11111, connection.state)
			resolve(connection)
		}
  })
})
const query = async (query: string) => new Promise(async (resolve, reject) => {
	const connection: any = await connect()

	// console.log(22222, connection)

	connection.query(query, connection, (error: MysqlError, rows: any) => {
		if (error) {
			errors.push(33333, error)
			console.log(33333, error)
			console.error(55555, error.code)
			reject(error)
		} else {
			errors.push(44444, rows)
			console.log(44444, rows)
			// Object.entries(rows).forEach(([key, value]) => console.log(44444, key))
			resolve(JSON.parse(JSON.stringify(rows)))
		}
		connection.end()
	})
})

export { query }
