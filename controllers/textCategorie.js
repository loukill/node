import txtCategory from "../models/textCategorie.js";
import { validationResult } from "express-validator";


export function getAll(req, res) {
  txtCategory.find({}).then((docs) => {
    let list = [];
    for (let i = 0; i < docs.length; i++) {
      list.push({
        id: docs[i]._id,
        title: docs[i].title,
      });
    }
    res.status(200).json(list);
  })
  .catch((err) => {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: err })
  })
}



export function getTxtCategory(req,res) {
    txtCategory.findById(req.params.id)
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch((err) => {
        res.status(500).json({error : err})
    })
}

export function addOnce(req,res) {
    if(!validationResult(req).isEmpty()){
        res.status(200).json({error: validationResult(req).array()})
    }else {
        txtCategory.create({
            title: req.body.title
        })
        .then((newTxtCategory) => {
            res.status(200).json({
                title: newTxtCategory.title
            })
        })
        .catch((err) => {
            res.status(500).json({error : err})
        })
    }
}

export function putOnce(req, res) {
    txtCategory.findByIdAndUpdate(req.params.id, req.body)
      .then((doc1) => {
        txtCategory.findById(req.params.id)
          .then((doc2) => {
            res.status(200).json(doc2);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}

export async function deleteTxtCategory(req, res) {
  const id = req.params.id;
  console.log("Requested to delete category with ID:", id);

  try {
    const deletedTxtCategory = await txtCategory.findByIdAndDelete(id);
    if (!deletedTxtCategory) {
      console.log("No category found with ID:", id);
      return res.status(404).json({ error: "Text category not found." });
    }
    console.log("Category deleted:", deletedTxtCategory);
    res.json({ message: "Text category successfully deleted." });
  } catch (error) {
    console.error("Error in deleting category:", error);
    res.status(500).json({ error: error.message });
  }
}
