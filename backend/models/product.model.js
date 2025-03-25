
// const mongoose =require("mongoose")

// const productSchema =mongoose.Schema({
//     image: { type: String, required: true },
//     title: { type: String, required: true },
//     mrp: { type: Number, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     rating: { type: Number, default:1,min: 1, max: 5 },
//     review: { type: Number, default:1 },
//     sellerID :String
// })

// const productModel =mongoose.model('products',productSchema)

// module.exports ={productModel}


// import mongoose from 'mongoose';

const mongoose=require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0.0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
    sellerID:{type:String, required:true},
  },
  { timestamps: true }
);
const productModel = mongoose.model('product', productSchema);


module.exports={productModel}
