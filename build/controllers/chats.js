"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendMediaMessage = exports.previousMedia = exports.create = exports.search_new = exports.previousConv = void 0;
// import models from '../models/all'
const users = __importStar(require("../models/users"));
const chats = __importStar(require("../models/chats"));
/*interface Models {
    users: any,
    chats: any,
}*/
let models = {
    users: users,
    chats: chats,
};
function previousConv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let rows = yield models.chats.index.select(req.cookies.user_id);
        let p = {};
        console.log('gh', rows);
        for (let i = 0; i < rows.length; i++) {
            let chat_id = rows[i].chat_id;
            let user = yield models.chats.members.select(chat_id, req.cookies.user_id);
            console.log(54986514814, user);
            p[chat_id] = Object.assign(Object.assign({}, user), { unread: 0 });
        }
        // res.status(404)
        // res.sendStatus(404)
        res.json(p);
    });
}
exports.previousConv = previousConv;
function search_new(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = [];
        let chats = yield models.chats.index.select(req.cookies.user_id);
        for (let i = 0; i < chats.length; i++) {
            let user = yield models.chats.members.select(chats[i].chat_id, req.cookies.user_id);
            users.push(user.user_id);
        }
        console.log(chats, users);
        let rows = [];
        let all = yield models.users.select.search(req.body.q);
        all.forEach((a) => {
            rows.push(a);
            for (let i = 0; i < users.length; i++) {
                if (a.user_id == users[i]) {
                    rows.pop();
                    break;
                }
            }
        });
        console.log(all, rows);
        res.send(rows);
    });
}
exports.search_new = search_new;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let conv_id = yield models.chats.index.insert(req.cookies.user_id);
        let rows1 = yield models.chats.members.insert(conv_id, req.cookies.user_id);
        let rows2 = yield models.chats.members.insert(conv_id, req.body.user_id);
        res.json({ status: 'success', conv_id: conv_id });
    });
}
exports.create = create;
function previousMedia(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(typeof (req.cookies.user_id));
        let rows = yield models.chats.media.select(req.body.conv_id);
        res.json(rows);
    });
}
exports.previousMedia = previousMedia;
function sendMediaMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let media_id = yield models.chats.media.insert(req.body.conv_id, req.cookies.user_id, 1, req.body.text);
        //text //data
        res.json({ media_id: media_id });
    });
}
exports.sendMediaMessage = sendMediaMessage;
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
