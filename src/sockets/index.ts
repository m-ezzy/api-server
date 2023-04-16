import { Server, Socket, DisconnectReason } from 'socket.io'

const { SOCKET_PROTOCOL, SOCKET_HOSTNAME, SOCKET_PORT, SOCKET_PATH } = process.env

const onlineUsers: any = {}

// import { server } from '../index'

export function setupSocketServer(httpServer: any) {

  // let io = new Server(Number(SOCKET_PORT), {
  let io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: "*", //["GET", "POST"]
      allowedHeaders: "*", //["my-custom-header"]
      // credentials: true,
    },
    path: SOCKET_PATH,
    serveClient: true,
    transports: ['polling', 'websocket'],
  })

  // io.attach(7000)

  io.of('/chats').on('connection', (socket: Socket) => {
    console.log(socket.id)

    socket.on("connection", (data) => {
      console.log(data)
      onlineUsers[data.user_id] = {socketId: socket.id}
    })
    socket.on('disconnect', (reason: DisconnectReason) => {
      console.log(reason)
      
      /*let userId1: number = 0
      if(Object.keys(onlineUsers).length) {
        Object.entries(onlineUsers).forEach(([userId, v]: any) => {
          if(v.socketId == socket.id) {
            userId1 = Number.parseInt(userId)
          }
        })
        onlineUsers[userId1] = null
      }*/
    })
    socket.on('join-conv-all', (data) => {
      console.log(data)
      data.chat_ids.forEach((chat_id :number) => {
        socket.join(chat_id + '')
      })
    })
    socket.on('join-conv', (data) => { //connect-to-chat
      console.log(data)
      socket.join(data.conv_id + '')
    })
    socket.on('send-media', (data) => {
      console.log(data)
      console.log(onlineUsers)
      // io.to(onlineUsers[data.user_id].socketId).emit('receive-media-message', data)
      socket.to(data.conv_id + '').emit('receive-media', data)
    })
  })
}

export default 1
