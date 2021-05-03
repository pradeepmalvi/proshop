import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'upload/');
	},
	filename(req, file, cb) {
		cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalnames)}}`);
	},
});


export default router;
