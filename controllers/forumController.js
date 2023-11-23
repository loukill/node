// controllers/forumController.js
import Forum from "../models/Forum.js";

// Fonction pour récupérer tous les forums
export const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour créer un nouveau forum
export const createForum = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const newForum = new Forum({ title, description, image });
    const savedForum = await newForum.save();
    res.status(201).json(savedForum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
