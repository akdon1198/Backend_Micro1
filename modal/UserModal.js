const mongoose = require("mongoose")
const Usermodal = mongoose.model("User", {
    fullname : String,
    email : String,
    password : String,
    age : Number,
    gender : String,
    mobile : Number
})
module.exports = Usermodal