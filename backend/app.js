const express = require('express')
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");//import error.js
app.use(express.json())
app.use(cookieParser());
//routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);


//MiddleWare for error


//puts the specified middleware functions at the specified path
app.use(errorMiddleware);
module.exports=app