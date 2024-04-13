const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Please provide a phone']
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    OTP: String
}, {
    timestamps: true
})

userSchema.methods.createOTP = function () {
    const OTPString = '561467'
    this.OTP = crypto.createHash('sha256').update(OTPString).digest('hex');
    this.OTPExpires = Date.now() + 10 * 60 * 1000;
    return OTPString;
}
const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel