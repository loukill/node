import mongoose from "mongoose";

const { Schema, model } = mongoose;

const texteSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },  
    contenu: String,
    dateCreation: { type: Date, default: Date.now },
    police: String,
    taille: Number,
    consultationsCount: { type: Number, default: 0 },
}, {
    timestamps: true
});

const Texte = model('Texte', texteSchema);

export default Texte;
