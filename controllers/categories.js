import Category from "../models/categories.js";
import { validationResult } from "express-validator";


export function getAll(req, res) {
    Category.find({}).then((docs) => {
      let list = [];
      for (let i = 0; i < Category.length; i++) {
        list.push({
          id: docs[i]._id,
          title: docs[i].title,
        });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
  }

export function getCategory(req,res) {
    Category.findById(req.params.id)
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
        Category.create({
            title: req.body.title
        })
        .then((newCategory) => {
            res.status(200).json({
                title: newCategory.title
            })
        })
        .catch((err) => {
            res.status(500).json({error : err})
        })
    }
}

export function putOnce(req, res) {
    Category.findByIdAndUpdate(req.params.id, req.body)
      .then((doc1) => {
        Category.findById(req.params.id)
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
  