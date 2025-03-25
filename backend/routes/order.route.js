// const express= require('express')
// const orderRouter =express.Router()
// const {orderModel} =require("../models/order.model")
// const {cartModel} =require("../models/cart.model")



// orderRouter.post("/",async(req,res)=>{
//     const {userId} =req.body;
//     console.log(userId)
 
//     try{
//       const data =await cartModel.find({userId:userId})
//       console.log()
//          if(data){
//             const Data =await orderModel.insertMany(data)
//             //  console.log(Data)
//             if(Data){
//               const DeletedData =await cartModel.deleteMany({userId:userId})
//               console.log(DeletedData)
//             }
//              res.send({"msg":"Ordered Successfully"})
//          }else{
//             res.status(400).send({"msg":"data not found"})
//          }
//       }
//      catch(err){
//         console.log(err)
//      res.send({"msg":"something went wrong"})
     
//     }
// })


// orderRouter.get("/order",async(req,res)=>{
//    try{
//       const Data =await orderModel.find()
//       res.send(Data)
//      }
//     catch(err){
//        console.log(err)
//     res.send({"msg":"something went wrong"})
    
//    }
// })

// module.exports ={orderRouter}

//  
// const express=require("express")
// const expressAsyncHandler =require('express-async-handler');
// const {productModel}=require("../models/product.model")
// const {orderModel}= require("../models/order.model")
// const {userModel} =require("../models/user.model")

// import { isAuth, isAdmin } from '../utils';


// in place of is Auth , isAdmin we have to use Middlewares  

// const orderRouter = express.Router();

// //bellow all are isauth nd is admin router
// orderRouter.get(
//   '/summary',
//   expressAsyncHandler(async (req, res) => {
//     const orders = await orderModel.aggregate([
//       {
//         $group: {
//           _id: null,
//           numOrders: { $sum: 1 },
//           totalSales: { $sum: '$totalPrice' },
//         },
//       },
//     ]);
//     const users = await userModel.aggregate([
//       {
//         $group: {
//           _id: null,
//           numUsers: { $sum: 1 },
//         },
//       },
//     ]);
//     const dailyOrders = await orderModel.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
//           orders: { $sum: 1 },
//           sales: { $sum: '$totalPrice' },
//         },
//       },
//     ]);
//     const productCategories = await productModel.aggregate([
//       {
//         $group: {
//           _id: '$category',
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     res.send({
//       users,
//       orders: orders.length === 0 ? [{ numOrders: 0, totalSales: 0 }] : orders,
//       dailyOrders,
//       productCategories,
//     });
//   })
// );
// orderRouter.get(
//   '/',
//   expressAsyncHandler(async (req, res) => {
//     const orders = await orderModel.find({}).populate('user');
//     res.send(orders);
//   })
// );

// //below all are isauth routere --> create middleware for isAuth

// orderRouter.get(
//   '/mine',
//   expressAsyncHandler(async (req, res) => {
//     const orders = await orderModel.find({ user: req.user._id });
//     res.send(orders);
//   })
// );
// orderRouter.get(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const order = await orderModel.findById(req.params.id);
//     if (order) {
//       res.send(order);
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );
// orderRouter.post(
//   '/',
//   expressAsyncHandler(async (req, res) => {
//     const order = new orderModel({
//       orderItems: req.body.orderItems,
//       user: req.user._id,
//       shipping: req.body.shipping,
//       payment: req.body.payment,
//       itemsPrice: req.body.itemsPrice,
//       taxPrice: req.body.taxPrice,
//       shippingPrice: req.body.shippingPrice,
//       totalPrice: req.body.totalPrice,
//     });
//     const createdOrder = await order.save();
//     res.status(201).send({ message: 'New Order Created', order: createdOrder });
//   })
// );
// orderRouter.delete(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const order = await orderModel.findById(req.params.id);
//     if (order) {
//       const deletedOrder = await order.remove();
//       res.send({ message: 'Order Deleted', product: deletedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

// orderRouter.put(
//   '/:id/pay',
//   expressAsyncHandler(async (req, res) => {
//     const order = await orderModel.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.payment.paymentResult = {
//         payerID: req.body.payerID,
//         paymentID: req.body.paymentID,
//         id: req.body.id,
//       };
//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Paid', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found.' });
//     }
//   })
// );

// orderRouter.put(
//   '/:id/deliver',
//   expressAsyncHandler(async (req, res) => {
//     const order = await orderModel.findById(req.params.id);
//     if (order) {
//       order.isDelivered = true;
//       order.deliveredAt = Date.now();
//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Delivered', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found.' });
//     }
//   })
// );

// module.exports= {orderRouter};


const express = require('express');
const {orderModel} = require("../models/order.model")
const {cartModel} = require("../models/cart.model")



const orderRouter = express.Router();

// Create an order
orderRouter.post('/add', async (req, res) => {
  const { shipping, paymentMethod } = req.body;
  const {userId} = req.body; // Assuming you have authentication middleware to set the user ID

  try {
    const cart = await cartModel.findOne({ user: userId }).populate('items.product', 'title image price');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const itemsPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const taxPrice = itemsPrice * 0.1; // Assuming 10% tax rate
    const shippingPrice = 10; // Assuming fixed shipping price of $10
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const newOrder = await orderModel.create({
      user : userId,
      orderItems,
      shipping,
      payment: {
        paymentMethod,
      },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Clear the cart after creating the order
    await cartModel.findOneAndDelete({ user: userId });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


// Get all orders
orderRouter.get('/', async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'title price image');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Get a specific order by ID
orderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await orderModel.findById(id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'title price image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Delete an order by ID
orderRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



module.exports = {orderRouter};



