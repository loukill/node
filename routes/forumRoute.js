// routes/forumRoute.js
import express from "express";
import multerConfig from "../middelwares/multer-config.js";
import{ body } from "express-validator";
import {getAllForums, getForumById, addOnce, updateForum, deleteForum} from '../controllers/forumController.js';


const router = express.Router();

const upload = multerConfig('image', {fileSize: 5 * 1024 * 1024})

router.route('/')
.get(getAllForums)
.post(upload,
  body("title"), 
  body("description"),
  addOnce
  );

router.route("/:id")
.get(getForumById)
.put(updateForum)
.delete(deleteForum)




export default router;
