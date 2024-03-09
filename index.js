const express = require('express')
const app = express()

require('dotenv').config()
const port = process.send.PORT || 4000

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

require('./config/database')

const user = require('./routes/user')
app.use('.api/v1' , user)

app.listen(port , () => {
    console.log(`app is ${port} pe chal rhi h`)
})
