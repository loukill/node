import express from 'express';
import { addScore, getScores } from '../controllers/matchingScore.js'; 

const router = express.Router();

router.post("/", addScore);
router.get("/", getScores)

export default router; 