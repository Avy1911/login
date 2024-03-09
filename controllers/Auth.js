const brcypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signup = async (req, res) => {

    try {

        const { name, email, role, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(400).json({
            success: false,
            message: 'pehle se h ye registered'
        })

        let hashedPassword;
        try {

            hashedPassword = await brcypt.hash(password, 10)
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'password hi hash nhi ho rha bhaisahab'
            })
        }

        const user = await User.create({
            name, email, password, role
        })

        return res.status(200).json({
            success: true,
            message: 'finally kamyaabi mil gayi'
        })
    }
    catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "user register hi nhi ho paaya , ek baar aur try maaro"
        })
    }
}

//for login

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'bhaiya saari details to bharo pehle'
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'user to available to h hi nhi yaar'
            })
        }

        const payload = {
            email: user.email,
            id: user.id,
            role: user.role
        }

        //check for the password and provide the jwt
        if (await brcypt.compare(password, user.password)) {
            //sign method
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })

            user = user.toObject()
            user.token = token
            user.password = undefined

            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 + 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'user logged in successfully'
            })
        }

        else {
            return res.status(403).json({
                success: false,
                message: 'incorrect password entered'
            })
        }
    }

    catch (err) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "couldnt login"
        })
    }
}