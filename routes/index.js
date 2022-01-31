const express = require('express')
const router = express.Router()


// https://class.codepadding.com/
router.get("/",(req,res)=>{
    res.send("Wellcome to api")
})


https://class.codepadding.com/user
router.use("/user",require('./user'))




module.exports = router