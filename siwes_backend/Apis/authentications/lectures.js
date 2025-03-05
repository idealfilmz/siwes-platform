const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../../client");
const nodemailer = require("nodemailer");

const generateRandomNumbers = (count) => {
  let randomNumbers = "";
  for (let i = 0; i < count; i++) {
    randomNumbers += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
  }
  return randomNumbers;
};


  });

  let mailOptions = {
    from: "samuelyyyy257@gmail.com", // replace with your email
    to: email,
    subject: "Your Staff ID",
    text: `Your staff ID is: ${uniqueKey}`,
  };

  await transporter.sendMail(mailOptions);
};

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

    const randomNumbers = generateRandomNumbers(5);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSupervisor = await prisma.supervisors.create({
      data: {
        email,
        phone_number,
        fullname,
        password: hashedPassword,
        UQ: randomNumbers,
      },
    });

    await sendEmail(email, randomNumbers);

    res.json({
      message: "Your staff_id has been sent to your registered mail",
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res
      .status(500)
      .json({ message: "An error occurred CREATING ACCOUNT", data: error });
  }
});

module.exports = router;
