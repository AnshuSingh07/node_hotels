const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

//Middleware function for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      //authentication logic
      console.log("Received credentials :", username, password);
      const user = await Person.findOne({ username: username }); //findOne returns single object

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

module.exports = passport; //Export confifured passport
