const express = require('express')
const router = express.Router()

const { login, signup } = require('../controllers/Auth')
const { auth, isStudent, isAdmin } = require('../middlewares/auth')

router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: 'welcome to the route for protected tests'
    })
})

router.post('/login', login)
router.post('/signup', signup)
router.get('/student', auth, isStudent, (req, res) => {

    res.json({
        success: true,
        message: 'welcome to the route for protects students'
    })

})

router.get('/admin', auth, isAdmin, (req, res) => {

    res.json({
        success: true,
        message: 'welcome to the route for protected admin'
    })

})

module.exports = router;