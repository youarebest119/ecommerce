const express = require('express');

const { upload } = require("../middlewares/multer")

const ImageController = require('../controllers/image');

const router = express.Router()

router.post("/upload-single", upload.single("image"), ImageController.importSingle); // image

router.post("/upload-array", upload.array("image"), ImageController.importArray);

const uploadMultiple = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])
router.post('/upload-multiple', uploadMultiple, ImageController.importMultiple); // gallery // image

router.delete('/delete', ImageController.deleteFile);


module.exports = router