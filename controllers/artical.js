import artical from "../models/artical.js";
import { validationResult } from 'express-validator';

export async function addOneArticals(req, res) {
    console.log("Artical added seccuffuly");
   if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }else{
    console.log(req.body.title);
    const newArtical = new artical ();
    
    newArtical.title= req.body.title;
    newArtical.body = req.body.body;
    newArtical.image = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
    newArtical.author = req.body.author;
  
    newArtical.save();
    
  
    res.status(201).send({ newArtical });
  }};


  export function getAllA(req, res) {
    artical
      .find()
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function getArticalsBycategory(req, res) {
    artical
      .find({ category: req.params.category })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }


  export async function deleteArticalByID(req, res, next) {
    try {
      
      const articalId = req.params.articaltId;


      if ( !(await artical.findById(articalId)) ) {
        return res.status(404).json({ error: 'artical  not found' });
      }
  
      
  
      // Construct the response JSON object
      const response = {
        articalId: articalId,
        _id: deletedArtical._id
      };
  
      return res.status(200).json(response); // Return the response JSON
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  export async function updateArtical(req, res, next) {
    try {
      const existingArtical = await artical.findById(req.params.id);
      if (!existingArtical) {
        return res.status(404).json({ message: ' not found' });
      }

      const updateArtical = await artical.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true    })
      res.status(200).json({ update: updateArtical });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  }
  
  