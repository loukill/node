import express from "express";
import { body } from 'express-validator';
import multer from '../middelwares/multer-config.js';

//getAllProduct,getProductsBycategory,deleteProductByID,updateProduct

import {addOneArticals, getAllA,getArticalsBycategory,deleteArticalByID,updateArtical } from "../controllers/artical.js";
const router = express.Router();
//import upload from "../middlewares/uploads"


router.route("/articals").post(multer("image",512*1024),
    body("title").isLength({min:0,max:100}),
    body("body").isLength({min:0,max:500}),
    body("author").isLength({min:0,max:50}),
    addOneArticals);


router.route("/articals").get(getAllA);   
 

router.route("/articals/:articalId").delete(deleteArticalByID); 

router.route("/articals/:id").put(updateArtical); 

export default router;