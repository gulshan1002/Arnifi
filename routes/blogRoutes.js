const express = require('express');
const blogRoutes = express.Router();

const {isLoggedIn} = require('../middlewares/authMiddleware');
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog,} = require('../controllers/blogController');

blogRoutes.get('/', isLoggedIn, getBlogs);
blogRoutes.get('/:id', isLoggedIn, getBlogById);
blogRoutes.post('/', isLoggedIn, createBlog);
blogRoutes.put('/:id', isLoggedIn, updateBlog);
blogRoutes.delete('/:id', isLoggedIn, deleteBlog);

module.exports = blogRoutes;

