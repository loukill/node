import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const ArticalSchema = new Schema({

    image:{
        type: String,
        required: true
      },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
      },
    body:{
        type: String,
        required: true
      },
      /*
    date:{
        type: String,
        required: true
      },
      
    updated:{
        type: String,
        default: 'not updated'
      },
    */
     
},
    {
        timestamp: true
    }
);

export default mongoose.model('artical', ArticalSchema);