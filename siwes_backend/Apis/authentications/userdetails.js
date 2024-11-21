
const express = require ("express")
const db  = require("../../datbase_handler")
const router = express.Router()
const bcrypt= require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken");



// login Api for user send a post method to this api to retrieve user details
// working 100 cool


router.get("/fetchdetails", async (req, res) => {
    const id= req.query.id;

      db.query(
        "SELECT * FROM students WHERE id = ?",
        [id],
        (error, result) => {
          if (error) {
            console.error("Database error:", error);
            return res.status(500).json({
              message: "An error occurred while fetching the student.",
              data: error,
            });
          }
          if(result.length ===0){
            res.json({"message":"your data is not found on our server"})
            return;
          }
          let user  = result[0]
          return res.json({"message":"sucessfully fetched","data":user})
        }
      );
    });  
  


module.exports = router;
