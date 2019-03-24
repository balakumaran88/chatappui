const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chat',{ useNewUrlParser: true },  (err, connect)=> {
    if(!err) {
        console.log('connected to mongodb')
    }
})

module.exports = {
    db:mongoose
}