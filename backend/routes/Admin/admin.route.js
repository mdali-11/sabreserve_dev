const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AdminModel } = require("../../models/admin.model");
const { productModel } = require("../../models/product.model");
const { userModel } = require("../../models/user.model");

require('dotenv').config();

const adminRouter = express.Router();

// Admin Signup
adminRouter.post("/register", async (req, res) => {
  const { email, password, name, phone, countryCode, country, companyName, companyAddress, serviceCategories , roles } = req.body;


  try {
    const admin = await AdminModel.findOne({ email });

    if (admin) {
      return res.send("Admin Already Exists");
    }

    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error occurred during password hashing");
      }

      const newAdmin = new AdminModel({
        email,
        password:secure_pass,
        name,
        phone,
        countryCode,
        country,
        // companyName,
        // companyAddress,
        // serviceCategories,
        // roles
      });

      await newAdmin.save();
      res.send("Admin Registered Successfully");
    });
  } catch (err) {
    console.error('Error occurred in admin signup:', err.message);
    res.status(500).send("Error occurred during admin signup");
  }
});

adminRouter.put("/update", async (req, res) => {
  const { email, ...updateFields } = req.body; // Destructure email and other update fields

  // Validate that email exists in the database
  const existingAdmin = await AdminModel.findOne({ email });
  if (!existingAdmin) {
    return res.status(404).send("Admin with this email does not exist");
  }

  try {
    // Update specific fields based on request body
    existingAdmin.set(updateFields); // Update model with provided fields

    await existingAdmin.save(); // Save updated admin

    res.send("Admin updated successfully");
  } catch (err) {
    console.error("Error occurred while updating admin:", err.message);
    res.status(500).send("Error occurred during admin update");
  }
});

// Admin Login
adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });

    if (admin) {
      const hashed_password = admin.password;

      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          // const token = jwt.sign({ adminId: admin._id }, process.env.secret, { expiresIn: "24hr" });
          const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);

          const adminData = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            roles:admin.roles,
            serviceCategories:admin.serviceCategories,
            whatsappNo:admin.whatsappNo
          };
          res.send({ msg: "Login Successful", token, admin: adminData });
        } else {
          res.send("Incorrect credentials");
        }
      });
    } else {
      res.send({ msg: "Admin does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

//   ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    
// getting all admin users


adminRouter.get("/alladmins", async (req, res) => {
    try {
      const Admins = await AdminModel.find();
      res.status(200).send(Admins);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });

  
  adminRouter.get("/alladmins/category", async (req, res) => {
    try {
      const requestedCategory = req.query.category;
      let Admins;
  
      if (requestedCategory) {
        Admins = await AdminModel.find({ category: requestedCategory });
      } else {
        Admins = await AdminModel.find();
      }
  
      res.status(200).send(Admins);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  })


// ...single data of admin
adminRouter.get("/singleadmin/:id", async (req, res) => {
    const Id = req.params.id;
    try {
      const singleAdmin = await AdminModel.find({ _id: Id });
      res.status(200).send(singleAdmin);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });
//   ....delete admin
  adminRouter.delete(`/deleteadmin/:id`, async (req, res) => {
    const ID = req.params.id;
    try {
      await AdminModel.findByIdAndDelete({ _id: ID });
      res.send(`Deleted the Admin whose id is ${ID}`);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });
  
//   ...getting admin to all customer data
  adminRouter.get("/allcustomer", async (req, res) => {
    try {
      const allUsers = await userModel.find();
      res.status(200).send(allUsers);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });
  
//   single data of customer
  adminRouter.get("/singlecustomer/:id", async (req, res) => {
    const Id = req.params.id;
    try {
      const allUsers = await userModel.find({ _id: Id });
      res.status(200).send(allUsers);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });
  
//   deleteing customer from admin side
  adminRouter.delete(`/deletecustomer/:id`, async (req, res) => {
    const ID = req.params.id;
    try {
      await userModel.findByIdAndDelete({ _id: ID });
      res.send(`Deleted the Product whose id is ${ID}`);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });


// // products..............................routes..for..admin...

// adminRouter.get("/product/fetch",async(req,res)=>{
//     const {sortBy,page,limit}=req.body;
//     const _limit =limit||15
//     const _Page =page||1
//     const skip =(_Page-1)*limit;
//     try{
//     const data =await productModel.find().sort({price:sortBy}).skip(skip).limit(_limit)
//     res.send({data:data})
    
//     }catch(err){

//     }
    
//   })


// //   ...admin ...get  request single products 
// adminRouter.get("/single/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//       const product = await productModel.find({ _id: id });
//       res.status(200).send(product);
//     } catch (error) {
//       res
//         .status(404)
//         .send({ message: "Error while fetching products", error: error });
//     }
//   });
// //   .....post request to add products in Alldata
//   adminRouter.post("/addproduct", async (req, res) => {
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

// //   ...patch request for admin
  
//   adminRouter.patch(`/updateproduct/:id`, async (req, res) => {
//     const ID = req.params.id;
//     const payload = req.body;
//     try {
//       const updatedProduct = await productModel.findByIdAndUpdate(
//         { _id: ID },
//         payload
//       );
//       res.send(updatedProduct);
//     } catch (error) {
//       console.log(error);
//       res.send({ err: "Something went wrong" });
//     }
//   });

//   //   ...delete request for admin
  
//   adminRouter.delete(`/deleteproduct/:id`, async (req, res) => {
//     const ID = req.params.id;
//     try {
//       await productModel.findByIdAndDelete({ _id: ID });
//       res.send(`Deleted the Product whose id is ${ID}`);
//     } catch (error) {
//       console.log(error);
//       res.send({ err: "Something went wrong" });
//     }
//   });
  

  module.exports ={adminRouter}