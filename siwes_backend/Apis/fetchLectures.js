const express = require("express");
const db = require("../datbase_handler");
const router = express.Router();
const bcrypt = require("bcryptjs");

// this will fetch each students details

router.get("fetch-lecture", async (req, res) => {
  const { id } = req.query;
  db.query(
    `SELECT * FROM  student 
    JOIN
    supervisor_students ON students.id= supervisor_student.student_id
    JOIN
    supervisors ON supervisors ON supervisor_student.supervisor_id= sipervisors.id;  
    `,
    [id],
    (error, result) => {
      if (error) {
        return error;
      }
      res.json({ result });
    }
  );
});

module.exports = router;
