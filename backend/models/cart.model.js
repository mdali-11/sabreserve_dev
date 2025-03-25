
// const mongoose =require("mongoose")

// const cartSchema =mongoose.Schema({
//     image: { type: String, required: true },
//     title: { type: String, required: true },
//     mrp: { type: Number, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     rating: { type: Number, default:1,min: 1, max: 5 },
//     review: { type: Number, default:1 },
//     quantity:{type:Number,default:1},
//     userId :{type:String, required:true},
//     refId :{type:String,required:true}
// })

// const cartModel =mongoose.model('cart',cartSchema)

// module.exports ={cartModel}

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: { type: Number, required: true, default:1 },
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const cartModel = mongoose.model('cart', cartSchema);

module.exports = { cartModel };

