const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT;

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

/* Run App */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/", indexRouter);
app.use("/create", createnewRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/email", emailConfRouter);
