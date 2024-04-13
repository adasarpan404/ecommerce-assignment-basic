const jwt = require('jsonwebtoken');
const { Request, Response, NextFunction } = require('express');
const UserModel = require('../model/user.model');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
exports.checkAccount = async (req, res, next) => {
    try {
        const { phone } = req.body
        let userObj = await UserModel.findOne({ phone });
        if (!userObj) {
            userObj = await UserModel.create({
                phone
            })
        }

        userObj.createOTP();
        await userObj.save({ validateBeforeSave: false })

        return res.status(200).json({
            status: true,
            message: "OTP Sent Successfully"
        })
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: e.message
        })
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
exports.verifyOTP = async (req, res, next) => {
    try {
        const { phone, OTP } = req.body;

        let userObj = await UserModel.findOne({ phone, OTP })
        if (!userObj) {
            return res.status(203).json({
                status: false,
                message: 'Wrong OTP!!!! Verification Unsuccessful'
            })
        }

        return res.status(200).json({
            status: true,
            message: "OTP Verification done Successfully",
            userid: userObj._id
        })
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: e.message
        })
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns 
 */
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const { user } = req.params

        const userObj = await UserModel.findById(user)

        userObj.name = name
        userObj.email = email

        await userObj.save({ validateBeforeSave: false })

        return res.status(200).json({
            status: true,
            message: 'Data Saved Successfully',
            user: userObj
        })
    } catch (e) {
        return res.status(500)
    }
}