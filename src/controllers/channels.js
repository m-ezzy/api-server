// import path from 'path'
// import fs from 'fs'
// import * as channelsModel from '../models/channels.js'
// import usersModel from "../models/users.js"
// import { get_media_type } from './upload_file.js'

// export const previous_conv = async (req, res) => {
// 	let rows = await channelsModel.select_previous(req.cookies.user_id)
// 	let last_id = await channelsModel.media.last_id()

// 	let members = {}
// 	for (let i = 0 ; i < rows.length ; i++) {
// 		let row = rows[i]
// 		let rows2 = await channelsModel.members.select(row.conv_id)
// 		members[row.conv_id] = rows2
// 	}
// 	res.send({
// 		last_id: last_id,
// 		convs: rows,
// 		members: members,
// 	})
// 	// let member_types = ['', 'founder', 'manager', 'regular']
// }
// export const search_new = async (req, res) => {
// 	let rows = await channelsModel.select_new(req.cookies.user_id, req.body.q)
// 	res.send(rows)
// }/*
// export const search_new_exact_match = async (req, res) => {
// 	let rows = await channelsModel.selectExactMatch(req.cookies.user_id, req.body.q)
// 	res.contentType('text/json')
// 	res.send(rows)
// }*/
// export const join = async (req, res) => {
// 	let status = await channelsModel.members.insert(req.body.conv_id, req.cookies.user_id, 3)
// 	let last_id = await channelsModel.media.last_id()
// 	let rows = await channelsModel.members.select(req.body.conv_id)

// 	res.send({
// 		status: status,
// 		last_id: last_id,
// 		members: rows
// 	})
// }
// export const check_conv_name = async (req, res) => {
// 	let status = await channelsModel.select_info_from_conv_name(req.body.conv_name)
// 	res.send(status)
// }
// export const create = async (req, res) => {
// 	let channel_id = await channelsModel.insert(req.cookies.user_id, req.body.conv_name, req.body.title)
// 	let rows = await channelsModel.members.insert(channel_id, req.cookies.user_id, 1)
// 	let row_num = await channelsModel.media.last_id()
// 	res.send({conv_id: channel_id, row_num: row_num})
// }
// export const previous_media = async (req, res) => {
// 	let rows = await channelsModel.media.select(req.body.conv_id, req.body.row_up)
// 	res.send(rows)
// }
// export const send_media_message = async (req, res) => {
// 	let channel_media_id = await channelsModel.media.insert(req.body.conv_id, req.cookies.user_id, 1, req.body.text)
// 	res.send({media_id: channel_media_id})
// }
// export const send_media_files = async (req, res) => {
// 	let arr = []
// 	for(const file of req.files) {
// 		let { extension, media_type_id, media_type } = get_media_type(file.originalname)
// 		let channel_media_id = await channelsModel.media.insert(req.body.conv_id, req.cookies.user_id, media_type_id, extension)

// 		fs.renameSync(path.resolve(process.cwd(), file.path), path.resolve(process.cwd(), `..\\client\\public\\data\\channels\\${channel_media_id}.${extension}`))
// 		arr.push({
// 			media_id: channel_media_id,
// 			media_type: media_type,
// 			text: extension
// 		})
// 	}
// 	res.send(arr)
// }
// export const update_info = async (req, res) => {
// 	let status = await channelsModel.update(req.body.conv_id, req.body.o)
// 	res.send({status: status})
// }
// export const update_icon = async (req, res) => {
// 	let extension_new = req.file.originalname.split('.')[1]
// 	// fs.renameSync(req.file.path, `./data/icons/channels/${req.body.channel_id}.${extension}`)

// 	console.log(req.body, req.body.extension_old)
// 	if(req.body.extension_old != 'null') {
// 		// deleting file
// 		fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\channels\\${req.body.conv_id}.${req.body.extension_old}`))
// 	}
// 	// copying file
// 	fs.renameSync(path.resolve(process.cwd(), req.file.path), path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\channels\\${req.body.conv_id}.${extension_new}`))

// 	let status = await channelsModel.update(req.body.conv_id, `extension='${extension_new}'`)
// 	res.send({status: status})
// }
// export const demote_promote = async (req, res) => {
// 	let status = await channelsModel.members.update(req.body.channel_id, req.body.user_id, req.body.member_type_new)
// 	res.send({status: status})
// }
// export const leave = async (req, res) => {
// 	let status = await channelsModel.members.delete(req.body.conv_id, req.cookies.user_id)
// 	res.json({status: status})
// }
// export const delete_channel = async (req, res) => {
// 	let conv_id = req.body.conv_id

// 	let rows1 = await channelsModel.media.select(conv_id, 10000000000, true)
// 	rows1.forEach(file => {
// 		if(file.media_type != 'message') {
// 			// fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\channels\\${file.media_id}.${file.text}`))
// 			fs.unlink(path.resolve(process.cwd(), `..\\client\\public\\data\\channels\\${file.media_id}.${file.text}`), (err) => {
// 				console.log('deleted!', err, err?.message)
// 			})
// 		}
// 	})
// 	let status1 = await channelsModel.media.delete_all(conv_id)
// 	let status2 = await channelsModel.members.delete_all_by_founder(conv_id)

// 	let { extension } = await channelsModel.select_info(conv_id)
// 	if(extension) {
// 		fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\channels\\${conv_id}.${extension}`))
// 	}

// 	let status3 = await channelsModel.delete_channel(conv_id)
// 	res.json({status: "success"})
// }
