// import path from 'path'
// import fs from 'fs'
// import groupsModel from "../models/groups.js"
// import usersModel from "../models/users.js"
// import callsModel from '../models/calls.js'
// // import { get_media_type } from './upload_file.js'

// let groupsController = {}

// groupsController.previous_conv = async (req, res) => {
// 	let rows = await groupsModel.select_previous(req.cookies.user_id)
// 	let last_id = await groupsModel.media.last_id()

// 	let members = {}
// 	for (let i = 0 ; i < rows.length ; i++) {
// 		let row = rows[i]
// 		let rows2 = await groupsModel.members.select(row.conv_id)
// 		members[row.conv_id] = rows2
// 	}
// 	res.send({
// 		last_id: last_id,
// 		convs: rows,
// 		members: members,
// 	})
// }
// groupsController.search_new = async (req, res) => {
// 	let rows = await groupsModel.select_new(req.cookies.user_id, req.body.q)
// 	res.send(rows)
// }
// groupsController.check_conv_name = async (req, res) => {
// 	let status = await groupsModel.select_info_from_conv_name(req.body.conv_name)
// 	res.send(status)
// }
// groupsController.create = async (req, res) => {   //create //create_new
// 	let group_id = await groupsModel.insert(req.body.conv_name, req.body.title, req.cookies.user_id)
// 	let status = await groupsModel.members.insert(group_id, req.cookies.user_id)
// 	let row_num = await groupsModel.media.last_id()
// 	res.send({conv_id: group_id, row_num: row_num})
// 	// res.contentType('text/json')
// 	// res.send(JSON.stringify({'group_id': group_id, 'value': value}))
// }
// groupsController.previous_media = async (req, res) => {
// 	let rows = await groupsModel.media.select(req.body.conv_id, req.body.row_up)
// 	res.send(rows)
// }
// groupsController.send_media_message = async (req, res) => {
// 	let group_media_id = await groupsModel.media.insert(req.body.conv_id, req.cookies.user_id, req.body.media_type_id, req.body.text) //encrypted_message
// 	res.send({media_id: group_media_id})
// }
// groupsController.send_media_files = async (req, res) => {
// 	let arr = []
// 	let details = JSON.parse(req.body.details)

// 	let i = 0
// 	for(const file of req.files) {
// 		console.log(file)
// 	// for(let i = 0 ; i < req.files.length ; i++) {
// 		// let { extension, media_type_id, media_type } = get_media_type(file.originalname)
// 		let extension = file.originalname.split('.')[1]

// 		let group_media_id = await groupsModel.media.insert(req.body.conv_id, req.cookies.user_id, details[i], extension)

// 		console.log(process.cwd(), file.path, path.resolve(process.cwd(), file.path))
// 		fs.renameSync(path.resolve(process.cwd(), file.path), path.resolve(process.cwd(), `..\\client\\public\\data\\groups\\${group_media_id}.${extension}`))
// 		// fs.renameSync(req.files[i].path, `./data/groups/${group_media_id}.${extension}`)
		
// 		arr.push({
// 			media_id: group_media_id,
// 			// media_type_id: file.media_type_id,
// 			text: extension
// 		})
// 		i++
// 	}
// 	res.send(JSON.stringify(arr))
// }
// groupsController.update_info = async (req, res) => {
// 	let status = await groupsModel.update(req.body.conv_id, req.body.o)
// 	res.send({status: status}) //status //result
// }
// groupsController.update_icon = async (req, res) => {
// 	let extension_new = req.file.originalname.split('.')[1]

// 	if(req.body.extension_old != 'null') {
// 		// deleting file
// 		fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\groups\\${req.body.conv_id}.${req.body.extension_old}`))
// 	}
// 	// copying file
// 	fs.renameSync(path.resolve(process.cwd(), req.file.path), path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\groups\\${req.body.conv_id}.${extension_new}`))

// 	let status = await groupsModel.update(req.body.conv_id, `extension='${extension_new}'`)
// 	res.send({status: status})
// }
// groupsController.add_member = async (req, res) => {   //add_member //join
// 	let user = await usersModel.select_basic_from_user_name(req.body.user_name)
// 	let status = 'failure'
// 	if(user) {
// 		status = await groupsModel.members.insert(req.body.conv_id, user.user_id)
// 	}
// 	res.send({status: status, user: user})
// }
// groupsController.leave = async (req, res) => {
// 	let conv_id = req.body.conv_id
	
// 	let status1 = await groupsModel.members.delete(conv_id, req.cookies.user_id)

// 	let rows2 = await groupsModel.members.select(conv_id)
// 	if (rows2.length == 0) {
// 		//deleting all calls in calls_groups
// 		let status2 = await callsModel.groups.delete(conv_id)

// 		// also delete all media files in data folder
// 		let rows3 = await groupsModel.media.select(conv_id, 1000000000000000, true)
// 		rows3.forEach(file => {
// 			if(file.media_type != 'message') {
// 				fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\groups\\${file.media_id}.${file.text}`))
// 			}
// 		})
// 		let status3 = await groupsModel.media.delete(conv_id)

// 		let { extension } = await groupsModel.select_info(conv_id)
// 		if(extension) {
// 			fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\icons\\groups\\${conv_id}.${extension}`))
// 		}

// 		let status5 = await groupsModel.delete(conv_id)
// 	}
// 	res.send({status: 'success'})
// }

// export default groupsController
