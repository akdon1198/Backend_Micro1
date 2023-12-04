const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const app = express()
const authRoutes = require("./routes/authroute")
const WeeklistRoutes = require("./routes/weeklistroute")
dotenv.config()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("database connected");})
.catch(()=>{console.log("database not connected");})

app.get("/health", (req, res)=>{
    res.json({
        servername : "server"
    })
})
app.use("/auth", authRoutes)
app.use("/weeklist", WeeklistRoutes)
app.get("/:notfound", (req, res)=>{
    res.json({
        message : "route not found"
    })
})
app.listen(process.env.PORT, ()=>{
    console.log("server is started");
})