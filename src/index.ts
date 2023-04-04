import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import allRoutes from './routes/all'

const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)

// app.use(cors({credentials: true, origin: '*'}))
app.use(cors({credentials: true, origin: ['http://localhost:5173', 'http://192.168.43.40:5173', 'http://100.84.216.86:5173', 'https://raven-client-server.netlify.app', 'https://master--raven-client-server.netlify.app']}))

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

console.log(process.cwd())
app.use(express.static(process.cwd() + '/public'))

app.use('/', allRoutes)

server.listen(port, () => {
  console.log(`api server running on port ${port}`)
})
