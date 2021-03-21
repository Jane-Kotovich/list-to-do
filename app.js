// Sample app.js - To be changed

/* Call required packages */
const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bcrypt = require("bcryptjs"); // password hashing
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");
initializePassport(passport);

/* Set up application and app port */
const app = express();

//Pack for reading environmental variables
const dotenv = require("dotenv");
dotenv.config();

//const PORT = pocess.env.PORT
// const PORT = process.env.PORT;
const PORT = process.env.PORT;

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
/* Dev use functions */
app.use(morgan("dev")); // to monitor http requests in console
app.use(
  express.urlencoded({
    extended: true,
  })
); // for parsing app/x-www-form-urlencoded, instead of body-parser

//Design, set up view engine
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "./layouts/full-width");

app.use(flash());

// Changed laypout to full-width one

/* Index - Home */
const indexRouter = require("./routes/index");
app.use("/routes/index", indexRouter);

/* createNewItem - create to-do */
const createnewRouter = require("./routes/createnew");
app.use("/routes/createnew", createnewRouter);

/* signin route */
const loginRouter = require("./routes/login");
app.use("/routes/login", loginRouter);

/* signup route */
const signupRouter = require("./routes/signup");
app.use("/routes/signup", signupRouter);

/* Email confirmation  */
const emailConfRouter = require("./routes/email");
app.use("/routes/email", emailConfRouter);

/* Tick box  */
const doneRouter = require("./routes/done");
app.use("/routes/done", doneRouter);

/* Run App */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/", indexRouter);
app.use("/create", createnewRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/email", emailConfRouter);
app.use("/done", doneRouter);
