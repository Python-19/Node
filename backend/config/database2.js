const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB")
module.exports = connectDatabase;