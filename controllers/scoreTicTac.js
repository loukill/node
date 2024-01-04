import ScoreTicTac from "../models/scoreTicTac.js";

export const addScore = async (req, res) => {
    try {
        const { userName, score } = req.body;
        const newScore = new ScoreTicTac({ userName, score });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getScore = async (req,res) => {
    try {
        const scores = await ScoreTicTac.find(); // Récupère tous les scores
        res.status(200).json({
          status: 'success',
          data: {
            scores: scores
          }
        });
      } catch (err) {
        res.status(500).json({
          status: 'error',
          message: err
        });
      }
};