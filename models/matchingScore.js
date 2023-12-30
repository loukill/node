import mongoose from "mongoose";

const matchingScoreSchema = new mongoose.Schema({
    score: Number,
    date: Date
});

const MatchingScore = mongoose.model('MatchingScore', matchingScoreSchema);

export default MatchingScore;