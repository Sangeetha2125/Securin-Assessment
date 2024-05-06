require("dotenv").config()
const express = require("express")
const connectDB = require("./database/connect")
const cors = require("cors")
const loadData = require("./database/loadData")
const { getAllCVEs, getCVE } = require("./controllers/cve")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.get("/api/cves",getAllCVEs)
app.get("/api/cves/:id",getCVE)

app.listen(port, async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Server is listening at port ${port}`)
    } catch (error) {
        console.log(error)
    }
})