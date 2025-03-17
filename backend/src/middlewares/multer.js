import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "D:/Customfoods/backend/public/uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)) 
});

export const upload = multer({
    storage,

    fileFilter: (req, file, cb) => 
        ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype) 
            ? cb(null, true) 
            : cb(new Error("Invalid file type"), false)
}).single("image")
