import express from "express";
import { body } from 'express-validator';
import multer from '../middlewares/multer-config.js';

//getAllProduct,getProductsBycategory,deleteProductByID,updateProduct

import {addOneArticals } from "../controllers/artical.js";
const router = express.Router();
//import upload from "../middlewares/uploads"


router.route("/articals").post(multer("image",512*1024),
    body("title").isLength({min:0,max:100}),
    body("body").isLength({min:0,max:500}),
    body("author").isLength({min:0,max:50}),
    addOneArticals);

/*
router.route("/articals").get(getAllA);   

router.route("/articals/:category").get(getProductsBycategory);   

router.route("/articals/:articalId").delete(deleteProductByID); 

router.route("/articals/:id").put(updateProduct); 

*/

export default router;