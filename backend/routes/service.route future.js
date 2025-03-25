// const express = require("express");
// const { ServiceModel } = require("../models/service.model");


// const newServiceValidator=(req,res,next)=>{

//     if(req.method!=="get"){
//     const token =req.headers.authorization
//     console.log(token)
//     if(token){
//         const decoded=jwt.verify(token,process.env.secret)
//         if(decoded){
//             // console.log(decoded)
//             const adminId=decoded.adminId;
//             req.body.sellerID=adminId;
//             next()
//         }else{
//             res.status(401).send({"msg":"please login first"})
//         }
//     }else{
//         res.status(401).send("please login first")
//     }
//   }else{
//     next();
//   }
//   }
// // POST route - Create a new service

// const serviceRouter = express.Router();
// serviceRouter.use(newServiceValidator)
// serviceRouter.post("/services", async (req, res) => {
//   const {
//     serviceName,
//     description,
//     category,
//     imageUrl,
//     providerName,
//     providerContact,
//     location,
//     price,
//     availability,
//     providerId,
//   } = req.body;

//   try {
//     const newService = new ServiceModel({
//       serviceName,
//       description,
//       category,
//       imageUrl,
//       providerName,
//       providerContact,
//       location,
//       price,
//       availability,
//       providerId,
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (error) {
//     console.error("Error creating service:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // GET route - Get all services
// serviceRouter.get("/services", async (req, res) => {
//   try {
//     const services = await ServiceModel.find();
//     res.status(200).json(services);
//   } catch (error) {
//     console.error("Error fetching services:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


// // GET route - Get services by provider ID
// serviceRouter.get("/services/provider/:providerId", async (req, res) => {
//   const { providerId } = req.params;

//   try {
//     const services = await ServiceModel.find({ providerId });

//     if (services.length === 0) {
//       return res.status(404).send("No services found for the specified provider ID");
//     }

//     res.status(200).json(services);
//   } catch (error) {
//     console.error("Error fetching services by provider ID:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


// // GET route - Get services by category
// serviceRouter.get("/services/category/:category", async (req, res) => {
//   const { category } = req.params;

//   try {
//     const services = await ServiceModel.find({ category });

//     if (services.length === 0) {
//       return res.status(404).send("No services found for the specified category");
//     }

//     res.status(200).json(services);
//   } catch (error) {
//     console.error("Error fetching services by category:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


// // PUT route - Edit/update a service by ID
// serviceRouter.put("/services/:id", async (req, res) => {
//   const { id } = req.params;
//   const updateFields = req.body;

//   try {
//     const updatedService = await ServiceModel.findByIdAndUpdate(
//       id,
//       { $set: updateFields },
//       { new: true } // Return the updated document
//     );

//     if (!updatedService) {
//       return res.status(404).send("Service not found");
//     }

//     res.status(200).json(updatedService);
//   } catch (error) {
//     console.error("Error updating service:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // DELETE route - Delete a service by ID
// serviceRouter.delete("/services/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedService = await ServiceModel.findByIdAndDelete(id);

//     if (!deletedService) {
//       return res.status(404).send("Service not found");
//     }

//     res.status(200).json(deletedService);
//   } catch (error) {
//     console.error("Error deleting service:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = {serviceRouter};
