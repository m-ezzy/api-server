import path from 'path'
import fs from 'fs'
import { Request, Response } from "express"

import * as users from "../models/users"

const cookieOptions: any = {
	// domain: `${process.env.CLIENT_HOSTNAME}:${process.env.CLIENT_PORT}`,
	path: '/',
	sameSite: 'lax',
	maxAge: 3600000000,
}

let models: any = {
	users: users,
}

export async function create(req: Request, res: Response) { //signup
	let row = await models.users.select.fromUserName(req.body.userName)

	if(row) {
		res.status(200).json({userNameIsAvailable: false, status: 'failed', error: 'username is not available'})
	} else {
		let userId = await models.users.insert(req.body.title, req.body.userName, req.body.password)

		res.cookie('user_id', userId, cookieOptions)
		res.status(200).send({status: 'success', user_id: userId})
	}
}
export async function login(req: Request, res: Response) {
	console.log(req.query.userName, req.query.password, req.body.userName, req.body.password)

	let row = await models.users.select.from_user_name_and_pass_word(req.body.userName, req.body.password)
	
	// if (row.pass_word == req.body.pass_word) {
	if(row) {
		res.cookie('user_id', row.user_id, cookieOptions)
		console.log('cookie set successfully')
		res.status(200)
		res.send({status: 'success', user_id: row.user_id})
	} else {
		res.status(500)
		res.json({
			status: 'failure',
			reason: 'username is not registered'
		})
	}
}
export async function check_user_name(req: Request, res: Response) {
	let row = await models.users.select.fromUserName(req.body.conv_name)
	res.send(row ? false : true)
}
export async function check_pass_word(req: Request, res: Response) {
	let row = await models.users.select.from_user_name_and_pass_word(req.body.user_name, req.body.pass_word)
	res.json(row ? true : false)
}
export async function info(req: Request, res: Response) {
	let data = await models.users.select.fromUserId(req.body.userId)
	res.send(data)
}
export async function update_info(req: Request, res: Response) {
	let status = await models.users.update(req.cookies.user_id, req.body.s)   //or use spread operator
	res.json({status: status})
}/*
export async function update_icon(req: Request, res: Response) {
	let extension_new = req.file.originalname.split('.')[1] //path.extname(req.file.originalname)

	// deleting old icon
	if(req.body.extension_old != 'null') {
		fs.unlinkSync(path.resolve(process.cwd(), `.\\client\\public\\data\\icons\\users\\${req.cookies.user_id}.${req.body.extension_old}`))
	}
	fs.renameSync(req.file.path, path.resolve(process.cwd(), `.\\client\\public\\data\\icons\\users\\${req.cookies.user_id}.${extension_new}`))

	let status = await models.users.update(req.cookies.user_id, `extension='${extension_new}'`)
	res.json({status: status})
}*/
export async function get_file_data_icons(req: Request, res: Response) {
	const stream = fs.createReadStream(process.cwd() + `/data/icons/users/${req.params.file_name}`)
	stream.pipe(res)
}
export async function deleteUser(req: Request, res: Response) { //delete_account
	let user_id = req.cookies.user_id

	// delete/leave all channels, channel members and channel media

	// leave all groups, group members and group media

	// leave all chats and chat media
	// let status10 = await chatsModel.delete_all(user_id)

	// delete user
	let status50 = await models.users.delete(user_id)
	res.json({status: "success"})
}
