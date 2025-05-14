const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['technology', 'health', 'lifestyle', 'education', 'business', 'entertainment'],
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;