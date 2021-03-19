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

/* Run App */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/", indexRouter);
