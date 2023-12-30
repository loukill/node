import mongoose from "mongoose";

const {Schema, model} = mongoose;

const ScoreTicTacSchema = new Schema ({
    userName : {
        type: String,
        required: true
    },
    score : {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
)

const ScoreTicTac = model('ScoreTicTac', ScoreTicTacSchema);

export default ScoreTicTac;