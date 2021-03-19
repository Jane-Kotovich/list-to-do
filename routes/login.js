/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

/* Set up application and app port */
const app = express();

/* Call database */
const database = require("../database.js");

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
