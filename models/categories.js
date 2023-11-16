import mongoose from "mongoose";

const {Schema, model} = mongoose;

const categorySchema = new Schema (
    {
        title : {
            type: String,
            required: true,
            unique: true,
            maxlength: 50
        }
    },
    {
        timestamps: true,
    }    
)

export default model('Category', categorySchema);