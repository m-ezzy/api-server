import { Router } from 'express'

import usersRouter from './users'
import chatsRouter from './chats'
// import groupsRouter from './groups'
// import channelsRouter from './channels'
// import callsRouter from './calls'

let allRouter: Router = Router()

allRouter.get("/", (req, res) => {
	res.send('hello from api server!')
})

allRouter.use('/users', usersRouter)
allRouter.use('/chats', chatsRouter)
// allRouter.use('/groups', groupsRouter)
// allRouter.use('/channels', channelsRouter)
// allRouter.use('/calls', callsRouter)

export default allRouter
