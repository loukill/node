import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const ProductSchema = new Schema({

    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    category: {
        type:String,
        required:true
    },
},
    {
        timestamp: true
    }
);

export default mongoose.model('product', ProductSchema);