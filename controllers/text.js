import Texte from "../models/text.js"
import textCategorie from "../models/textCategorie.js"
import mongoose from 'mongoose';

class textController {
    constructor() {}

    async creerTexte(req, res) {
        try {
            const { contenu, txtCategoryId, police, taille } = req.body;
    
            // Vérifiez si l'ID de la catégorie de texte est fourni et est valide
            if (!txtCategoryId || !mongoose.Types.ObjectId.isValid(txtCategoryId)) {
                return res.status(400).json({ erreur: "ID de catégorie de texte invalide ou manquant." });
            }
    
            // Vérifiez si la catégorie de texte existe
            const categoryExists = await textCategorie.findById(txtCategoryId);
            if (!categoryExists) {
                return res.status(404).json({ erreur: "Catégorie de texte introuvable." });
            }
    
            const nouveauTexte = new Texte({ contenu, txtCategoryId, police, taille  });
            const texteEnregistre = await nouveauTexte.save();
            res.status(201).json(texteEnregistre);
        } catch (erreur) {
            res.status(400).json({ erreur: erreur.message });
        }
    }
    
    

    async lireTexte(req, res) {
        try {
            const categoryId = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                return res.status(400).json({ erreur: "ID de catégorie invalide." });
            }
    
            const texte = await Texte.findOne({ txtCategoryId: categoryId });
            if (!texte) {
                return res.status(404).json({ erreur: "Texte introuvable pour cette catégorie." });
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
                { contenu, police, taille },
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

    async getTextByCategoryId(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const text = await Texte.findOne({ txtCategoryId: categoryId });
            
            if (!text) {
                return res.status(404).json({ message: "Text not found for this category." });
            }
    
            res.status(200).json(text);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async enregistrerConsultation(req, res) {
        const { texteId } = req.body;
    
        try {
            const texte = await Texte.findById(texteId);
            if (!texte) {
                return res.status(404).json({ message: 'Texte non trouvé.' });
            }
    
            // Incrémenter un compteur général de consultations
            texte.consultationsCount = (texte.consultationsCount || 0) + 1;
    
            await texte.save();
            res.status(200).json({ message: 'Consultation enregistrée.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    

    async obtenirStatistiques(req, res) {
        const { texteId } = req.params;

    try {
      const texte = await Texte.findById(texteId).populate('consultations.userId', 'nom');
      if (!texte) {
        return res.status(404).json({ message: 'Texte non trouvé.' });
      }

      const statistiques = texte.consultations.map(c => ({
        utilisateur: c.userId.nom, // ou tout autre champ pertinent de l'utilisateur
        consultations: c.count
      }));

      res.status(200).json(statistiques);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
    

export default textController;