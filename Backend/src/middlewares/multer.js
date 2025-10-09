import multer from "multer";
import path from "path";

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Files will be saved in the '/public/tmp/' directory in the backend directory.
    cb(null, "./public/tmp"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  // Regular expression to check for common image file extensions
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Error: File upload only supports the following filetypes - " + allowedFileTypes), false);
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});