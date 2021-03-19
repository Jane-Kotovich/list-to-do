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
//TO_CHAR(schedules.end_at, 'HH:MI am') as end_at

// const queryDisplayCombined = `SELECT users.surname, schedules.unique_key, users.firstname, schedules.week_day, TO_CHAR(schedules.start_at, 'HH:MI am') AS start_at, TO_CHAR(schedules.end_at, 'HH:MI am') as end_at, TO_CHAR(schedules.end_at, 'DD-Month-YYYY') as date FROM users JOIN schedules ON schedules.user_id=users.user_id WHERE users.user_id='${userId}' ORDER BY schedules.end_at;`;
// `SELECT list_to_do.item_to_do, users.firstname, users.secondname,list_to_do.done, TO_CHAR(list_to_do.item_to_do.created_at, 'DD-Month-YYYY') as date_created, TO_CHAR(list_to_do.item_to_do.created_at, 'HH:MI am') AS time_created,TO_CHAR(list_to_do.item_to_do.updated_at, 'DD-Month-YYYY') AS date_done, TO_CHAR(list_to_do.item_to_do.updated_at, 'HH:MI am') AS time_done FROM users JOIN list_to_do ON list_to_do.user_id=users.user_id ;`

router.get("/", (req, res) => {
  pool.query(
    `SELECT item_to_do, done, TO_CHAR(created_at, 'DD-Month-YYYY') as date_created, TO_CHAR(created_at, 'HH:MI am') AS time_created,TO_CHAR(updated_at, 'DD-Month-YYYY') AS date_done, TO_CHAR(updated_at, 'HH:MI am') AS time_done FROM list_to_do;`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result.rows);
        const allListToDo = result.rows;
        res.render("pages/index", {
          allListToDo: allListToDo,
        });
      }
    }
  );
});

/* Export router to app.js */
module.exports = router;
