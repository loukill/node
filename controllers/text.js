import Texte from "../models/text.js"
import textCategorie from "../models/textCategorie.js";
import mongoose from 'mongoose';

class textController {
    constructor() {}

    async creerTexte(req, res) {
        try {
            const { contenu, txtCategoryId } = req.body;
            

            // Vérifiez si categoryId est fourni
            if (!txtCategoryId) {
                return res.status(400).json({ message: "txtCategoryId is required." });
            }

            // Vérifiez si la catégorie existe
            const categoryExists = await textCategorie.findById(txtCategoryId);
            if (!categoryExists) {
                return res.status(404).json({ message: "Category not found." });
            }

            const nouveauTexte = new Texte({ contenu, txtCategoryId });
            const texteEnregistre = await nouveauTexte.save();
            res.status(201).json(texteEnregistre);
        } catch (erreur) {
            res.status(400).json({ erreur: erreur.message });
        }
    }


    async getTextByCategoryAndId(req, res) {
        try {
            const { CategoryId, textId } = req.params;
            
            console.log(`Searching for Text with ID: ${textId} and Category ID: ${CategoryId}`);

            
            const text = await Texte.findOne({ 
                _id: new mongoose.Types.ObjectId(textId), 
                txtCategoryId: new mongoose.Types.ObjectId(CategoryId) 
            });
    
            console.log(`Query result: `, text);
    
            if (!text) {
                return res.status(404).json({ message: "Text not found in the specified category." });
            }
    
            res.json(text);
        } catch (erreur) {
            console.error(`Error in getTextByCategoryAndId: `, erreur);
            res.status(500).json({ erreur: erreur.message });
        }
    }
    

    
    

    async lireTexte(req, res) {
        try {
            const texte = await Texte.findById(req.params.id).populate('txtCategoryId');
            if (!texte) {
                return res.status(404).json({ erreur: "Texte introuvable." });
            }
            res.json(texte);
        } catch (erreur) {
            res.status(500).json({ erreur: erreur.message });
        }
    }

    async mettreAJourTexte(req, res) {
        try {
            const { contenu } = req.body;
            const texteMaj = await Texte.findByIdAndUpdate(
                req.params.id,
                { contenu },
                { new: true }
            );
            if (!texteMaj) {
                return res.status(404).json({ erreur: "Texte introuvable." });
            }
            res.json(texteMaj);
        } catch (erreur) {
            res.status(500).json({ erreur: erreur.message });
        }
    }

    async supprimerTexte(req, res) {
        try {
            // Log the ID for debugging purposes
            console.log("Attempting to delete Texte with ID:", req.params.id);
    
            // Check if the ID format is valid for MongoDB
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ erreur: "ID invalide." });
            }
    
            // Attempt to find and delete the document
            const texteSupprime = await Texte.findByIdAndDelete(req.params.id);
    
            // Check if the document was not found
            if (!texteSupprime) {
                return res.status(404).json({ erreur: "Texte introuvable." });
            }
    
            // Confirm deletion
            res.json({ message: "Texte supprimé avec succès." });
        } catch (erreur) {
            // Log the error for debugging purposes
            console.error("Error in supprimerTexte:", erreur.message);
            res.status(500).json({ erreur: erreur.message });
        }
    }
    
}

export default textController;