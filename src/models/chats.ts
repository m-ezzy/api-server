import { query } from "../database"
// import * as db from "../database"

/*class CRUD {
	constructor() {
		this.select = {}
		this.insert = {}
		this.update = {}
		this.delete = {}
	}
}*/
interface CRUD {
	select: any,
	insert: any,
	update: any,
	delete: any,
}

export let index: any = {
	select: {},
	insert: {},
	update: {},
	delete: {},
}
export let members: any = {
	select: {},
	insert: {},
	update: {},
	delete: {},
}
export let media: any = {
	select: {},
	insert: {},
	update: {},
	delete: {},
}

index.select = async (user_id: number) => {
	let sql: string = `SELECT chat_id FROM chat_members WHERE user_id=${user_id}`
	// return query(sql)
	let rows: any = await query(sql)
	return rows
}
index.insert = async (user_id: number) => {
	let sql: string = `INSERT INTO chats(user_id) VALUES(${user_id})`
	let rows: any = await query(sql)
	return rows.insertId
}
index.delete = async (chat_id: number) => {
	let sql: string = `DELETE FROM chats WHERE chat_id=${chat_id}`
	let rows: any = await query(sql)
	return "success"
}

members.select = async (chat_id: number, user_id: number) => {
	let sql: string = `SELECT chat_members.chat_id AS conv_id, chat_members.user_id, chat_members.blocked, users.user_name AS conv_name, users.title, users.icon FROM chat_members INNER JOIN users ON chat_members.user_id=users.user_id WHERE chat_members.chat_id=${chat_id} AND chat_members.user_id!=${user_id}`
	let rows: any = await query(sql)
	return rows[0]
}
members.insert = async (chat_id: number, user_id: number) => {
	let sql = `INSERT INTO chat_members(chat_id, user_id) VALUES(${chat_id}, ${user_id})`
	let rows = await query(sql)
	return "success"
}
members.update = async (chat_id: number, user_id: number, blocked: boolean) => {
	let sql: string = `UPDATE chat_members SET blocked=${blocked} WHERE chat_id=${chat_id} AND user_id=${user_id}`
	let rows: any = await query(sql)
	return "success"
}
members.delete = async (chat_id: number, user_id: number) => {
	let sql: string = `DELETE FROM chat_members WHERE chat_id=${chat_id} AND user_id=${user_id}`
	let rows: any = await query(sql)
	return "success"
}

media.select = async (chat_id: number) => {
	let sql: string = `SELECT chat_media.media_id, chat_media.user_id, chat_media.time_sent, chat_media.text, media_types.media_type FROM chat_media INNER JOIN media_types ON chat_media.media_type_id = media_types.id WHERE chat_media.chat_id = ${chat_id}`
	let rows: any = await query(sql)
	return rows
}
media.insert = async (chat_id: number, user_id: number, media_type_id: number, text: string) => { //text //data
	let sql: string = `INSERT INTO chat_media(chat_id, user_id, media_type_id, text) VALUES(${chat_id}, ${user_id}, ${media_type_id}, '${text}')`
	let rows: any = await query(sql)
	return rows.insertId
}
media.update = async (chat_id: number) => {
}
media.delete = async (chat_id: number) => {
}
