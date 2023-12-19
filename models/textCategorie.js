import mongoose from "mongoose";

const {Schema, model} = mongoose;

const textCategorySchema = new Schema (
    {
        title : {
            type: String,
            required: true,
            unique: true,
            maxlength: 50
        },
        consultationsCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },    
    { collection: 'textcategories' })

export default model('TextCategory', textCategorySchema);