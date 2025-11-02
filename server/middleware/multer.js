import multer from "multer";


// create middleware for multer that add image in req.files
const upload = multer({
    storage: multer.diskStorage({})
})

export default upload