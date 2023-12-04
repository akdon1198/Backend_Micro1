const router = require("express").Router()
const WeeklistModal = require("../modal/WeeklistModal")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const islogin = (req, res, next) => {
    try{
        const {token} = req.headers
        jwt.verify(token, process.env.PASSWORD)
        next()
    }catch(err){
        res.json({
            message : "token expired"
        })
    }
}

router.get("/userlist/:id", async (req, res) => {
    try{
        const {id} = req.params
        const list = await WeeklistModal.find({user_id : id})
        res.json({
            list
        })
    }catch(err){
        res.json({
            message : "oops something went wrong"
        })
    }
})

router.post("/createlist", async (req, res)=>{
    try{
        await WeeklistModal.create(req.body)
        res.json({
            message : "list created successfully"
        })
    }catch(err){
        res.json({
            message : "oops something went wrong"
        })
    }
})

router.patch("/updatelist/:id", async (req, res)=>{
    try{
        const {id} = req.params
        await WeeklistModal.findByIdAndUpdate(id, req.body)
        res.json({
            message : "list updated successfuly"
        })
    }catch(err){
        res.json({
            message : "oops something went wrong"
        })
    }
})

router.delete("/deletelist/:id", async (req, res)=>{
    try{
        const {id} = req.params
        await WeeklistModal.findByIdAndDelete(id)
        res.json({
            message : "list deleted successfuly"
        })
    }catch(err){
        res.json({
            message : "oops something went wrong"
        })
    }
})

module.exports = router