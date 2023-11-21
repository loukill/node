import mongoose from 'mongoose';
import User from '../models/user.js';

const utilisateurSchema = new mongoose.Schema({
  dateNaiss: { type: Date, required: true },
  Doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
});

const Utilisateur = User.discriminator('Utilisateur', utilisateurSchema);

export default Utilisateur;