/* Call required package modules */
const express = require("express");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.send("yes");
});

/* Export router to app.js */
module.exports = router;
