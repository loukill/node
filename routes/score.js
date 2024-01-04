import express from 'express';
import { addScore, getScore , getStatistics} from '../controllers/score.js'; 

const router = express.Router();

router.post("/", addScore);
router.get("/", getScore);
router.get("/statistic", getStatistics)

export default router;