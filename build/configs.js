"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NODE_ENV = 'development'; //development //production
// export const NODE_ENV = 'dev'
//development
const dev = {
    database: {
        protocol: "http",
        hostname: "localhost",
        port: 3306,
        username: "root",
        password: "",
        dbname: "raven",
    },
    apiServer: {
        protocol: "http",
        hostname: "localhost",
        port: 8000,
        path: "/api",
    },
    socketServer: {
        protocol: "http",
        hostname: "localhost",
        port: 7000,
        path: "", //'' //'/socket' //'/conv'
    },
    peerServer: {
        protocol: "http",
        hostname: "localhost",
        port: 9000,
        path: "/peer",
        PREFIX: 'raven-', //murtaza-raven- //''
    },
    client: {
        protocol: "http",
        hostname: "localhost",
        port: 5173,
        path: "/",
    }
};
//production //distribution //build
const pro = {
    database: {
        protocol: "https",
        hostname: 'database-2.cbhtnajgxbkj.ap-south-1.rds.amazonaws.com',
        port: 3306,
        username: "admin",
        password: "123456789",
        dbname: 'raven',
    },
    apiServer: {
        protocol: "http",
        hostname: "642d7da021493d3b6b909b1b--raven-social.netlify.app",
        port: 8000,
        path: "/",
    },
    client: {
        protocol: "http",
        hostname: "localhost",
        port: 5173,
        path: "/",
    }
};
// const { database, apiServer } = dev
// export { database, apiServer }
exports.default = (NODE_ENV == 'development' ? dev : pro);
