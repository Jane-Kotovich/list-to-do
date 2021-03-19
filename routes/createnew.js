/* Call required package modules */
const express = require("express");
const router = express.Router();
const app = express();
/* Call database */
const { pool } = require("../database.js");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.post("/", (req, res) => {
  const newItem = req.body.item_to_do;
  const itemDone = false;
  const userId = req.user;
  console.log(newItem, itemDone, userId);

  //will write sql quiry to insert new item in to_do_list
  //redirect to index page
  res.send("Yeah");
});

/* Export router to app.js */
module.exports = router;
