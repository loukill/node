import mongoose from "mongoose";

const { Schema, model } = mongoose;

const texteSchema = new Schema({
    contenu: String,
    dateCreation: { type: Date, default: Date.now },
    txtCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TextCategory' // Assurez-vous que cela correspond au nom de votre modèle de catégorie de texte
    }
});

const Texte = model('Texte', texteSchema);

export default Texte;