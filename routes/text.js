import express from 'express';
import TextController from '../controllers/text.js';
import Texte from '../models/text.js'; // Assurez-vous que votre modèle Texte est un module ES6
import googleTTS from 'google-tts-api';

const router = express.Router();

const textController = new TextController();

router.post('/', textController.creerTexte.bind(textController));
router.get('/:id', textController.lireTexte.bind(textController));
router.put('/:id', textController.mettreAJourTexte.bind(textController));
router.delete('/:id', textController.supprimerTexte.bind(textController));
router.get('/synthese/:id', async (req, res) => {
    try {
      const texte = await Texte.findById(req.params.id);
      if (!texte) {
        return res.status(404).json({ erreur: "Texte introuvable." });
      }
  
      // Utilisez la bibliothèque google-tts-api pour obtenir l'URL du fichier audio
      const url = googleTTS.getAudioUrl(texte.contenu, {
        lang: 'fr', // Langue (français dans cet exemple)
        slow: false, // Vitesse de synthèse vocale (false pour la vitesse normale)
        host: 'https://translate.google.com',
      });
  
      // Vous pouvez renvoyer l'URL du fichier audio ou l'utiliser comme bon vous semble
      res.json({ audioUrl: url });
    } catch (erreur) {
      res.status(500).json({ erreur: erreur.message });
    }
  });
export default router;