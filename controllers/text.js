import Texte from "../models/text.js"

class textController {
    constructor() {}

    async creerTexte(req, res) {
        try {
            const { contenu } = req.body;
            const nouveauTexte = new Texte({ contenu });
            const texteEnregistre = await nouveauTexte.save();
            res.status(201).json(texteEnregistre);
        } catch (erreur) {
            res.status(400).json({ erreur: erreur.message });
        }
    }

    async lireTexte(req, res) {
        try {
            const texte = await Texte.findById(req.params.id);
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
            const texteSupprime = await Texte.findByIdAndRemove(req.params.id);
            if (!texteSupprime) {
                return res.status(404).json({ erreur: "Texte introuvable." });
            }
            res.json({ message: "Texte supprimé avec succès." });
        } catch (erreur) {
            res.status(500).json({ erreur: erreur.message });
        }
    }
}

export default textController;