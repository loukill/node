import Texte from "../models/text.js"
import { io } from "../server.js";
import mongoose from 'mongoose';

class textController {
    constructor() {}

    async creerTexte(req, res) {
        try {
            const {title , contenu } = req.body;
            const nouveauTexte = new Texte({ title, contenu });
            const texteEnregistre = await nouveauTexte.save();
        
            io.emit('texteCree', texteEnregistre);
            res.status(201).json(texteEnregistre);
          } catch (erreur) {
            res.status(500).json({ erreur: erreur.message });
          }
        };
    
    

    async lireTexte(req, res) {
        try {
            const texteId = req.params.id; // Utiliser l'ID du texte directement
            if (!mongoose.Types.ObjectId.isValid(texteId)) {
                return res.status(400).json({ erreur: "ID de texte invalide." });
            }
    
            const texte = await Texte.findById(texteId);
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
            const texteId = req.params.id;
            const { title, contenu, police, taille } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(texteId)) {
                return res.status(400).json({ erreur: "ID de texte invalide." });
            }
    
            const miseAJour = { title, contenu, police, taille };
            const texteMaj = await Texte.findByIdAndUpdate(texteId, miseAJour, { new: true });
    
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

    async getTextById(req, res) {
        try {
            const texteId = req.params.id; // Utiliser l'ID du texte directement
            if (!mongoose.Types.ObjectId.isValid(texteId)) {
                return res.status(400).json({ message: "ID de texte invalide." });
            }
    
            const texte = await Texte.findById(texteId);
            if (!texte) {
                return res.status(404).json({ message: "Texte introuvable." });
            }
    
            res.status(200).json(texte);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const textes = await Texte.find({}); // Récupère tous les textes
            res.status(200).json(textes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    

    async enregistrerConsultation(req, res) {
        const texteId = req.params.textId;
    
        try {
            // Utilisez { _id: texteId } pour spécifier le critère de recherche
            const texte = await Texte.findOne({ _id: texteId });
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