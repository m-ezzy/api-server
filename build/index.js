"use strict";
// import * as dotenv from 'dotenv'
// dotenv.config({path: './.env.development', debug: true})
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import process from 'process'
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const all_1 = __importDefault(require("./routes/all"));
// import configs, { NODE_ENV } from './configs'
console.log(process.env.DB_PORT);
const port = process.env.PORT || process.env.API_PORT;
// const port = configs.apiServer.port
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const { CLIENT_PROTOCOL, CLIENT_HOSTNAME, CLIENT_PORT } = process.env;
// enable pre-flight across-the-board
// app.options('*', cors())
app.use((0, cors_1.default)({
    // configures Access-Control-Allow-Headers CORS header
    // allowedHeaders: ['Accept', 'Origin', 'Set-Cookie'],
    // configures Access-Control-Expose-Headers CORS header
    // exposedHeaders: ['Content-Range', 'X-Content-Range'],
    // configures Access-Control-Allow-Credentials CORS header
    credentials: true,
    // configures Access-Control-Max-Age CORS header
    // specify the duration (in seconds) to cache preflight results so the client does not need to make a preflight request every time it sends a complex request
    maxAge: 100000000,
    // configures Access-Control-Allow-Methods CORS header
    methods: '*',
    // methods: ['GET', 'POST', 'PUT', 'HEAD', 'DELETE'],
    // optionsSuccessStatus: 200, //200 //204
    // configures Access-Control-Allow-Origin CORS header
    // origin: true,
    // true - reflects the request origin, as defined by req.header('Origin')
    // false - cors disabled
    // origin: '*',
    // origin: `${CLIENT_PROTOCOL}://${CLIENT_HOSTNAME}:${CLIENT_PORT}`,
    origin: [
        'http://localhost:5173',
        'http://192.168.43.40:5173',
        'http://100.84.216.86:5173',
        'https://raven-client.netlify.app',
        'https://raven-social.netlify.app',
        'https://ec2-15-206-68-210.ap-south-1.compute.amazonaws.com',
        'http://raven.infinityfreeapp.com',
        'https://raven.infinityfreeapp.com',
    ],
    // preflightContinue: false,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log(process.cwd());
app.use(express_1.default.static(process.cwd() + '/public'));
app.use('/', all_1.default);
/*
app.listen(3000, () => {
  console.log('app server is also listening on port 3000')
})*/
server.listen(port, () => {
    console.log(`api server listening on port ${port}`);
});
