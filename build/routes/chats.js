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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../controllers/chats"));
const router = (0, express_1.Router)();
router.post("/previous/conv", controller.previousConv);
router.post("/search_new", controller.search_new);
router.post("/create", controller.create);
router.post("/previous/media", controller.previousMedia);
// router.get("/media_file/:chat_id/:chat_media_id/:extension", controller.getMediaFile)
router.post("/sendMedia/message", controller.sendMediaMessage);
// router.post("/sendMedia/files", uploadFile.array('files', 10), controller.sendMediaFiles)
// chatRouter.post("/update_delivered_seen", async update_delivered_seen)
// router.post("/leave", controller.leave)
// router.post("/delete", controller.delete)
// router.post("/unblock", controller.unblock)
exports.default = router;
