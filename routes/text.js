import express from 'express';
import TextController from '../controllers/text.js';
import Texte from '../models/text.js'; // Assurez-vous que votre modèle Texte est un module ES6
import googleTTS from 'google-tts-api'; 

const router = express.Router();


const textController = new TextController();


router.post('/', textController.creerTexte.bind(textController));
router.get('/txtCategory/:CategoryId/:textId', textController.getTextByCategoryAndId)
router.get('/:id', textController.lireTexte.bind(textController));
router.put('/:id', textController.mettreAJourTexte.bind(textController));
router.delete('/:id', textController.supprimerTexte.bind(textController));
router.get('/synthese/:id', async (req, res) => {
  try {
      console.log("Fetching Texte with ID:", req.params.id);
      const texte = await Texte.findById(req.params.id);
      if (!texte) {
          console.log("Texte not found for ID:", req.params.id);
          return res.status(404).json({ erreur: "Texte introuvable." });
      }

      try {
          console.log("Calling googleTTS.getAudioUrl for:", texte.contenu);
          const url = googleTTS.getAudioUrl(texte.contenu, {
            lang: 'fr',
            slow: false,
            host: 'https://translate.google.com',
          });
          console.log("Received URL from googleTTS:", url);
          res.json({ audioUrl: url });
      } catch (erreur) {
          console.error("Error in googleTTS.getAudioUrl:", erreur.message);
          res.status(500).json({ erreur: erreur.message });
      }
  } catch (erreur) {
      console.error("Error in /synthese/:id route:", erreur.message);
      res.status(500).json({ erreur: erreur.message });
  }
});


export default router;