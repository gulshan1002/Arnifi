const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

const signToken = (userId) => {
    return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}


const signup = async(req, res)=>{
    console.log(req.body);
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const login = async(req, res)=>{
    console.log(req.body);
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = signToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({
            success: true,
            token,
            message: 'Logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }   
}
const logout = async(req, res)=>{
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

module.exports = {signup,login,logout};