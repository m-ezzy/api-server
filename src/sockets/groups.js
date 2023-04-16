import { io, on_every_request } from "./index.js"

export default (socket) => {
	socket.use(on_every_request)

	socket.on('join-all-my-rooms', (data) => {
		data.forEach(group_id => {
			socket.join(group_id + '')
		})
	})
	socket.on('join-conv', (data) => {
		socket.join(data.conv_id + '')
	})
	socket.on('added-member', (data) => {
		socket.to(data.conv_id + '').emit('added-member', data)
		io.of('/').to(data.user_id + '').emit('groups-added-member', data)
		// socket.to(data.user_id + '').emit('joined-new-group', data)
	})
	socket.on('send-media', (data) => {
		socket.to(data.conv_id + '').emit('receive-media', data)
	})
	socket.on('update-info', (data) => {
		socket.to(data.conv_id + '').emit('update-info', data)
	})
	socket.on('member-leave', (data) => {
		socket.to(data.conv_id + '').emit('member-leave', data)
		socket.leave(data.conv_id + '')
	})
	socket.on('member-delete', (data) => {
		socket.to(data.conv_id + '').emit('member-delete', data)
		socket.leave(data.conv_id + '')
		// room delete
	})
}
