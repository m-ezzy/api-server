import { query } from "../database"

export const select: any = {}

select.from_user_name_and_pass_word = async (user_name: string, pass_word: string) => { //check_pass_word
	let sql = `SELECT * FROM users WHERE user_name='${user_name}' AND pass_word='${pass_word}'`
	let rows: any = await query(sql)
	return rows[0]
}

select.fromUserId = async (user_id: number) => {
	let sql = `SELECT * FROM users WHERE user_id=${user_id}`
	let rows: any = await query(sql)
	return rows[0]
}
select.fromUserName = async (user_name: string) => { //check_user_name //select_from_user_name
	let sql = `SELECT * FROM users WHERE user_name='${user_name}'`
	let rows: any = await query(sql)
	return rows[0]
}

select.fromUserIdBasic = async (user_id: number) => {
	let sql = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_id=${user_id}`
	let rows: any = await query(sql)
	return rows[0]
}
select.fromUserNameBasic = async (user_name: string) => {
	let sql = `SELECT user_id,user_name,first_name,last_name,extension FROM users WHERE user_name='${user_name}'`
	let rows: any = await query(sql)
	return rows[0]
}

select.search = async (q: string) => {
	let sql = `SELECT user_id, user_name AS conv_name, first_name, last_name, icon FROM users WHERE user_name LIKE '%${q}%' OR first_name LIKE '%${q}%' OR last_name LIKE '%${q}%'`
	let rows = await query(sql)
	return rows
}

export const insert = async (user_name: string, pass_word: string, first_name: string, last_name: string) => {
	let sql = `INSERT INTO users(user_name,pass_word,first_name,last_name) VALUES('${user_name}','${pass_word}','${first_name}','${last_name}')`
	let rows: any = await query(sql)
	return rows.insertId
}

export const update = async (user_id: number, s: string) => {
	let sql = `UPDATE users SET ${s} WHERE user_id=${user_id}`;
	let rows = await query(sql)
	return "success"
}

export const deleteUser = async (user_id: number) => {
	let sql = `DELETE FROM users WHERE user_id=${user_id}`
	let rows = await query(sql)
	return "success"
}
