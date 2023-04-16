"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.errors = void 0;
const mysql_1 = require("mysql");
// import configs from './configs'
// import { databaseConnectionOptions } from './configs'
exports.errors = [];
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // when deploying on google cloud
        // socketPath: '/cloudsql/my-project-12345:us-central1:mydatabase',
        const connection = (0, mysql_1.createConnection)({
            // socketPath: hostname,
            host: process.env.DB_HOSTNAME,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        connection.connect((error) => {
            if (error) {
                exports.errors.push(99999, process.env, process.env.DB_HOSTNAME);
                exports.errors.push(66666, error);
                console.log(66666, error.code);
                reject(error);
            }
            else {
                exports.errors.push(11111, connection);
                console.log(11111, connection.state);
                resolve(connection);
            }
        });
    });
});
const query = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield connect();
        // console.log(22222, connection)
        connection.query(query, connection, (error, rows) => {
            if (error) {
                exports.errors.push(33333, error);
                console.log(33333, error);
                console.error(55555, error.code);
                reject(error);
            }
            else {
                exports.errors.push(44444, rows);
                console.log(44444, rows);
                // Object.entries(rows).forEach(([key, value]) => console.log(44444, key))
                resolve(JSON.parse(JSON.stringify(rows)));
            }
            connection.end();
        });
    }));
});
exports.query = query;
