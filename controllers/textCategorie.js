import txtCategory from "../models/textCategorie.js";
import { validationResult } from "express-validator";


export function getAll(req, res) {
    txtCategory.find({}).then((docs) => {
      let list = [];
      for (let i = 0; i < CtxtCategory.length; i++) {
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

export function gettxtCategory(req,res) {
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