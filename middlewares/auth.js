const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = (req, res, next) => {

    try {

        const token = req.body.token

        if (!token) {

            return res.status(401).json({
                success: false,
                message: 'token -> not found'
            })
        }

        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)
            req.user = payload
        }

        catch (err) {
            return res.status(401).json({
                success: false,
                message: 'token is not valid'
            })
        }

        next()
    }

    catch (err) {

        return res.status(401).json({
            success: false,
            message: 'something was wrong , while verifying token'
        })
    }
}

exports.isStudent = (req, res, next) => {

    try {
        if (req.user.role != 'Student') {

            return res.status(401).json({
                success: false,
                message: 'this is a protected route for students'
            })
        }

        next()
    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: 'user role is not matching'
        })
    }
}

exports.isAdmin = (req, res, next) => {

    try {
        if (req.user.role != 'Admin') {

            return res.status(401).json({
                success: false,
                message: 'this is a protected route for Admin'
            })
        }

        next()
    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: 'user role is not matching'
        })
    }
}