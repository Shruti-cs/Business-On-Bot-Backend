const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minlength: 8,
        trim: true
    },
    accessTokens: [{
        token: {
            type: String,
        }
    }],
    refreshTokens: [{
        token: {
            type: String,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.accessTokens
    delete userObject.refreshTokens
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Invalid Email/Password!')
    }
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
        throw new Error('Invalid Email/Password!')
    }
    return user
}

userSchema.methods.generateTokens = async function () {
    const user = this
    const accessToken = jwt.sign({
        _id: user._id.toString(),
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h"
    });
    
    const refreshToken = jwt.sign({
        _id: user._id.toString(),
        email: user.email
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

    user.accessTokens = user.accessTokens.concat({ token: accessToken })
    user.refreshTokens = user.refreshTokens.concat({ token: refreshToken })

    await user.save()

    return {accessToken, refreshToken}
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;