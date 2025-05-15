const Blog = require('../models/blogModel');

const getBlogs = async (req, res) => {
    const { category, author } = req.query;

    try {
        const filter = {};
        if (category) filter.category = category;
        if (author) filter.author = author;

        const blogs = await Blog.find(filter).populate('author', 'username');
        res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const createBlog = async (req, res) => {
    console.log(req.user);
    const { title, category, content, image } = req.body;
    try {
        const blog = await Blog.create({
            title,
            category,
            content,
            author: req.user._id,
            image,
        });
        res.status(201).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id).populate('author', 'username');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, category, content, image } = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Check if the logged-in user is the author of the blog
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this blog',
            });
        }

        // Update the blog
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, category, content, image },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        // check if the logged in user is the author of the blog
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this blog',
            });
        }
        await Blog.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};