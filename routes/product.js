import express from "express";
import { body } from 'express-validator';
import multer from '../middelwares/multer-config.js';
import product from "../models/product.js";



import {addOneProduct, getAllProduct,getProductsByAvailability,updateProduct} from "../controllers/product.js";
const router = express.Router();
//import upload from "../middlewares/uploads"


router.post('/', multer, [
    //body('image', 'Invalid image').isLength({ min: 1 }), // Replace the image validation as required
    body('name', 'Name should be at least 5 characters').isLength({ min: 5 }),
    body('description', 'Description should be at least 5 characters').isLength({ min: 5 }),
    body('price', 'Price should be numeric').isNumeric(),
    body('quantity', 'Quantity should be numeric').isNumeric(),
  ], async (req, res) => {
    try {
      const newProduct = await product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        //image: req.body.image, // Replace with your image handling logic
        category: req.body.category, // Add category handling logic if needed
      });
  
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.route("/products").get(getAllProduct);   

router.route("/products/:availability").get(getProductsByAvailability);   

router.delete("/products/delete/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedProduct = await product.findByIdAndDelete(_id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
 

router.route("/products/:id").put(updateProduct); 



export default router;