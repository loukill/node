import mongoose from "mongoose";

const { Schema, model } = mongoose;

const texteSchema = new Schema({
    contenu: String,
    dateCreation: { type: Date, default: Date.now },
    txtCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TextCategory' 
    },
    police: String, 
    taille: Number  
});

const Texte = model('Texte', texteSchema);

export default Texte;