"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const chats_1 = __importDefault(require("./chats"));
// import groupsRouter from './groups'
// import channelsRouter from './channels'
// import callsRouter from './calls'
let routers = {
    users: users_1.default,
    chats: chats_1.default
};
let allRouter = (0, express_1.Router)();
// logs all requests in brief
allRouter.all("/", (req, res, next) => {
    console.log('>>>>>>>>>>>', req.method);
    next();
});
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
const database_1 = require("../database");
allRouter.get("/", (req, res, next) => {
    // res.send('hello from api server!')
    res.send(database_1.errors);
    // next()
});
allRouter.get("/hi", (req, res) => {
    res.send('hi from api server!');
    // res.send(errors)
});
allRouter.use('/users', routers.users);
allRouter.use('/chats', routers.chats);
// allRouter.use('/groups', groupsRouter)
// allRouter.use('/channels', channelsRouter)
// allRouter.use('/calls', callsRouter)
allRouter.get("/*", (req, res) => {
    res.status(404).send('path not found on api server!');
});
exports.default = allRouter;
