import { on_every_request } from "./index.js"

export default (socket) => {
	socket.use(on_every_request)

	socket.on('join-all-my-rooms', (data) => {
		data.forEach(channel_id => {
			socket.join(channel_id + '')
		})
	})
	socket.on('join-conv', (data) => {
		socket.join(data.conv_id + '')
	})
	socket.on('added-member', (data) => { //member-joined
		socket.join(data.conv_id + '')
		socket.to(data.conv_id + '').emit('added-member', data)
	})
	socket.on('send-media', (data) => {
		socket.to(data.conv_id + '').emit('receive-media', data)
	})
	socket.on('update-info', (data) => {
		socket.to(data.conv_id + '').emit('update-info', data)
	})
	socket.on('designation-change', (data) => {
		socket.to(data.channel_id + '').emit('designation-change', data)
	})
	socket.on('member-leave', (data) => {
		socket.to(data.conv_id + '').emit('member-leave', data)
		socket.leave(data.conv_id + '')
	})
	socket.on('member-delete', (data) => {
		socket.leave(data.conv_id + '')
		socket.to(data.conv_id + '').emit('member-delete', data)
		// room delete
	})
}
