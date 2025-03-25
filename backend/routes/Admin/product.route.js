
const express=require("express")
const expressAsyncHandler =require('express-async-handler');
const {productModel}=require("../../models/product.model")
const jwt =require('jsonwebtoken')

// import { productValidator } from "../../middlewares/productValidator.middleware";

// meed to use middlewares for isAuth and isAdmin

const productValidator=(req,res,next)=>{

  if(req.method!=="get"){
  const token =req.headers.authorization
  console.log(token)
  if(token){
      const decoded=jwt.verify(token,process.env.secret)
      if(decoded){
          // console.log(decoded)
          const userId=decoded.userId;
          req.body.sellerID=userId;
          next()
      }else{
          res.status(401).send({"msg":"please login first"})
      }
  }else{
      res.status(401).send("please login first")
  }
}else{
  next();
}
}

const adminProductRouter = express.Router();

adminProductRouter.use(productValidator)

adminProductRouter.post(
    '/add',
    expressAsyncHandler(async (req, res) => {
  
      const { title, description, category, brand, image, price, countInStock, sellerID } = req.body;
      const payload={
        title,
        description,
        category,
        brand,
        image,
        price,
        countInStock,
        sellerID
      }
      const product = new productModel(payload);
      const createdProduct = await product.save();
      if (createdProduct) {
        res
          .status(201)
          .send({ message: 'Product Created', product: createdProduct });
      } else {
        res.status(500).send({ message: 'Error in creating product' });
      }
    })
  );
  adminProductRouter.put(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await productModel.findById(productId);
      if (product) {
        product.title = req.body.title;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
          res.send({ message: 'Product Updated', product: updatedProduct });
        } else {
          res.status(500).send({ message: 'Error in updaing product' });
        }
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
  adminProductRouter.delete(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const product = await productModel.findById(req.params.id);
      if (product) {
        const deletedProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deletedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

module.exports={adminProductRouter}
  