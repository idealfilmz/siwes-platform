const express = require ("express")
const db  = require("../../datbase_handler")
const router = express.Router()
const bcrypt= require("bcryptjs")





// login Api for user send a post method to this api to retrieve user details
// working 100 cool

router.post("/login-students", async (req, res) => {
    const { matric_no, password } = req.body;
    
      // Query the database for the student that want to login
      db.query(
        "SELECT * FROM students WHERE matric_number = ?",
        [matric_no],
        (error, result) => {
          if (error) {
            console.error("Database error:", error);
            return res.status(500).json({
              message: "An error occurred while fetching the student.",
              data: error,
            });
          }
    
          if (result.length === 0) {
            return res.status(404).json({
              message: `No student found with matric_no ${matric_no}`,
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
              { matric_no: user.matric_no },
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
