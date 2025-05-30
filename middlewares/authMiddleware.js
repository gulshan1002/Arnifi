const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const isLoggedIn = async (req, res, next) => {
    console.log('Checking if user is logged in...');
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'You are not logged in'
        });
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

module.exports = { isLoggedIn };