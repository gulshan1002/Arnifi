const express = require('express');
const authRoutes = express.Router();

const {isLoggedIn} = require('../middlewares/authMiddleware');
const {signup, login, logout} = require('../controllers/authController');


authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/logout', isLoggedIn, logout);

module.exports = authRoutes;