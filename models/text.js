import mongoose from "mongoose";

const { Schema, model } = mongoose;

const texteSchema = new Schema({
    contenu: String,
    dateCreation: { type: Date, default: Date.now },
});

const Texte = model('Texte', texteSchema);

export default Texte;