const mongoose = require('mongoose')
require('dotenv').config()


exports.dbConnect = () => {

    mongoose.connext(process.env.MONGODB_URL , {
        useNewUrlParser : true ,
        useUnifiedTopology : true
    })
    .then(() => {console.log('db jud gaya h')})
    .catch( (err) => {
        console.log('db nhi jud rha ye')
        console.error(err)
        process.exit(1)
    })
}