import MatchingScore from "../models/matchingScore.js";
import moment from "moment";


export const addScore = async (req, res) => {
    try {
        const newScore = new MatchingScore({
            score: req.body.score,
            date: req.body.date || new Date() // Utilisez la date actuelle si aucune date n'est fournie
        });

        await newScore.save();
        res.status(201).json({
            ...newScore.toObject(),
            date: moment(newScore.date).format('DD/MM/YYYY à HH:mm') // Format de la date pour l'affichage
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getScores = async (req, res) => {
    try {
        const scores = await MatchingScore.find().sort({ date: -1 }); // Récupère tous les scores et les trie par date

        const formattedScores = scores.map(score => ({
            ...score.toObject(),
            date: moment(score.date).format('DD/MM/YYYY à HH:mm') // Formatage de la date
        }));

        res.status(200).json(formattedScores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};