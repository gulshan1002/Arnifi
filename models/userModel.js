const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const saltRounds = 10;
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;