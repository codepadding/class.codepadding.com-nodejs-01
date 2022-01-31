const express = require('express')
const router = express.Router()


// http://localhost:4000/
router.get("/",(req,res)=>{
    res.send("Wellcome to api")
})

router.use("/user",require('./user'))




module.exports = router