

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const createError = require('http-errors');
const loginApi = require('../siwes_backend/Apis/authentications/auth')
const register = require("../siwes_backend/Apis/authentications/register")
const lectureRegister =  require("../siwes_backend/Apis/lecturerApis")
const lecturedetails = require("../siwes_backend/Apis/fetchLectures")
const fetchStd = require("../siwes_backend/Apis/createApi")
const app= express()

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', register)
app.use("/", lectureRegister)
app.use("/",loginApi)
app.use("/", lecturedetails)
app.use("/",fetchStd)




app.use(morgan('dev'));
app.use(async (req, res, next) => {
  next(createError.NotFound('You are not allowed to this page at this moment.'));
});

app.get("/",(req,res,next)=>{
res.status(201).json({"name":"john paul", "age":70})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running at ${PORT}`);
});
