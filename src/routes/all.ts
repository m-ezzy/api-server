import { Request, Response, Router } from 'express'

import users from './users'
import chats from './chats'
// import groupsRouter from './groups'
// import channelsRouter from './channels'
// import callsRouter from './calls'

let routers: any = {
  users: users,
  chats: chats
}

let allRouter: Router = Router()

// logs all requests in brief
allRouter.all("/", (req, res, next) => {
	console.log('>>>>>>>>>>>', req.method)
  next()
})
/*
allRouter.use('/', (req: Request, res: Response, next) => {
  // res.set() res.header() res.setHeader() //all are same

  res.header("Access-Control-Allow-Headers", '*')
  // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Content-Type, Accept")

  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Origin', req.headers.origin)
  // res.header("Access-Control-Allow-Origin", 'http://localhost:5173')
  res.header('Access-Control-Allow-Origin', 'https://raven.infinityfreeapp.com')

  res.header('Access-Control-Allow-Credentials', 'true')

  console.log(req.method)

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT")
		res.header("Access-Control-Max-Age", '10000000')
    res.status(200).json({})
    return
  }

  next()
})*/
/*
allRouter.options('*', (req: Request, res: Response, next) => {
  console.log(req.method)
  res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT")
  // res.header("Access-Control-Max-Age", '10000000')
  res.status(200).json({})
  // return
  // next()
})*/

import { errors } from '../database'

allRouter.get("/", (req, res, next) => {
	// res.send('hello from api server!')
	res.send(errors)
  // next()
})
allRouter.get("/hi", (req, res) => {
	res.send('hi from api server!')
	// res.send(errors)
})

allRouter.use('/users', routers.users)
allRouter.use('/chats', routers.chats)
// allRouter.use('/groups', groupsRouter)
// allRouter.use('/channels', channelsRouter)
// allRouter.use('/calls', callsRouter)
/*
allRouter.get("/*", (req, res) => {
	res.status(404).send('path not found on api server!')
})*/

export default allRouter
