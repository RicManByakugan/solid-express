const multer = require("multer");

const storage = multer.memoryStorage();

exports.upload_memory = multer({ storage });