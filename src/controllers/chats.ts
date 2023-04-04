import fs from 'fs'
import path from 'path'
import { Request, Response } from "express"

// import models from '../models/all'
import * as users from '../models/users'
import * as chats from '../models/chats'

/*interface Models {
	users: any,
	chats: any,
}*/

let models: any = {
	users: users,
	chats: chats,
}

export async function previousConv(req: Request, res: Response) {
	let rows = await models.chats.index.select(req.cookies.user_id)
	let p: any = {}

	console.log('gh', rows)
	for (let i = 0 ; i < rows.length ; i++) {
		let chat_id = rows[i].chat_id
		let user = await models.chats.members.select(chat_id, req.cookies.user_id)
		console.log(54986514814, user)

		p[chat_id] = {
			...user,
			title: `${user.first_name} ${user.last_name}`,
			unread: 0,
		}
	}
	res.json(p)
}

export async function search_new(req: Request, res: Response) {
	let users: any = []
	let chats = await models.chats.index.select(req.cookies.user_id)

	for(let i = 0 ; i < chats.length ; i++) {
		let user = await models.chats.members.select(chats[i].chat_id, req.cookies.user_id)
		users.push(user.user_id)
	}

	console.log(chats, users)

	let rows: any = []
	let all = await models.users.select.search(req.body.q)
	all.forEach((a: any) => {
		a['title'] = `${a.first_name} ${a.last_name}`
		rows.push(a)

		for(let i = 0 ; i < users.length ; i++) {
			if(a.user_id == users[i]) {
				rows.pop()
				break
			}
		}
	})

	console.log(all, rows)

	res.send(rows)
}

export async function create(req: Request, res: Response) {
	let conv_id = await models.chats.index.insert(req.cookies.user_id)
	let rows1 = await models.chats.members.insert(conv_id, req.cookies.user_id)
	let rows2 = await models.chats.members.insert(conv_id, req.body.user_id)
	res.json({status: 'success', conv_id: conv_id})
}

export async function previousMedia(req: Request, res: Response) {
	console.log(typeof(req.cookies.user_id))
	let rows = await models.chats.media.select(req.body.conv_id)
	res.json(rows)
}

export async function sendMediaMessage(req: Request, res: Response) {
	let media_id: number = await models.chats.media.insert(req.body.conv_id, req.cookies.user_id, 1, req.body.text)
	//text //data
	res.json({media_id: media_id})
}
/*
export async function send_media_files(req: Request, res: Response) {
	let arr = []
	let details = JSON.parse(req.body.details)

	console.log(req.files)

	let i = 0
	for(const file of req.files: multer) {
		let extension = file.originalname.split('.')[1]

		let media_id = await models.chats.media.insert(req.body.conv_id, req.cookies.user_id, details[i], extension)

		fs.renameSync(path.resolve(process.cwd(), file.path), path.resolve(process.cwd(), `..\\client\\public\\data\\chats\\${media_id}.${extension}`))
		
		arr.push({
			media_id: media_id,
			text: extension
		})
		i++
	}
	res.send(JSON.stringify(arr))
}
export async function get_file_data_media(req: Request, res: Response) {
	// res.setHeader('Content-Type', mime.getType(extension))
	const stream = fs.createReadStream(process.cwd() + `/data/chats/${req.params.file_name}`)
	stream.pipe(res)
}
export async function unblock(req: Request, res: Response) {
	let status = await models.chats.update(req.body.chat_id, null)
	res.json({status: status})
}
export async function leave(req: Request, res: Response) {
	let status = await models.chats.update(req.body.conv_id, req.cookies.user_id)
	res.json({status: status})
}
export async function deleteChat(req: Request, res: Response) {
	let status1 = await callsModel.chats.delete(req.body.conv_id)

	let rows1 = await models.chats.media.select(req.body.conv_id, 1000000000000000, true)
	rows1.forEach(file {
		if(file.media_type != 'message') {
			fs.unlinkSync(path.resolve(process.cwd(), `..\\client\\public\\data\\chats\\${file.media_id}.${file.text}`))
		}
	})
	let status2 = await models.chats.media.delete(req.body.conv_id)
	let status3 = await models.chats.delete(req.body.conv_id)

	res.json({status: status1})
}
*/