import { execute_query } from '../database.js'
import configs from '../configs.js'

export let members = {}
export let media = {}

export async function select_info(channel_id) {
	let query = `SELECT * FROM channels WHERE channel_id=${channel_id}`
	let rows = await execute_query(query)
	return rows
}
export async function select_info_from_conv_name(channel_name) {
	let query = `SELECT * FROM channels WHERE channel_name='${channel_name}'`
	let rows = await execute_query(query)
	return (rows.length == 0)
}
export async function select_previous(user_id) {   //selectPreviousChannels
  let query = `SELECT channels.channel_id AS conv_id,channels.channel_name AS conv_name,channels.title,channels.extension,channels.user_id FROM channels INNER JOIN channel_members ON channels.channel_id=channel_members.channel_id WHERE channel_members.user_id=${user_id}`
	//,channel_members.member_type
	let rows = await execute_query(query)
	return rows
}
export async function select_new(user_id, q) {
	//let query = `SELECT * FROM channels WHERE channel_name LIKE '${q}%' OR title LIKE '${q}%'`
	// there is problem here. it is giving previous conv as well
	// let query = `SELECT channels.channel_id AS conv_id,channels.channel_name AS conv_name,channels.title,channels.extension,channels.user_id FROM channels INNER JOIN channel_members ON channels.channel_id=channel_members.channel_id WHERE channel_members.user_id != ${user_id} AND (channels.channel_name LIKE '${q}%' OR channels.title LIKE '${q}%')`
	let query = `SELECT channel_id AS conv_id,channel_name AS conv_name,title,extension,user_id FROM channels WHERE channel_name LIKE '${q}%' OR title LIKE '${q}%'`
	let rows = await execute_query(query)

	let rows2 = await select_previous(user_id)

	let channels = []
	let rows3 = []
	rows.forEach(row => {
		let is_new = true
		for(let i=0 ; i<rows2.length ; i++) {
			if (row.conv_id == rows2[i].conv_id) {
				is_new = false
				break;
			}
		}
		if(is_new) {
			rows3.push(row)
		}
	})
	return rows3
}/*
exports.selectNewExact = async (user_id, q) => {
	let query = `SELECT channels.channel_id,channels.channel_name,channels.title,channels.extension FROM channels INNER JOIN channel_members ON channels.channel_id=channel_members.channel_id WHERE channels.channel_name='${q}' AND channel_members.user_id!=${user_id}`
	let rows = await db.query(query)
	return JSON.parse(JSON.stringify(rows))
}*/
export async function insert(user_id, channel_name, title) {
	let query = `INSERT INTO channels(channel_name,title,user_id) VALUES('${channel_name}','${title}',${user_id})`
	let rows = await execute_query(query)
	return rows.insertId
}
export async function update(channel_id, o) {
	let query = `UPDATE channels SET ${o} WHERE channel_id=${channel_id}`
	let rows = await execute_query(query)
	return "success"
}
export async function delete_channel(channel_id) {
	let query = `DELETE FROM channels WHERE channel_id=${channel_id}`
	let rows = await execute_query(query)
	return "success"
}
export async function delete_channel_all(user_id) {
	let query = `DELETE FROM channels WHERE user_id=${user_id}`
	let rows = await execute_query(query)
	return "success"
}

members.select = async (channel_id) => {
	let query = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension,channel_members.member_type FROM users INNER JOIN channel_members ON users.user_id=channel_members.user_id WHERE channel_members.channel_id=${channel_id}`
	let rows = await execute_query(query)
	return rows
}
members.insert = async (channel_id, user_id, member_type) => {
	let query = `INSERT INTO channel_members(channel_id,user_id,member_type) VALUES('${channel_id}',${user_id},${member_type})`
	let rows = await execute_query(query)
	return "success"
}
members.update = async (channel_id, user_id, member_type) => {
	let query = `UPDATE channel_members SET member_type=${member_type} WHERE channel_id=${channel_id} AND user_id=${user_id}`
	let rows = await execute_query(query)
	return "success"
}
members.delete = async (channel_id, user_id) => { //delete_by_user
	let query = `DELETE FROM channel_members WHERE channel_id=${channel_id} AND user_id=${user_id}`
	let rows = await execute_query(query)
	return "success"
}
members.delete_all_by_user = async (user_id) => {
	let query = `DELETE FROM channel_members WHERE user_id=${user_id}`
	let rows = await execute_query(query)
	return "success"
}
members.delete_all_by_founder = async (channel_id) => {
	let query = `DELETE FROM channel_members WHERE channel_id=${channel_id}`
	let rows = await execute_query(query)
	return "success"
}

media.count = async () => {
	let query = `SELECT COUNT(*) FROM channel_media`
	let rows = await execute_query(query)
	return rows[0]['COUNT(*)']
}
media.last_id = async () => {
	let query = `SELECT * FROM channel_media`
	let rows = await execute_query(query)
	return rows[rows.length - 1]?.channel_media_id
}
media.select = async (channel_id, row_up, select_all) => {
	//let query = `SELECT * FROM chat_media WHERE chat_id=${chat_id} AND chat_media_id>${row_up} LIMIT ${limit}`;
	let query = `SELECT channel_media.channel_media_id AS media_id,channel_media.channel_id AS conv_id,channel_media.user_id,channel_media.time_sent,media_types.type AS media_type,channel_media.text FROM channel_media INNER JOIN media_types ON channel_media.media_type=media_types.media_type_id WHERE channel_media.channel_id=${channel_id} AND channel_media.channel_media_id<=${row_up}`
	let rows = await execute_query(query)

	if(select_all) {
		return rows
	}

	let limit = configs.limit
	if (rows.length < limit) {
		limit = rows.length
	}
	console.log(limit)
	
	return rows.splice(rows.length - limit, limit)
}
media.insert = async (channel_id, user_id, media_type, text) => {
	let query = `INSERT INTO channel_media(channel_id,user_id,media_type,text) VALUES(${channel_id},${user_id},${media_type},'${text}')`
	let rows = await execute_query(query)
	return rows.insertId
}
media.delete_all = async (channel_id) => { //delete_by_founder
	let query = `DELETE FROM channel_media WHERE channel_id=${channel_id}`
	let rows = await execute_query(query)
	return "success"
}/*
media.delete_by_user = async (user_id) => { //this is for when user deletes the account
	let query = `DELETE FROM channel_media WHERE user_id=${user_id}`
	let rows = await execute_query(query)
	return "success"
}*/
