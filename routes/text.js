import express from 'express';
import TextController from '../controllers/text.js';
import Texte from '../models/text.js'; // Assurez-vous que votre modèle Texte est un module ES6
import googleTTS from 'google-tts-api';

const router = express.Router();


const textController = new TextController();


router.post('/', textController.creerTexte.bind(textController));
router.get('/lireTexte/:id', textController.lireTexte.bind(textController));
router.get('/:id', textController.getTextById.bind(textController));
router.get('/', textController.getAll.bind(textController))
router.put('/:id', textController.mettreAJourTexte.bind(textController));
router.delete('/:id', textController.supprimerTexte.bind(textController));
router.get('/:texteId/statistiques', textController.obtenirStatistiques);
router.post('/:textId/consulter', textController.enregistrerConsultation.bind(textController))
router.get('/synthese/parTexte/:id', async (req, res) => {
    try {
        console.log("Fetching Texte for Text ID:", req.params.id);
        const texte = await Texte.findById(req.params.id);

        if (!texte) {
            console.log("Texte not found for Text ID:", req.params.id);
            return res.status(404).json({ erreur: "Texte introuvable pour cet ID." });
        }

        const maxChar = 200; // Ajustez la longueur maximale de caractères par requête TTS
        const textChunks = splitIntoChunks(texte.contenu, maxChar);
        let urls = [];

        for (const chunk of textChunks) {
            console.log("Calling googleTTS.getAudioUrl for chunk:", chunk);
            const url = await googleTTS.getAudioUrl(chunk, {
                lang: 'fr',
                slow: false,
                host: 'https://translate.google.com',
            });
            console.log("Received URL from googleTTS:", url);
            urls.push(url);
        }

        res.json({ audioUrls: urls });
    } catch (erreur) {
        console.error("Error in googleTTS.getAudioUrl:", erreur.message);
        res.status(500).json({ erreur: erreur.message });
    }
});

function splitIntoChunks(text, maxChar) {
    let chunks = [];
    for (let i = 0; i < text.length; i += maxChar) {
        const chunk = text.substring(i, Math.min(text.length, i + maxChar));
        chunks.push(chunk);
    }
    return chunks;
};



export default router;