/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

/* Set up application and app port */
const app = express();

//ssessions
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
    //secure:false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Pack for reading environmental variables
const dotenv = require("dotenv");
dotenv.config();
/* Route definition */
router.get("/", (req, res) => {
  const user = req.user;
  res.render("pages/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

/* Export router to app.js */
module.exports = router;
