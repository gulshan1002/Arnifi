const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // allow cookies and credentials
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

module.exports = app;