const express = require("express");
const db = require("../../datbase_handler");
const router = express.Router();
const weekHelp = require("../../helpers/weekly");

router.post("/weekly-post", async (req, res, next) => {
  const { info, logbook_id, weekly } = req.body;
  if (!info || !logbook_id) {
    res.json({ message: "please attached a post" });
    return;
  }

  if (weekly !== 5) {
    res.json({ message: "Please submit your deatils only on friday" });
    return;
  }

  const weekcreate = new weekHelp(info, logbook_id, weekly).Values();

  db.query(
    "SELECT * FROM  weekly WHERE logbook_id =?",
    [logbook_id],
    (error, result) => {
      if (error) {
        res.json({ error: error });
        return;
      }
      if (result.length === 0) {
        db.query("INSERT INTO weekly SET ?", [weekcreate], (error, newRes) => {
          if (error) {
            res.json({ error: error });
            return;
          }
          return res.json({
            message:
              "you have succesfully uploaded your weekly progress take your test",
          });
        });
      }
      return res.json(result);
    }
  );
});

router.get("/logbook-fetch", async (req, res, next) => {
  const { student_id } = req.query;
  db.query(
    "SELECT id FROM logbook WHERE student_id =?",
    [student_id],
    (error, result) => {
      if (error) {
        return res.json({ messge: error });
      }
      return res.json({ data: result });
    }
  );
});

module.exports = router;
