import { Router } from "express"
import * as controller from '../controllers/chats'
import uploadFile from './uploadFile'

const router: Router = Router()

router.post("/previous/conv", controller.previousConv)
router.post("/search_new", controller.search_new)
router.post("/create", controller.create)
router.post("/previous/media", controller.previousMedia)
// router.get("/media_file/:chat_id/:chat_media_id/:extension", controller.getMediaFile)
router.post("/sendMedia/message", controller.sendMediaMessage)
// router.post("/sendMedia/files", uploadFile.array('files', 10), controller.sendMediaFiles)
// chatRouter.post("/update_delivered_seen", async update_delivered_seen)
// router.post("/leave", controller.leave)
// router.post("/delete", controller.delete)
// router.post("/unblock", controller.unblock)

export default router
