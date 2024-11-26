

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const createError = require('http-errors');

const register = require("./Apis/authentications/stdauth")
const fetchdetails = require("../siwes_backend/Apis/authentications/userdetails")
const  authenticateToken =require('./security/token');
const app = express()
const corsOptions = {
  origin: 'http://localhost:3001', // Specify the exact origin you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Add 'token' to allowed headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', register)
app.use('/',fetchdetails)
app.use(morgan('dev'));


app.use(async (req, res, next) => {
  next(createError.NotFound('You are not allowed to this page at this moment.'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

