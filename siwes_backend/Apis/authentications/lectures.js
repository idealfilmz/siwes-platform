const express = require("express");
const db = require("../../datbase_handler");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const CreateLectures = require("../../helpers/lecturer");

// login Api for user send a post method to this api to retrieve user details
// working 100 cool

router.post("/create-lecture", async (req, res) => {
  const { email, phone_number, fullname, password } = req.body;

  try {
    const neArr = email.split("@");
    if (neArr[1] !== "unilorin.edu.ng") {
      res.json({ message: "Email not identified" });
      return;
    }
    if (email.split(".")[0] !== fullname.split(" ")[0]) {
      res.json({ message: "Staff not recognized" });
      return;
    }

    if (!email || !phone_number || !fullname || !password) {
      res.json({ message: "please complete all info" });
      return;
    }

    const randomNumbersString = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const lecture = new CreateLectures(
      email,
      phone_number,
      fullname,
      hashedPassword,
      randomNumbersString
    );
    db.query(
      "INSERT INTO supervisors SET ?",
      [lecture.Values()],
      (error, result) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({
            message: "An error occurred CREATING ACCOUNT",
            data: error,
          });
        }
        res.json({
          message: "Your staff_id has been sent to your registerd mail",
        });
      }
    );
  } catch {
    res.json({ message: "something occur" });
    return;
  }
});

module.exports = router;
