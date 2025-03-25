// // bookingRoutes.js
// const express = require("express");
// const bookingRouter = express.Router();
// const { BookingModel } = require("../models/booking.model");
// const jwt = require("jsonwebtoken")


// const bookingValidator=(req,res,next)=>{
//      console.log("req.ethod", req.method)
//     if(req.method!=="GET"){
//     const token =req.headers.authorization
//     if(token){
//         const decoded=jwt.verify(token,process.env.secret)

//           if (decoded.userId) {
//             req.body.userId = decoded.userId;
//             next()
//           } else if (decoded.adminId) {
//             req.body.adminId = decoded.adminId;
//             next();
//           }
//         else{
//             res.status(401).send({"msg":"please login first"})
//         }
//     }else{
//         res.status(401).send("please login first")
//     }
//   }else{
//     // console.log("m in")
//     next();
//   }
//   }
// // POST route to create a new booking

// bookingRouter.use(bookingValidator)
// bookingRouter.post("/add", async (req, res) => {
//   // console.log("req", req.body)
//   const payload = req.body;
//   try {
//   // const { serviceProviderId, service, name, phone, email, address, message } = req.body;

//   const newBooking = new BookingModel(payload)
//     // const newBooking = new BookingModel({
//     //   serviceProviderId,
//     //   service,
//     //   name,
//     //   phone,
//     //   email,
//     //   address,
//     //   message
//     // });
//     // console.log("newbooking", newBooking)

//     await newBooking.save();
//     res.status(200).json({ message: "Success", status:"200", data: newBooking })
//   } catch (error) {
//     console.error("Error creating booking:", error.message);
//     res.status(500).send({message : "Internal Server Error" , status:"500" , data:error});
//   }
// });



// // GET route to fetch all bookings
// bookingRouter.get("/bookings/all", async (req, res) => {
//   try {
//     const bookings = await BookingModel.find().populate("serviceProviderId");
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


// bookingRouter.put("/status/:id", async (req, res) => {
//   try {
//     const bookingId = req.params.id;
//     const newStatus = req.body.status; // Assuming the payload includes a 'status' field

//     const booking = await BookingModel.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     if (booking.serviceProviderId.toString() !== req.body.adminId.toString()) {
//       return res.status(403).send("Permission denied");
//     }


//     if (isValidStatus(newStatus)) {
//       booking.bookingStatus = newStatus;

//       await booking.save();
//       return res.json({ message: "Booking status updated successfully" });
//     } else {
//       return res.status(400).json({ message: "Invalid status value" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// bookingRouter.put("/assign/admin/:bookingId", async (req, res) => {
//   // Check if user is authorized (replace with your authorization logic)


//   const { bookingId } = req.params;
//   const { serviceProviderId } = req.body;

//   try {
//     const updatedBooking = await BookingModel.findByIdAndUpdate(
//       bookingId,
//       { serviceProviderId },
//       { new: true }
//     );

//     if (!updatedBooking) {
//       return res.status(404).send("Booking not found");
//     }

//     res.status(200).json({message:"Booking Assigned to new admin" , status:"200" , data:updatedBooking});
//   } catch (error) {
//     console.error("Error updating booking:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Helper function to validate status values
// function isValidStatus(status) {
//   const validStatusValues = ["pending", "accepted", "rejected", "completed", "cancelled"];
//   return validStatusValues.includes(status);
// }


// // GET route to fetch a booking by ID
// bookingRouter.get("/bookings/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const booking = await BookingModel.findById(id).populate("serviceId");
    
//     if (!booking) {
//       return res.status(404).send("Booking not found");
//     }

//     res.status(200).json(booking);
//   } catch (error) {
//     console.error("Error fetching booking by ID:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// bookingRouter.get("/user/:userId", async (req, res) => {
//   const { userId } = req.params;
//   // console.log("userid", userId);

//   try {
//     const bookings = await BookingModel.find({ userId });
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings by user ID:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


//   // for later use to populat a service model

//   // bookingRouter.get("/bookings/:userId", async (req, res) => {
//   //   const { userId } = req.params;
  
//   //   try {
//   //     const bookings = await BookingModel.find({ userId }).populate("serviceId");
//   //     res.status(200).json(bookings);
//   //   } catch (error) {
//   //     console.error("Error fetching bookings by user ID:", error.message);
//   //     res.status(500).send("Internal Server Error");
//   //   }
//   // });
  
//   // GET route to fetch bookings by service provider ID
//   bookingRouter.get("/provider/:providerId", async (req, res) => {
//     const { providerId } = req.params;
//     // console.log("providrid", providerId)
//     try {
//       // const bookings = await BookingModel.find({ serviceProviderId: providerId }).populate("serviceId"); WILL USE later if servie mode lwill be there 
//       const bookings = await BookingModel.find({ serviceProviderId: providerId }).populate("serviceProviderId")
//       res.status(200).json(bookings);
//     } catch (error) {
//       console.error("Error fetching bookings by provider ID:", error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   });

//   bookingRouter.put("/bookings/:id/status", async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
  
//     try {
//       // Check if the status is valid
//       if (!["accepted", "rejected"].includes(status)) {
//         return res.status(400).send("Invalid status");
//       }
  
//       const booking = await BookingModel.findById(id);
  
//       if (!booking) {
//         return res.status(404).send("Booking not found");
//       }
  
//       // Check if the user updating the status is the service provider
//       if (booking.serviceProviderId.toString() !== req.body.adminId.toString()) {
//         return res.status(403).send("Permission denied");
//       }
  
//       booking.status = status;
//       await booking.save();
  
//       res.status(200).json(booking);
//     } catch (error) {
//       console.error("Error updating booking status:", error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  
//   module.exports = {bookingRouter};