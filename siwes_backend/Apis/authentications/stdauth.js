const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../datbase_handler/index");

router.post("/create-account", async (req, res, next) => {
    const { fullname, password, matric_number, email, department, course, phone_number } = req.body;

    // Validation for missing fields
    if (!fullname || !matric_number || !email || !password ) {
        return res.status(400).json({ "message": "Please fill all required fields" });
    }

    // Prepare the data for insertion into the database
    const data = { fullname, matric_number, email, department, course, password, phone_number };
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Replace the plain password with the hashed password
        data.password = hashedPassword;

        // Insert the data into the database
        db.query("INSERT INTO students SET ?", [data], (error, result) => {
            if (error) {
                return res.status(500).json({ "message": error });
            }
            return res.status(201).json({ "message": "Successfully created account!" });
        });
    } catch (error) {
        return res.status(500).json({ "message": "Error processing request" });
    }
});

router.post("/login", (req, res, next)=>{

    const {matric_number, password} = req.body
    if(!matric_number || !password){
        res.status(400).json({"message":"please provide your matric number or password"})
        return
    }

    db.query("SELECT * FROM students WHERE matric_number =?",[matric_number],(error, result)=>{
        if(error){
            res.status(403).json({"message":"An error occur login you in", 'error':error})
            return;
        }

        bcrypt.compare(password, result[0].password, (error, resul)=>{
            if(error){
                res.status(403).json({"message":"something went wrong","error":error})
                return
            }
            if(!resul){
                return res.status(403).json({"message":"please kindly provide your correct password!"})
            }
            const token = jsonwebtoken.sign(
                { user: result[0].id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
              );

              return res.status(200).json({
                message: "Login successful.",
                user:{"id":result[0].id,"matric_no":result[0].matric_number},
                token:token,
              });
            });
        })
  
    })



module.exports = router;
