const express = require("express");
const { ServiceModel } = require("../models/service.model");

// middleware/authenticateToken.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const serviceValidator=(req,res,next)=>{

  if(req.method!=="get"){
  const token =req.headers.authorization
  console.log(token)
  if(token){
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      if(decoded){
          // console.log(decoded)
          // const userId=decoded.userId;
          // req.body.sellerID=userId;
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
//   console.log(authHeader)
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log(token)
//   if (token == null) return res.sendStatus(401);
if(authHeader === process.env.JWT_SECRET){
    next()
}else{
    return res.sendStatus(403)
}
//   jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
}

// module.exports = authenticateToken;



// POST route - Create a new service

const serviceRouter = express.Router();

serviceRouter.use('/all', (req, res, next) => {
  const { category, location } = req.query;
  if (!category || !location) {
    return res.status(400).json({ error: 'Both category and location query parameters are required.' });
  }
  next();
});
serviceRouter.post('/add',authenticateToken, async (req, res) => {
   let payload = req.body;
  try {
  const service = new ServiceModel(payload);
      await service.save();
      res.status(201).send(payload);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Read all services
// serviceRouter.get('/all',authenticateToken, async (req, res) => {
//   try {
//     // const { category, location } = req.query;
      
//     //   // Initialize filter object
//     //   let filter = {};
//     //   console.log("location andcategory " , location , category)
      
//     //   // Add category to filter if provided
//     //   if (category) filter.category = category;
      
//     //   // Add location (village name) to filter if provided
//     //   if (location) filter.combinedAddress = { $regex: location, $options: "i" }; // Case-insensitive search

//       // Fetch services based on filter
//       const services = await ServiceModel.find({});
//     //   const services = await ServiceModel.find({});
//       res.status(200).send(services);
//   } catch (error) {
//       res.status(500).send(error);
//   }
// });

serviceRouter.get('/all', async (req, res) => {
  try {
    const { category, location } = req.query;
      
      // Initialize filter object
      let filter = {};
      // console.log("location andcategory " , location , category)
      
      // Add category to filter if provided
      if (category) filter.category = category;
      
      // Add location (village name) to filter if provided
      if (location) filter.combinedAddress = { $regex: location, $options: "i" }; // Case-insensitive search

      // Fetch services based on filter
      const services = await ServiceModel.find(filter);
    //   const services = await ServiceModel.find({});
      res.status(200).send(services);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Read a single service by ID
serviceRouter.get('/:id', async (req, res) => {
  try {
      const service = await ServiceModel.findById(req.params.id);
      if (!service) {
          return res.status(404).send();
      }
      res.status(200).send(service);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Update a service by ID
serviceRouter.put('/:id',authenticateToken, async (req, res) => {
  try {
      const service = await ServiceModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!service) {
          return res.status(404).send();
      }
      res.status(200).send(service);
  } catch (error) {
      res.status(400).send(error);
  }
});

serviceRouter.patch('/:id', authenticateToken, async (req, res) => {
    try {
      // Extract service ID from request parameters
      const { id } = req.params;
  
      // Extract fields to update from request body
      const updates = req.body;
  
      // Validate that updates are provided
      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).send({ error: 'No updates provided.' });
      }
  
      // Find the service by ID and apply the updates
      const service = await ServiceModel.findByIdAndUpdate(id, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validations are applied
      });
  
      // If the service is not found, return a 404 error
      if (!service) {
        return res.status(404).send({ error: 'Service not found.' });
      }
  
      // Respond with the updated service
      res.status(200).send(service);
    } catch (error) {
      // Handle errors and respond with a 400 status code
      res.status(400).send({ error: error.message });
    }
  });
  

// Delete a service by ID
serviceRouter.delete('/:id',authenticateToken, async (req, res) => {
  try {
      const service = await ServiceModel.findByIdAndDelete(req.params.id);
      if (!service) {
          return res.status(404).send();
      }
      res.status(200).send(service);
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = {serviceRouter};
