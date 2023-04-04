
import multer from 'multer'
const uploadFile = multer({
	dest: 'data/temp'
})

export default uploadFile
