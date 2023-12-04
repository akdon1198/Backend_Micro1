const mongoose = require("mongoose")

const WeeklistModal = mongoose.model("Weeklist", {
    weeklistno : Number, 
    user_id : String,
    timeleft : Number,
    desc : Array
})

module.exports = WeeklistModal