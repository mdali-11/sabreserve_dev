const express= require("express")
const {connection} =require('./config/db')
const path = require("path");
var cors = require('cors')
require('dotenv').config()
const {userRouter}=require("./routes/user.route")
const {cartRouter} =require("./routes/cart.route")
const {productRouter} = require("./routes/product.route")
const {orderRouter} =require('./routes/order.route')
const {adminRouter} =require("./routes/Admin/admin.route")
const { adminProductRouter } =require("./routes/Admin/product.route")
const {serviceRouter} = require("./routes/service.route")
const {bookingRouter} = require("./routes/booking.route")
const {validator} =require("./middlewares/validator.middleware")
const bodyParser = require("body-parser");
// const {sponsoredContentRouter} = reuire("./routes/sponsoredContent.route")
//willwork in dev environment


const app =express()
app.use(cors())
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }));
const cron = require('node-cron');
const { SponsoredContentModel } = require('./models/sponsoredContent.model'); // Update with the correct path
const { sponsoredContentRouter } = require("./routes/sponsoredContent.route");

// Schedule a task to run every Sunday at midnight (first day of the week)
cron.schedule('0 0 * * 0', async () => {
  const now = new Date();

  try {
    const result = await SponsoredContentModel.deleteMany({ endDate: { $lt: now } });
    console.log(`${result.deletedCount} expired sponsored content(s) deleted at ${now}`);
  } catch (error) {
    console.error("Error deleting expired sponsored content: ", error);
  }
});




app.use(express.static(path.join(__dirname, "./ui/build")));


// app.use("/admin",adminRouter)
app.use("/user",userRouter)
// app.use("/product",productRouter)
// app.use("/admin/product",adminProductRouter)
app.use("/bookings",bookingRouter)
app.use("/services", serviceRouter)
app.use("/sponsored",sponsoredContentRouter )
// app.use(validator)
// app.use("/cart",cartRouter)
// app.use("/order",orderRouter)

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./ui/build/index.html"),
    function (err) {
      res.status(500).send(err)
    }
  )
})




app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Connected to Database")
    }catch(err){
        console.log(err,"Something went Wrong")
    }
    console.log(`Running on port no ${process.env.PORT}`)
})

// const MAX_RETRIES = 5; // Maximum number of retry attempts

// const connectWithRetry = async () => {
//     let retryCount = 0; // Initialize retryCount inside the function
//     try {
//         await connection;
//         console.log("Connected to Database");
//     } catch (err) {
//         if (retryCount < MAX_RETRIES) {
//             console.log(`Connection failed. Retrying... Attempt ${retryCount + 1}`);
//             retryCount++;
//             await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
//             await connectWithRetry(); // Retry connection
//         } else {
//             console.log("Max retries reached. Could not connect to the database.");
//             console.error(err);
//             process.exit(1); // Exit the application if maximum retries reached
//         }
//     }
// };

// app.listen(process.env.PORT, async () => {
//     await connectWithRetry(); // Start initial connection attempt
//     console.log(`Running on port no ${process.env.PORT}`);
// });
