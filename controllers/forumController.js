// controllers/forumController.js
import Forum from "../models/Forum.js";
import{validationResult} from "express-validator";

// Fonction pour récupérer tous les forums
export const getAllForums = async (req, res) => {
  try {
    let docs = await Forum.find({});
    let list = docs.map(doc => ({
      id: doc._id,
      title: doc.title,
      description: doc.description,
      image: doc.image
    }));
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// Fonction pour créer un nouveau forum
export const addOnce = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const { title, description } = req.body;

  try {
    const newForum = new Forum({
      title: title,
      description: description,
      image: req.file.filename, // Assuming you want to store the image in the database as a buffer
    });

    const savedForum = await newForum.save();
    res.status(201).json(savedForum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export function addOnce(req, res) {

//   console.log(req.body);
//   console.log(req.file);
//   if (!validationResult(req).isEmpty()) {
//       console.log({ errors: validationResult(req).array() })
//       return res.status(400).json({ errors: validationResult(req).array() });
//   } else {
//       Forum.create({
//         title : req.body.title,
//      description: req.body.description,
//      image: req.file.filename
//       })
//           .then((newEvent) => res.status(201).json("OK"))
//           .catch((err) => {
//               res.status(500).json({ error: err.message });
//           });
//   }

// }




// Fonction pour récupérer un forum par son ID
export const getForumById = async (req, res) => {
  const forumId = req.params.id;

  try {
    const forum = await Forum.findById(forumId);
    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour un forum par son ID
export const updateForum = async (req, res) => {
  const forumId = req.params.id;
  const { title, description, image } = req.body;

  try {
    const updatedForum = await Forum.findByIdAndUpdate(
      forumId,
      { title, description, image },
      { new: true }
    );

    if (!updatedForum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json(updatedForum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour supprimer un forum par son ID
export const deleteForum = async (req, res) => {
  const forumId = req.params.id;

  try {
    const deletedForum = await Forum.findByIdAndDelete(forumId);
    if (!deletedForum) {
      return res.status(404).json({ message: "Forum not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
