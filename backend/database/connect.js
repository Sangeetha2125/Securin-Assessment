const mongoose = require("mongoose")

const connectDB = (uri) => {
    return mongoose.connect(uri,{
        dbName: "securin"
    })
}

module.exports = connectDB