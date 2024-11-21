const express = require("express");

const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
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

module.exports = router;
