/* Call required package modules */
const express = require("express");
const router = express.Router();
const session = require("express-session");
/* Call database */
const { pool } = require("../database.js");
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

router.get("/", (req, res) => {
  pool.query(`SELECT * FROM list_to_do;`, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result.rows);
      res.render("pages/index");
    }
  });
});

/* Export router to app.js */
module.exports = router;
