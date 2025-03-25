// const express= require('express')
// const productRouter =express.Router()
// const {productModel} =require("../models/product.model")
// const {orderModel} =require("../models/order.model")


// productRouter.get("/:path",async(req,res)=>{
//    const category =req.params.path;
//    let arr =[{category:category}];
//    const query =req.query;
//    const page =query.page||1;
//    const limit=10;
//    const skip=(page-1)*limit;
//    let sortBy={}
//    if(query.price){
//     let [min,max] =query.price.split("-").map(Number)
//     arr.push({price:{$gte:min}})
//     arr.push({price:{$lte:max}})
//    }
//    if(query.sortBy){
//     if(query.sortBy=="asc"){
//         sortBy={
//            price:"asc"
//         }
//     }else{
//         if(query.sortBy=="desc"){
//             sortBy={
//                price:"desc"
//             }
//     }
//    }
// }
//     try{
//      const data = await productModel.find({$and:arr}).sort(sortBy).skip(skip).limit(limit);
//      console.log(data)
//      res.json(data)
//     }catch(err){
//         console.log(err)
//         res.send(err)
//     }
// })

// productRouter.post("/addproduct", async (req, res) => {
//     const payload = req.body;
//     try {
//       const newProduct = new productModel(payload);
//       await newProduct.save();
//       res.send(newProduct);
//     } catch (error) {
//       console.log(error);
//       res.send({ err: "Something went wrong" });
//     }
//   });

// productRouter.post("/search",async(req,res)=>{
//     const payload =req.body;
//     // console.log(payload)
//     try{
//        const data =await  productModel.find({title:{$regex:payload.payload,$options:"i"}})
//        res.send({data:data})
//     }catch(err){
//     //  console.log(err)
//      res.send({"msg":"soething went wrong"})
//     }
// })


// productRouter.get("/single/:id",async(req,res)=>{
//     console.log(req.params.id)
   
//       try{
//        const data = await productModel.findById({_id:req.params.id});
//     //    console.log(data)
//        res.json({data:data})
//       }catch(err){
//           console.log(err)
//           res.send(err)
//       }
//   })




//   productRouter.get("/order/order",async(req,res)=>{
//     try{
//        const Data =await orderModel.find()
//        res.send(Data)
//       }
//      catch(err){
//         console.log(err)
//      res.send({"msg":"something went wrong"})
     
//     }
//  })








// // productRouter.patch("/update/:id",async(req,res)=>{
// //    const payload =req.body;
   
// //      const id =req.params.id;
// //   const userId =req.body.userId;
// //   const note =await productModel.findOne({"_id":id})
// //   try{
// //     if(note.userId !== userId){
// //       return res.send("You are not authorised to do it")
// //   }else{
// //   const data =  await productModel.findByIdAndUpdate({"_id":id},payload)
// //     return res.send("updated")
// //     console.log(data)
// //   }
// //   }catch(err){
// //     res.send("err")
// //     console.log({"err":"something went wrong"})
// //   }
// // })


// // productRouter.delete("/update/:id",async(req,res)=>{
// //       const id =req.params.id;
// //    const userId =req.body.userId;
// //    const note =await productModel.findOne({"_id":id})
// //    try{
// //      if(note.userId !== userId){
// //        return res.send("You are not authorised to do it")
// //    }else{
// //    const data =  await productModel.findByIdAndDelete({"_id":id})
// //      return res.send("deleted")
// //      console.log(data)
// //    }
// //    }catch(err){
// //      res.send("err")
// //      console.log({"err":"something went wrong"})
// //    }
// //  })
 
//  module.exports ={productRouter}


// import express from 'express';
// import { isAuth, isAdmin } from '../utils';
const express=require("express")
const expressAsyncHandler =require('express-async-handler');
const {productModel}=require("../models/product.model")

// meed to use middlewares for isAuth and isAdmin

const productRouter = express.Router();

// productRouter.get("/data", async (req, res) => {
//   try {
//     const allProducts = await productModel.find();
//     res.status(200).send(allProducts);
//   } catch (err) {
//     res
//       .status(404)
//       .send({ message: "Something went wrong", error: true, errorMessage: err });
//   }
// });

productRouter.get("/data", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 10; // Number of products per page

    const count = await productModel.countDocuments(); // Get the total count of products

    const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

    const skip = (page - 1) * limit; // Calculate the number of products to skip

    const allProducts = await productModel
      .find()
      .skip(skip)
      .limit(limit);

    res.status(200).send({
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
      products: allProducts,
    });
  } catch (err) {
    res.status(404).send({
      message: "Something went wrong",
      error: true,
      errorMessage: err,
    });
  }
});

// productRouter.get(
//   '/search',
//   expressAsyncHandler(async (req, res) => {
//     const searchKeyword = req.query.searchKeyword
//       ? {
//           title: {
//             $regex: req.query.searchKeyword,
//             $options: 'i',
//           },
//         }
//       : {};
//     const products = await productModel.find({ ...searchKeyword });
//     res.send(products);
//   })
// );

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const searchKeyword = req.query.searchKeyword || '';
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1 if not provided)
    const limit = 10; // Number of products per page

    const count = await productModel.countDocuments({
      title: {
        $regex: searchKeyword,
        $options: 'i',
      },
    }); // Get the total count of products matching the search keyword

    const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

    const skip = (page - 1) * limit; // Calculate the number of products to skip

    const products = await productModel
      .find({
        title: {
          $regex: searchKeyword,
          $options: 'i',
        },
      })
      .skip(skip)
      .limit(limit);

    res.status(200).send({
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
      products: products,
    });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    res.send(product);
  })
);


productRouter.post(
  '/:id/reviews',
  expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
      const review = {
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.user._id,
        name: req.user.name,
      };
      product.reviews.push(review);
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      product.numReviews = product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Comment Created.',
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      throw Error('Product does not exist.');
    }
  })
);

module.exports={productRouter};