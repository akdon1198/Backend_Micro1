const router = require("express").Router()
const Usermodal = require("../modal/UserModal")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()


router.post("/login", async (req, res)=>{
    const {email, password} = req.body
    try{
        const user = await Usermodal.findOne({email})
        const haspasswordmatch = await bcrypt.compare(password, user.password)
        if(haspasswordmatch){
            const jwttoken = jwt.sign(user.toJSON(), process.env.PASSWORD, {expiresIn : 30})
            res.json({
                message:"user login successfully",
                jwttoken
            })
        }else{
            res.json({
                message :"wrong credentials"
            })
        }
    }catch(err){
        res.json({
            message:"not login",
            err
        })
    }
})

router.post("/register", async (req, res)=>{
    try{
        const jwttoken = jwt.sign(req.body, process.env.PASSWORD, {expiresIn:30})
        const encryptedpass = await bcrypt.hash(req.body.password, 10)
        req.body.password = encryptedpass
        await Usermodal.create(req.body)
        res.json({
            message:"User registered successfuly",
            jwttoken      
        })
    }catch(err){
        res.json({
            message : "user not created"
        })
    }
})

module.exports = router