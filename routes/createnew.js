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
  res.send("Yeah");
});

/* Export router to app.js */
module.exports = router;
