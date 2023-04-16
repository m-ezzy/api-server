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
exports.deleteUser = exports.update = exports.insert = exports.select = void 0;
const database_1 = require("../database");
exports.select = {};
exports.select.from_user_name_and_pass_word = (user_name, pass_word) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT * FROM users WHERE user_name='${user_name}' AND pass_word='${pass_word}'`;
    let rows = yield (0, database_1.query)(sql);
    return rows[0];
});
exports.select.fromUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT * FROM users WHERE user_id=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return rows[0];
});
exports.select.fromUserName = (user_name) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT * FROM users WHERE user_name='${user_name}'`;
    let rows = yield (0, database_1.query)(sql);
    return rows[0];
});
exports.select.fromUserIdBasic = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_id=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return rows[0];
});
exports.select.fromUserNameBasic = (user_name) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_name='${user_name}'`;
    let rows = yield (0, database_1.query)(sql);
    return rows[0];
});
exports.select.search = (q) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT user_id, user_name AS conv_name, title, icon FROM users WHERE user_name LIKE '%${q}%' OR title LIKE '%${q}%'`;
    let rows = yield (0, database_1.query)(sql);
    return rows;
});
const insert = (title, userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `INSERT INTO users(title, user_name, pass_word) VALUES('${title}', '${userName}', '${password}')`;
    let rows = yield (0, database_1.query)(sql);
    return rows.insertId;
});
exports.insert = insert;
const update = (user_id, s) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `UPDATE users SET ${s} WHERE user_id=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return "success";
});
exports.update = update;
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `DELETE FROM users WHERE user_id=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return "success";
});
exports.deleteUser = deleteUser;
