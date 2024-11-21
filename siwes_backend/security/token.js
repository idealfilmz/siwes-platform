require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing!',
        messsage:"Login again or contact us..."
         });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token is not valid',
        messsage:"Login again or Contact us..",
        error:error
         });
    }
};

module.exports = authenticateToken;
