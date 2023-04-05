// import dotenv from 'dotenv'
// dotenv.config({path: '../.env'})

// import process from 'process'
import http from 'http'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import allRoutes from './routes/all'

import configs, { NODE_ENV } from './configs'

// console.log(process.env.DB_NAME)

// const port = process.env.PORT || 8000
const port = configs.apiServer.port

const app = express()

const server = http.createServer(app)

// app.use(cors({credentials: true, origin: '*'}))
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:5173',
    'http://192.168.43.40:5173',
    'http://100.84.216.86:5173',
    'https://raven-client-server.netlify.app',
    'https://raven-api-server.netlify.app',
    'https://642d7da021493d3b6b909b1b--raven-social.netlify.app',
    'https://master--raven-social.netlify.app',
    'https://ec2-15-206-68-210.ap-south-1.compute.amazonaws.com'
  ]
}))

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

console.log(process.cwd())
app.use(express.static(process.cwd() + '/public'))

app.use('/', allRoutes)

server.listen(port, () => {
  console.log(`api server running on port ${port}`)
})
