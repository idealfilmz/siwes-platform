const express = require ("express")
const db  = require("../datbase_handler")
const router = express.Router()
const bcrypt= require("bcryptjs")




router.post("/login-lectures", async (req, res) => {
    const { staff_id, password } = req.body;

      db.query(
        "SELECT * FROM supervisors WHERE UQ= ?",
        [staff_id],
        (error, result) => {
          if (error) {
            console.error("Database error:", error);
            return res.status(500).json({
              message: "An error occurred while fetching the lecture.",
              data: error,
            });
          }
    
          if (result.length === 0) {
            return res.status(404).json({
              message: `No lecture found`,
            });
          }
    
          const user = result[0];
          // Compare the provided password with the stored hashed password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.error("Bcrypt error:", err);
              return res.status(500).json({
                message: "An error occurred while checking the password.",
                data: err,
              });
            }
    
            if (!isMatch) {
              return res.status(401).json({
                message: "Incorrect password.",
              });
            }
            const token = jsonwebtoken.sign(
              {user},
              process.env.JWT_SECRET,
              { expiresIn: "2h" }
            );
            return res.status(200).json({
              message: "Login successful.",
              user:user,    // return the user details 
              token:token, //return token
            });
          });
        }
      );
    });  
  


module.exports = router;
