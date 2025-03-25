
// const mongoose =require("mongoose")

// const orderSchema =mongoose.Schema({
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

// const orderModel =mongoose.model('order',orderSchema)

// module.exports ={orderModel}



// const mongoose=require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     orderItems: [
//       {
//         title: { type: String, required: true },
//         image: { type: String, required: true },
//         price: { type: Number, required: true },
//         qty: { type: Number, required: true },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'product',
//           required: true,
//         },
//       },
//     ],
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
//     shipping: {
//       address: String,
//       city: String,
//       postalCode: String,
//       country: String,
//     },
//     payment: {
//       paymentMethod: String,
//       paymentResult: {
//         orderID: String,
//         payerID: String,
//         paymentID: String,
//       },
//     },
//     itemsPrice: Number,
//     taxPrice: Number,
//     shippingPrice: Number,
//     totalPrice: Number,
//     isPaid: { type: Boolean, required: true, default: false },
//     paidAt: Date,
//     isDelivered: { type: Boolean, required: true, default: false },
//     deliveredAt: Date,
//   },
//   {
//     timestamps: true,
//   }
// );
// const orderModel = mongoose.model('order', orderSchema);

// module.exports={orderModel}


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shipping: {
      address:String,
      city:String,
      postalCode:String,
      country:String,
      countryCode:String,
      phone:String
    },
    payment: {
      paymentMethod: { type: String },
      paymentResult: {
        orderID: { type: String },
        payerID: { type: String },
        paymentID: { type: String },
      },
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('order', orderSchema);

module.exports = { orderModel };

