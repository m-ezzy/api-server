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
exports.media = exports.members = exports.index = void 0;
const database_1 = require("../database");
exports.index = {
    select: {},
    insert: {},
    update: {},
    delete: {},
};
exports.members = {
    select: {},
    insert: {},
    update: {},
    delete: {},
};
exports.media = {
    select: {},
    insert: {},
    update: {},
    delete: {},
};
exports.index.select = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT chat_id FROM chat_members WHERE user_id=${user_id}`;
    // return query(sql)
    let rows = yield (0, database_1.query)(sql);
    return rows;
});
exports.index.insert = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `INSERT INTO chats(user_id) VALUES(${user_id})`;
    let rows = yield (0, database_1.query)(sql);
    return rows.insertId;
});
exports.index.delete = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `DELETE FROM chats WHERE chat_id=${chat_id}`;
    let rows = yield (0, database_1.query)(sql);
    return "success";
});
exports.members.select = (chat_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT chat_members.chat_id AS conv_id, chat_members.user_id, chat_members.blocked, users.user_name AS conv_name, users.title, users.icon FROM chat_members INNER JOIN users ON chat_members.user_id=users.user_id WHERE chat_members.chat_id=${chat_id} AND chat_members.user_id!=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return rows[0];
});
exports.members.insert = (chat_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `INSERT INTO chat_members(chat_id, user_id) VALUES(${chat_id}, ${user_id})`;
    let rows = yield (0, database_1.query)(sql);
    return "success";
});
exports.members.update = (chat_id, user_id, blocked) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `UPDATE chat_members SET blocked=${blocked} WHERE chat_id=${chat_id} AND user_id=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return "success";
});
exports.members.delete = (chat_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `DELETE FROM chat_members WHERE chat_id=${chat_id} AND user_id=${user_id}`;
    let rows = yield (0, database_1.query)(sql);
    return "success";
});
exports.media.select = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT chat_media.media_id, chat_media.user_id, chat_media.time_sent, chat_media.text, media_types.media_type FROM chat_media INNER JOIN media_types ON chat_media.media_type_id = media_types.id WHERE chat_media.chat_id = ${chat_id}`;
    let rows = yield (0, database_1.query)(sql);
    return rows;
});
exports.media.insert = (chat_id, user_id, media_type_id, text) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `INSERT INTO chat_media(chat_id, user_id, media_type_id, text) VALUES(${chat_id}, ${user_id}, ${media_type_id}, '${text}')`;
    let rows = yield (0, database_1.query)(sql);
    return rows.insertId;
});
exports.media.update = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.media.delete = (chat_id) => __awaiter(void 0, void 0, void 0, function* () {
});
