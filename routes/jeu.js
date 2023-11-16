import { Router } from 'express';
import { getGameState, handleFlipCard } from '../controllers/jeu.js';

const router = Router();

router.get('/state', getGameState);
router.post('/flip', handleFlipCard);


export default router;