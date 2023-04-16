import { io, on_every_request } from "./index.js"

export default (socket) => {
	socket.use(on_every_request)

	socket.on('join-all-my-rooms', (data) => { //join-conv-all
		data.forEach(chat_id => {
			socket.join(chat_id + '')
		})
	})
	socket.on('join-conv', (data) => { //connect-conv //join-conv //created-new
		socket.join(data.conv_id + '')
	})
	socket.on('created-conv', (data) => {
		// socket.join(data.conv_id + '')
		// io.of('/chats')   OR
		// io.to(online.chats[data.user_id + '']).emit('notify-created-chat', data)
		io.of('/').to(data.user_id + '').emit('chats-created-conv', data)
	})
	socket.on('update-info', (data) => {
		console.log(data)
	})
	socket.on('send-media', (data) => {
		socket.to(data.conv_id + '').emit('receive-media', data)
		// io.of('/').to(data.user_id + '').emit('receive-media', data)
	})
	socket.on('delete', (data) => {
		socket.leave(data.conv_id + '')
	})
}
