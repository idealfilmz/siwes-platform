const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const createError = require("http-errors");

const siwes = require("./Apis/siwesApis/siwes");
const register = require("./Apis/authentications/stdauth");
const lecturer = require("./Apis/authentications/lectures");
const dashboard = require("./Apis/dashboard/lecturerdashboard");
const fetchdetails = require("../siwes_backend/Apis/authentications/userdetails");
const authenticateToken = require("./security/token");
const lecturerApis = require("./Apis/lecturerApis");
const loginOnly = require("./Apis/authentications/loginonly");
const student_api = require("../siwes_backend/Apis/studentsApis")
const fileHoder = require("../siwes_backend/Apis/files_handler")
const processors = require("../siwes_backend/Apis/q_a_processors/q.a")
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Specify the exact origin you want to allow
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Add 'token' to allowed headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", register);
app.use("/", siwes);
app.use("/", lecturer);
app.use("/", fetchdetails);
app.use("/", lecturerApis);
app.use("/api", loginOnly);
app.use("/api", dashboard);
app.use("/", fileHoder);
app.use('/api', processors)

app.use("", student_api);

app.use(morgan("dev"));

app.use(async (req, res, next) => {
  next(
    createError.NotFound("You are not allowed to this page at this moment.")
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
