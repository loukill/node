import  express  from "express";
import { getAll, addOnce, getCategory, putOnce, deleteCategory } from "../controllers/categories.js";  
import { body } from "express-validator";
import multerConfig from "../middelwares/multer-config.js"

const router = express.Router();

const upload = multerConfig('image', {fileSize: 5 * 1024 * 1024})

router.route("/")
.get(getAll)
.post(
    body('title'),
    upload,
    addOnce
);

router.route("/:id")
.get(getCategory)
.put(
    upload,
    body('title'),
    putOnce
)
.delete(deleteCategory);

export default router;