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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.get_file_data_icons = exports.update_info = exports.info = exports.check_pass_word = exports.check_user_name = exports.login = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const users = __importStar(require("../models/users"));
const cookieOptions = {
    // domain: `${process.env.CLIENT_HOSTNAME}:${process.env.CLIENT_PORT}`,
    path: '/',
    sameSite: 'lax',
    maxAge: 3600000000,
};
let models = {
    users: users,
};
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let row = yield models.users.select.fromUserName(req.body.userName);
        if (row) {
            res.status(200).json({ userNameIsAvailable: false, status: 'failed', error: 'username is not available' });
        }
        else {
            let userId = yield models.users.insert(req.body.title, req.body.userName, req.body.password);
            res.cookie('user_id', userId, cookieOptions);
            res.status(200).send({ status: 'success', user_id: userId });
        }
    });
}
exports.create = create;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.query.userName, req.query.password, req.body.userName, req.body.password);
        let row = yield models.users.select.from_user_name_and_pass_word(req.body.userName, req.body.password);
        // if (row.pass_word == req.body.pass_word) {
        if (row) {
            res.cookie('user_id', row.user_id, cookieOptions);
            console.log('cookie set successfully');
            res.status(200);
            res.send({ status: 'success', user_id: row.user_id });
        }
        else {
            res.status(500);
            res.json({
                status: 'failure',
                reason: 'username is not registered'
            });
        }
    });
}
exports.login = login;
function check_user_name(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let row = yield models.users.select.fromUserName(req.body.conv_name);
        res.send(row ? false : true);
    });
}
exports.check_user_name = check_user_name;
function check_pass_word(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let row = yield models.users.select.from_user_name_and_pass_word(req.body.user_name, req.body.pass_word);
        res.json(row ? true : false);
    });
}
exports.check_pass_word = check_pass_word;
function info(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield models.users.select.fromUserId(req.body.userId);
        res.send(data);
    });
}
exports.info = info;
function update_info(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = yield models.users.update(req.cookies.user_id, req.body.s); //or use spread operator
        res.json({ status: status });
    });
} /*
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
exports.update_info = update_info;
function get_file_data_icons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stream = fs_1.default.createReadStream(process.cwd() + `/data/icons/users/${req.params.file_name}`);
        stream.pipe(res);
    });
}
exports.get_file_data_icons = get_file_data_icons;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user_id = req.cookies.user_id;
        // delete/leave all channels, channel members and channel media
        // leave all groups, group members and group media
        // leave all chats and chat media
        // let status10 = await chatsModel.delete_all(user_id)
        // delete user
        let status50 = yield models.users.delete(user_id);
        res.json({ status: "success" });
    });
}
exports.deleteUser = deleteUser;
