import { Server } from 'socket.io'
import configurations from '../configurations.mjs'
let { port } = configurations.socket_server

import chats from './chats.js'
import groups from './groups.js'
import channels from './channels.js'

// export default (httpServer) => {

let online = {
	def: {},
	chats: {}
}

export const io = new Server(port, { //8001 //7000
// const io = new Server(httpServer, {
	cors: {
    // origin: ["http://localhost:5173"],
		origin: '*',
		methods: '*',
    allowedHeaders: "*",
    credentials: true,
  },
	// cors: "*",
	// serveClient: true,
	// path: '', //socket //conv
})

io.use((socket, next) => {
	console.log(socket.id)
	next()
})

// Whenever someone connects this gets executed
// default
// equivalent to io.of('/').on('connection', () => {})
io.on('connection', function(socket) {
	socket.use(on_every_request)

	console.log('socket handshake auth user_id : ', socket.handshake.auth.user_id)
	online.def[socket.handshake.auth.user_id] = socket.id

	socket.join(socket.handshake.auth.user_id + '')

	socket.on("connection", (data) => {
		console.log('conn ---> ', data)
	})
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function (data) {
		online.def[data.user_id] = null
	})
})

io.of('/chats').on('connection', (socket) => chats(socket))
io.of('/groups').on('connection', (socket) => groups(socket))
io.of('/channels').on('connection', (socket) => channels(socket))

// return io
// }

// export default io

export function on_every_request([event, data], next) {
	// console.log('conv   : ', socket)
	// console.log('socket : ', socket.id)
	console.table({event: event, data: data})
	next()
}
