const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const router = express.Router();
const loghelper = require('../../helpers/logbookHelp')
const bcrypt = require("bcryptjs");
const db = require("../../datbase_handler/index");

router.post("/create-account", async (req, res, next) => {
    const { fullname, password, matric_number, email, department, course, phone_number } = req.body;

    console.log(fullname)

    // Validation for missing fields
    if (!fullname || !matric_number || !email || !password ) {
        return res.status(400).json({ "message": "please fill  all form to continue" });
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
                console.log(error)
                return res.status(500).json({ "message": "something went wrong" });
            }
            return res.status(201).json({ "message": "Successfully created account!" });
        });
    } catch (error) {
        return res.status(500).json({ "message": "Error processing request" });
    }
});
router.post("/login", (req, res, next) => {
    const { matric_number, password } = req.body;
   
    if (!matric_number || !password) {
        return res.status(400).json({ "message": "Please provide your matric number or password" });
    }

    db.query("SELECT * FROM students WHERE matric_number = ?", [matric_number], (error, result) => {
        if (error) {
            return res.status(403).json({ "message": "An error occurred while logging you in", "error": error });
        }

        if (result.length === 0) {
            return res.status(404).json({ "message": "Can't find user" });
        }

        bcrypt.compare(password, result[0].password, (error, isMatch) => {
            if (error) {
                return res.status(403).json({ "message": "Something went wrong", "error": error });
            }

            if (!isMatch) {
                return res.status(403).json({ "message": "Please provide the correct password" });
            }

            const token = jsonwebtoken.sign(
                { user: result[0].id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            return res.status(200).json({
                message: "Login successful",
                user: { "id": result[0].id, "matric_no": result[0].matric_number },
                token: token,
            });
        });
    });
});
router.get("/verify/", (req, res, next)=>{
    const {id} = req.query
    try{
        db.query("SELECT * FROM logbook WHERE student_id =?",[id],(error, result)=>{
if(error){
    res.status(500).json({"message":"database Error"})
    return;
}
const data  =result
if(data.length ==0){
    return res.status(401).json({"message":"nothing found","data":null})
}

return res.json({"message":"succesfully fetched","data":data})
        })
    }
    catch{
return res.status(400).json({"messsage":"something went wrong!","data":null})
    }
})
router.post("/create-logbook", (req, res, next) => {
    const { establishment, institution, address, student_id } = req.body;

    // Check if all required fields are provided
    if (!establishment || !institution || !address || !student_id) {
        return res.status(400).json({ "message": "Please complete all details" });
    }

    // Create a new log entry
    const CreateLog = new loghelper(establishment, institution, address, student_id);
    // Get the insert values
    let insert_values = CreateLog.Values();

    // Check if the student already has a logbook entry
    db.query('SELECT * FROM logbook WHERE student_id = ?', [student_id], (err, result) => {
        if (err) {
            return res.status(500).json({ "message": "Error checking logbook", "error": err });
        }

        // If no record is found for this student, insert a new logbook entry
        if (result.length === 0) {
            db.query("INSERT INTO logbook SET ?", [insert_values], (err, result) => {
                if (err) {
                    return res.status(500).json({ "message": "Error inserting logbook", "error": err });
                }
                return res.status(201).json({
                    "message": "Logbook created successfully",
                    "data": insert_values
                });
            });
        } else {
            // If a logbook entry exists, return a message
            return res.status(400).json({ "message": "Student already has a logbook entry" });
        }
    });
});

router.post("/get-logbook",(req, res, next)=>{
    const {student_id} = req.query;
    db.query("SELECT * FROM logbook WHERE student_id=?",[student_id],(err, resul)=>{
        if(err){
            res.json({"message":"an error occur"})
            return;
        }
        if (resul.length === 0) {
                return res.status(200).json({
                    "message": "Logbook created successfully",
                    "data": resul
                });
        }

        return res.status(200).json({
            "message": "Logbook created successfully",
            "data": resul
        })
    })

})


module.exports = router;
