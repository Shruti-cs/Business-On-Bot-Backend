const User = require("../models/user");

module.exports.userSignup = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        const newUser = new User({
            name,
            email,
            password
        })
        const savedUser = await newUser.save()
        const tokens = await savedUser.generateTokens()
        return res.status(200).json({
            message: 'User registration successful!',
            user: savedUser,
            tokens
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error while registering user'
        })
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id)
            .lean()
            .exec()
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An unexpected error occured!'
        })
    }
}