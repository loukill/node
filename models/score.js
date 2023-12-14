import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
    date: Date
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
