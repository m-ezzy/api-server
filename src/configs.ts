//development
const dev = {
	database: {
		protocol: "http",
		hostname: "localhost",
		port: 3306,
		username: "root",
		password: "",
		dbname: "raven",
	},
	apiServer: {
		protocol: "http",
		hostname: "localhost",
		port: 8000,
		path: "/api",
	},
	socketServer: {
		protocol: "http", //http //https //ws //wss //window.location.protocol
		hostname: "localhost", //localhost //window.location.hostname
		port: 7000, //5173 //8000 //8001 //7000 //window.location.port
		path: "", //'' //'/socket' //'/conv'
	},
	peerServer: {
		protocol: "http",
		hostname: "localhost",
		port: 9000, //80 //443 //8000
		path: "/peer",
		PREFIX: 'raven-', //murtaza-raven- //''
	},
	client: {
		protocol: "http",
		hostname: "localhost",
		port: 5173,
		path: "/",
	}
}

//production //distribution //build
const pro = {
	database: {
		protocol: "https",
		hostname: 'database-2.cbhtnajgxbkj.ap-south-1.rds.amazonaws.com',
		port: 3306,
		username: "admin",
		password: "123456789",
		dbname: 'raven',
	},
	apiServer: {
		protocol: "https",
		hostname: "642d7da021493d3b6b909b1b--raven-social.netlify.app",
		port: 443,
		path: "/",
	},
	client: {
		protocol: "http",
		hostname: "localhost",
		port: 5173,
		path: "/",
	}
}

// const { database, apiServer } = dev
// export { database, apiServer }

export const NODE_ENV = 'pro'

export default pro //NODE_ENV //pro
