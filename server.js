const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

app.use(bodyParser.json()); //parses and extracts incoming req body

const PORT = process.env.PORT || 3000;

//Middleware Function for logging request
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

app.use(passport.initialize()); // initializing passport middleware
const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", localAuthMiddleware, (req, res) => {
  res.send("welcome to our hotel");
});

//Import ther router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listening to port 3000");
});
