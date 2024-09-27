const express = require ("express")

const app = express();
const router = express.Router()
const bycyrt = require("bcryptjs");
const { json } = require("body-parser");




router.post("", async (req, res, next)=>{
    const {fullname, password, matric_no,email, department, course, phone}= req.body
    if(!fullname || matric_no || department || password || course){
    res.status(301).json({"message":"please fill the blank space"})
    return
}



})

module.exports = router;