import mongoose from "mongoose";

const {Schema, model} = mongoose;

const categorySchema = new Schema (
    {
        title : {
            type: String,
            required: true,
            unique: true,
            maxlength: 50
        },
        image : {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }    
)

export default model('Category', categorySchema);