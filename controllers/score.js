import Score from "../models/score.js";

export const addScore = async (req, res) => {
    try {
        const newScore = new Score({
            username: req.body.username,
            score: req.body.score,
            date: req.body.date || new Date() // Utilisez la date actuelle si aucune date n'est fournie
        });

        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getScore = async (req,res) => {
    try {
        const scores = await Score.find(); // Récupère tous les scores
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

export const getStatistics = async (req, res) => {
    try {
        const stats = await Score.aggregate([
            {
                $group: {
                    _id: null,
                    averageScore: { $avg: "$score" },
                    maxScore: { $max: "$score" },
                    minScore: { $min: "$score" },
                    stdDeviation: { $stdDevSamp: "$score" }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: stats
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};
