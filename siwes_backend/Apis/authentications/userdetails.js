
const express = require ("express")

const router = express.Router()
const bcrypt= require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken");
const prisma = require("../../client");



// login Api for user send a post method to this api to retrieve user details
// working 100 cool


router.get("/fetchdetails", async (req, res) => {
  const _id = req.query.id;
  try {
    const Getdetails = await prisma.students.findUnique({
      where: {
        id: Number(_id),
      },
      include: {
        logbooks:true,
        supervisors: {
          include: {
            supervisor: true, // <-- This will fetch supervisor details
          },
          
        },
      },
      
    });
    console.log(Getdetails)
    return res.status(200).json({ message: "Fetched succesfully", data: Getdetails, supeervisor:Getdetails.supervisors });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Message fetched error" });
  }
});
  


module.exports = router;
