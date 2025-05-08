const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      id: {
        type: Number,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      img: {  
        type: String,
        required: true,
      },
      details: {  
        type: String,
        required: true,        
      },
      cat: {  
        type: String,
        required: true, 
      },
      type: { 
        type: String,
        required: true, 
      }
    },
    {
      timestamps: true, 
    }
  );
  
const Product = mongoose.model("Product", productSchema);
module.exports= Product