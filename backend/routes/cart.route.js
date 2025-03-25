// const express= require('express')
// const {cartModel} =require("../models/cart.model")

// const cartRouter =express.Router()

// cartRouter.post("/",async(req,res)=>{
//     const data =req.body;
//    //  console.log(data)
//     try{
//       const isData =await cartModel.findOne({$and:[{userId:data.userId},{refId:data.refId}]})
//       // console.log(isData)
//       if(isData){
//          isData.quantity =isData.quantity+data.quantity;
//           const Data =await cartModel.findByIdAndUpdate({_id:isData._id},isData)
//           res.send({"msg":"Data Added to Cart"})
//       }else{
//          const Data = new  cartModel(data)
//          await Data.save()
//          res.send({"msg":"Data  Added to Cart"})
//       }
//       }
//      catch(err){
//         console.log(err)
//      res.send({"msg":"soething went wrong"})
     
//     }
// })
// cartRouter.get("/",async(req,res)=>{
//    const data =req.body;
//     try{
//       const isData =await cartModel.find({userId:data.userId})
//       console.log(isData)
//        res.send({data:isData})
       
//     }catch(err){
//         console.log(err)
//      res.send({"msg":"something went wrong"})
     
//     }
// })


// cartRouter.delete("/:id",async(req,res)=>{
//    const _id =req.params.id;
//        try{
//        const data =  await cartModel.findByIdAndDelete({"_id":_id})
//          return res.send({"msg":"Data gets deleted"})
//        }catch(err){
//          res.send("err")
//          console.log({"err":"something went wrong"})
//        }
//      })

// module.exports ={cartRouter}


const express = require('express');
const {cartModel} = require("../models/cart.model")

const cartRouter = express.Router();

// POST route to add an item to the cart or update its quantity
cartRouter.post('/addtocart', async (req, res) => {
  const { productId, userId, quantity } = req.body;
console.log("checkdata", productId, userId); // Assuming you have authentication middleware to set the user ID

try {
  let cart = await cartModel.findOne({ user: userId });
  console.log("cart", cart);

  if (cart === null) {
    // Create a new cart if it doesn't exist for the user
    cart = new cartModel({
      user: userId,
      items: [{ product: productId, quantity: quantity }],
    });

    const savedCart = await cart.save();
    console.log('New cart saved successfully:', savedCart);
    res.status(201).send(savedCart);
  } else {
    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    console.log("existing items", existingItem);

    if (existingItem) {
      // Product already exists in the cart, update the quantity or send a message
      // existingItem.quantity = quantity; // Uncomment this line if you want to update the quantity
      res.status(201).send({ message: "Product already added to cart" });
    } else {
      // Add a new item if the product doesn't exist
      cart.items.push({ product: productId, quantity: quantity });
      const updatedCart = await cart.save();
      console.log('Cart updated successfully:', updatedCart);
      res.status(201).send(updatedCart);
    }
  }
} catch (error) {
  console.error('Error in the cart route:', error);
  res.status(500).send({ message: 'An error occurred' });
}
});

// GET route to retrieve the user's cart
cartRouter.get('/', async (req, res) => {
  const {userId} = req.body; // Assuming you have authentication middleware to set the user ID

  try {
    const cart = await cartModel.findOne({ user: userId })
      .populate('items.product', 'title price image'); // Populate the product details

    res.status(200).send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
});

// PUT route to update the quantity of a specific item in the cart
cartRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const {userId} = req.body; // Assuming you have authentication middleware to set the user ID
  // console.log(userId)
  try {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({ message: 'Your cart is Empty' });
    }

    const itemToUpdate = cart.items.find((item) => item.product.toString() === id);
    if (!itemToUpdate) {
      return res.status(404).send({ message: 'Item not found in cart' });
    }

    itemToUpdate.quantity = quantity;

    const updatedCart = await cart.save();
    res.status(200).send(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
});

// DELETE route to remove an item from the cart
cartRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const {userId} = req.body; // Assuming you have authentication middleware to set the user ID

  try {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }else{
      const itemExists = cart.items.some((item) => item.product.toString() === id);

    await cartModel.updateOne(
      { _id: cart._id },
      { $pull: { items: { "product": id } } }
    );
  }       
  
    // cart.items = cart.items.filter((item) => item.product.toString() !== id);
    // cart.items.findByIdAndDelete({"product":id})
   
    const updatedCart = await cart.save();
    res.status(200).send({message:"Product Deleted Successfully", 
  cart:updatedCart});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
});

module.exports = {cartRouter};

// notesRouter.patch("/update/:id", async(req,res)=>{

//   const payload=req.body;
//   const id=req.params.id;
//   const note=await notesModel.findOne({"_id":id})
//   const userID_in_note=note.userID
//   const userID_making_request=req.body.userID;

//   try{
//       if(userID_making_request!==userID_in_note){
//           res.send("You are not authorized")
//       }else{
//           await notesModel.findByIdAndUpdate({"_id":id},payload)
//           res.send("Updated the note")
//       }

//   }catch(err){
//       console.log(err)
//       res.send({"msg":"soething went wrong"})
//   }
// })

// notesRouter.delete("/delete/:id", async(req,res) => {

//   const id=req.params.id;
//   const note=await notesModel.findOne({"_id":id})
//   const userID_in_note=note.userID
//   const userID_making_request=req.body.userID;

//   try{
//       if(userID_making_request!==userID_in_note){
//           res.send("You are not authorized")
//       }else{
//           await notesModel.findByIdAndDelete({"_id":id})
//           res.send("Deleted the note")
//       }

//   }catch(err){
//       console.log(err)
//       res.send({"msg":"soething went wrong"})
//   }

// })
