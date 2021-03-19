const express = require("express");
const router = express.Router();
/* Call database */
const { pool } = require("../database.js");
//check if user if already authenticated

router.get("/:id", (req, res) => {
  const hashedString = req.params.id;

  pool
    .query(`SELECT email FROM email_confirmation WHERE hash = $1;`, [
      hashedString,
    ])
    .then((results) => {
      const emailToChange = results.rows[0].email;
      const newActive = true;
      pool
        .query("UPDATE users SET active = $1 WHERE email = $2;", [
          newActive,
          emailToChange,
        ])
        .then(() => {
          pool.query("DELETE from email_confirmation WHERE hash = $1;", [
            hashedString,
          ]);
          req.flash(
            "success_msg",
            "Your email has been confirmed! Now you can log in!"
          );
          res.redirect("/login");
        })
        .catch((err) =>
          res.status(404).render("pages/error", {
            err: { message: "HTTP ERROR 404. This page can not be found" },
            title: "Error ",
            current_user: req.session.user,
          })
        );
    })
    .catch((err) =>
      res.status(404).render("pages/error", {
        err: { message: "HTTP ERROR 404. This page can not be found" },
        title: "Error ",
        current_user: req.session.user,
      })
    );
});

/* Export router to app.js */
module.exports = router;
