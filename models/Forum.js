// models/Forum.js
import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type:String,
    required: true,
}
  // Ajoutez d'autres champs selon les besoins de votre application
  // Par exemple, un champ pour stocker l'ID de l'utilisateur qui a créé le forum.
});

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;
