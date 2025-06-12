const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../client");
const jsonwebtoken = require("jsonwebtoken");

router.post("/login-lectures", async (req, res) => {
  const { staff_id, password } = req.body;
  try {
    const user = await prisma.supervisors.findUnique({
      where: { UQ: staff_id },
    });

    if (!user) {
      return res.status(404).json({
        message: `No lecture found`,
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    const token = jsonwebtoken.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      message: "Login successful.",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "An error occurred during login.",
      data: error,
    });
  }
});

router.get("/fetch-lecture", async (req, res) => {
  try {
    const { id } = req.query; // Get lecturer (supervisor) ID

    if (!id) {
      return res.status(400).json({ error: "Supervisor ID is required" });
    }

    // Find students supervised by the given supervisor ID
    const students = await prisma.students.findMany({
      where: {
        supervisors: {
          some: {
            supervisor_id: Number(id), // Filter by supervisor ID
          },
        },
      },
      include: {
        supervisors: {
          include: {
            supervisor: true, // Include supervisor details if needed
          },
        },
      },
    });

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this supervisor" });
    }

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/get-student", async(req, res)=>{

  const {id} = req.query;

  if(!id){
    return res.status(400).json({message:"something went wrong student id needed"})
  }
  try{
    const std = await prisma.students.findUnique({
      where:{id:Number(id)},
      include:{
        logbooks:{
          include:{
            weekly:true
          }
        }
      }
    })
    return res.json(std)
  }
  catch{
return res.json({message:"something went wrong"})
  }


})

module.exports = router;
