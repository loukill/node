import Category from "../models/categories.js";
import { validationResult } from "express-validator";
import fs from 'fs';
import path from 'path';


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

    // Supposons que l'image est envoyée sous forme de chaîne base64 dans req.body.imageBase64
    const imageBase64 = req.body.imageBase64;
    const buffer = Buffer.from(imageBase64, 'base64');
    const imagePath = `img_${Date.now()}.jpg`; // Générer un nom de fichier
    fs.writeFileSync(path.join('public/images', imagePath), buffer);

    let newCategory = await Category.create({
      title: req.body.title,
      image: `${req.protocol}://${req.get("host")}/img/${imagePath}`,
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
    // Créer un objet pour la mise à jour
    let updateData = {
      title: req.body.title
    };

    // Ajouter l'image au besoin
    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
    }

    // Mettre à jour la catégorie
    await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Récupérer la catégorie mise à jour
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



  