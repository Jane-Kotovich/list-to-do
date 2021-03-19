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

//Can put this function in route to force login
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

router.get("/", (req, res) => {
  res.redirect("/");
});

router.post("/", (req, res) => {
  const newItem = req.body.item_to_do;
  const itemDone = false;
  const userId = req.user.user_id;
  console.log(newItem, itemDone, userId);

  //will write sql quiry to insert new item in to_do_list
  //redirect to index page
  res.send("Yeah");
});

/* Export router to app.js */
module.exports = router;
