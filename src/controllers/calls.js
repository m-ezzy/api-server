// import callsModel from "../models/calls.js"
// import usersModel from "../models/users.js"
// import groupsModel from "../models/groups.js"

// const callsController = {}

// callsController.get_history = async (req, res) => {
// 	let user_id = req.cookies.user_id

// 	let data1 = await callsModel.chats.select(req.cookies.user_id)
// 	for (let i = 0 ; i < data1.length ; i++) {
// 		let r = data1[i]
// 		let user_id3 = (req.cookies.user_id == r.user_id1) ? r.user_id2 : r.user_id1
// 		let o = await usersModel.select_basic(user_id3)
// 		data1[i] = {user_id1: null, user_id2: null, ...o, conv_name: o.user_name, title: `${o.first_name} ${o.last_name}`, ...r}
// 	}

// 	let data2 = await callsModel.groups.select(user_id)

// 	res.json({chats: data1, groups: data2})
// 	/*res.render("calls/list_previous", {data: data, user_id: user_id}, (err, html) => {
// 		res.send({json: data, html: html})
// 	})*/
// }
// callsController.make_call_chats = async (req, res) => {
// 	let call_type_id = req.body.call_type == "audio" ? 6 : 7
//   let status = await callsModel.chats.insert(req.body.conv_id, req.cookies.user_id, call_type_id)
// 	res.json({status: status})
// }
// callsController.make_call_groups = async (req, res) => {
// 	let call_type_id = req.body.call_type == "audio" ? 6 : 7
//   let status = await callsModel.groups.insert(req.body.conv_id, req.cookies.user_id, call_type_id)
// 	res.json({status: status})
// }
// callsController.update_call_length_chats = async (req, res) => { //change //update
// 	let call_type = req.body.call_type == "audio" ? 6 : 7
// 	// we need a way to identify a row uniquely. by time_created or by primary key
//   let status = await callsModel.chats.update(req.body.conv_id, req.cookies.user_id, call_type, req.body.time)
// 	res.json({status: status})
// }
// callsController.update_call_length_groups = async (req, res) => {
// 	let call_type = req.body.call_type == "audio" ? 6 : 7
//   let status = await callsModel.groups.update(req.body.conv_id, req.cookies.user_id, call_type, req.body.time)
// 	res.json({status: status})
// }

// export default callsController
