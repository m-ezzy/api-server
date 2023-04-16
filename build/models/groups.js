"use strict";
// import { execute_query } from '../database.js'
// import configs from '../configs.js'
// const groupsModel = {
// 	members: {},
// 	media: {}
// }
// groupsModel.select_info = async (group_id) => {
// 	let query = `SELECT * FROM groups WHERE group_id=${group_id}`
// 	let rows = await execute_query(query)
// 	return rows[0]
// }
// groupsModel.select_info_from_conv_name = async (group_name) => {
// 	let query = `SELECT * FROM groups WHERE group_name='${group_name}'`
// 	let rows = await execute_query(query)
// 	return (rows.length == 0)
// }
// groupsModel.select_previous = async (user_id) => { //selectPrevious //selectPreviousGroups
//   let query = `SELECT groups.group_id AS conv_id,groups.group_name AS conv_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE group_members.user_id=${user_id}`
// 	let rows = await execute_query(query)
// 	return rows
// }
// groupsModel.select_new = async (user_id, q) => {
// 	//let query = `SELECT * FROM groups WHERE group_name LIKE '${q}%' OR title LIKE '${q}%'`
// 	// let query = `SELECT groups.group_id AS conv_id,groups.group_name AS conv_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE group_members.user_id!=${user_id} AND (groups.group_name LIKE '%${q}%' OR groups.title LIKE '%${q}%')`
// 	// let query = `SELECT groups.group_id,groups.group_name,groups.title,groups.extension FROM groups INNER JOIN group_members ON groups.group_id=group_members.group_id WHERE groups.group_name='${q}'`
// 	// let rows = await execute_query(query)
// 	// return rows
// 	let query = `SELECT group_id AS conv_id,group_name AS conv_name,title,extension,user_id FROM groups WHERE group_name LIKE '${q}%' OR title LIKE '${q}%'`
// 	let rows = await execute_query(query)
// 	let rows2 = await groupsModel.select_previous(user_id)
// 	let groups = []
// 	let rows3 = []
// 	rows.forEach(row => {
// 		let is_new = true
// 		for(let i=0 ; i<rows2.length ; i++) {
// 			if (row.conv_id == rows2[i].conv_id) {
// 				is_new = false
// 				break;
// 			}
// 		}
// 		if(is_new) {
// 			rows3.push(row)
// 		}
// 	})
// 	return rows3
// }
// groupsModel.insert = async (group_name, title, user_id) => {
// 	let query = `INSERT INTO groups(group_name,title,user_id) VALUES('${group_name}','${title}',${user_id})`
// 	let rows = await execute_query(query)
// 	return rows.insertId
// }
// groupsModel.update = async (group_id, o) => {
// 	let query = `UPDATE groups SET ${o} WHERE group_id=${group_id}`
// 	let rows = await execute_query(query)
// 	return "success"
// }
// groupsModel.delete = async (group_id) => {
// 	let query = `DELETE FROM groups WHERE group_id=${group_id}`
// 	let rows = await execute_query(query)
// 	return "success"
// }
// groupsModel.members.select = async (group_id) => {
// 	let query = `SELECT users.user_id,users.user_name,users.first_name,users.last_name,users.extension FROM users INNER JOIN group_members ON group_members.user_id=users.user_id WHERE group_members.group_id=${group_id}`
// 	let rows = await execute_query(query)
// 	return rows
// }
// groupsModel.members.insert = async (group_id, user_id) => {
// 	let query = `INSERT INTO group_members(group_id,user_id) VALUES('${group_id}',${user_id})`
// 	let rows = await execute_query(query)
// 	return "success"
// }
// groupsModel.members.delete = async (group_id, user_id) => {
// 	let query = `DELETE FROM group_members WHERE group_id=${group_id} AND user_id=${user_id}`
// 	let rows = await execute_query(query)
// 	return "success"
// }
// groupsModel.members.delete_all_by_user = async (user_id) => {
// 	let query = `DELETE FROM group_members WHERE user_id=${user_id}`
// 	let rows = await execute_query(query)
// 	return "success"
// }
// groupsModel.media.count = async () => {
// 	let query = `SELECT COUNT(*) FROM group_media`
// 	let rows = await execute_query(query)
// 	return rows[0]['COUNT(*)']
// }
// groupsModel.media.last_id = async () => {
// 	let query = `SELECT * FROM group_media`
// 	let rows = await execute_query(query)
// 	return rows[rows.length - 1].group_media_id
// }
// groupsModel.media.select = async (group_id, row_up, select_all) => {
// 	// let query = `SELECT * FROM group_media WHERE group_id=${group_id} AND group_media_id<=${row_up}`
// 	let query = `SELECT group_media.group_media_id AS media_id,group_media.group_id AS conv_id,group_media.user_id,group_media.time_sent,media_types.type AS media_type,group_media.text FROM group_media INNER JOIN media_types ON group_media.media_type=media_types.media_type_id WHERE group_media.group_id=${group_id} AND group_media.group_media_id<=${row_up}`
// 	let rows = await execute_query(query)
// 	if(select_all) {
// 		return rows
// 	}
// 	let limit = configs.limit
// 	if (rows.length < limit) {
// 		limit = rows.length
// 	}
// 	console.log(limit)
// 	return rows.splice(rows.length - limit, limit)
// }
// groupsModel.media.insert = async (group_id, user_id, media_type, text) => {
// 	let query = `INSERT INTO group_media(group_id,user_id,media_type,text) VALUES(${group_id},${user_id},${media_type},'${text}')`
// 	let rows = await execute_query(query)
// 	return rows.insertId
// }
// groupsModel.media.delete = async (group_id) => {
// 	let query = `DELETE FROM group_media WHERE group_id=${group_id}`
// 	let rows = await execute_query(query)
// 	return "success"
// }
// export default groupsModel
