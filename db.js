const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";
//when the connection will establish , the hotels db will automatically get created in the mongodb db

mongoose.connect(mongoURL);
/*
1)useNewUrlParser : ensures ki humlog new mongodb version k sath work kar rahe hai jism url naya hai jo pehla kuch or hua karta tha
2)Both parameter : we define the parameters to avoid warnings during connection establishment
*/

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
  console.error("MongoDB connection error :", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = { db };
