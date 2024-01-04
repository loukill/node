import Jeu from '../models/jeu.js';

const jeu = new Jeu();

export function getGameState(req, res) {
  res.json(jeu);
}

export function handleFlipCard(req, res) {
  const cardId = req.body.cardId;
  jeu.flipCard(cardId);
  res.json(jeu);
}
