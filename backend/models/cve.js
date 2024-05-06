const mongoose = require("mongoose")

const CVESchema = new mongoose.Schema({
    id:{
        type: String
    },
    sourceIdentifier:{
        type: String,
    },
    published:{
        type: Date,
    },
    lastModified:{
        type: Date,
    },
    vulnStatus:{
        type: String,
    },
    descriptions:{
        type: [Object]
    },
    metrics:{
        type: Object
    },
    weaknesses:{
        type: [Object]
    },
    configurations:{
        type: [Object]
    },
    references:{
        type: [Object]
    }
})

module.exports = mongoose.model("CVE",CVESchema)