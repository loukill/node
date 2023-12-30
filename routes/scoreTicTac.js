import  express  from "express";
import { addScore, getScore } from "../controllers/ScoreTicTac.js";


const router = express.Router()
router.post('/', addScore);
router.get('/', getScore);

export default router;