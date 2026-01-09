import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFilename = Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image are allowed."), false);
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
