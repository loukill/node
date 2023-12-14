import Category from "../models/categories.js";
import { validationResult } from "express-validator";


export async function getAll(req, res) {
  try {
    let docs = await Category.find({});
    let list = docs.map(doc => ({
      id: doc._id,
      title: doc.title,
      image: doc.image
    }));
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


export async function getCategory(req, res) {
  try {
    let doc = await Category.findById(req.params.id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}




export async function addOnce(req, res) {
  try {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ error: validationResult(req).array() });
    }

    let newCategory = await Category.create({
      title: req.body.title,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    });

    res.status(200).json({
      title: newCategory.title,
      image: newCategory.image
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


export async function putOnce(req, res) {
  try {
    let newCategory = req.file ? {
      title: req.body.title,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    } : {};

    await Category.findByIdAndUpdate(req.params.id, newCategory);
    let updatedCategory = await Category.findById(req.params.id);

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function deleteCategory(req, res) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json({ message: "Category successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



  