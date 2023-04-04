import { Router } from "express"
import * as controller from '../controllers/users'
import uploadFile from './uploadFile'

const router: Router = Router()

router.get("/create", controller.create)
router.post("/log_in", controller.log_in)
// router.post("/check_conv_name", controller.checkUserName)
// router.post("/check_pass_word", controller.checkPassword)
router.post("/info", controller.info)
// router.post("/update/info", controller.update_info)
// router.post("/update/icon", uploadFile.single('file'), controller.update_icon)
// router.post("/delete", controller.delete)

export default router
