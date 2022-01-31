const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

// https://class.codepadding.com/user
router.get("/", userController.getAllUser)


// https://class.codepadding.com/user/sign-up
router.post("/sign-up", userController.userSignUp)


// https://class.codepadding.com/user/login
router.post("/login", userController.userLogin)



// http://localhost:4000/user/update
router.post("/update", userController.updateUser)


// http://localhost:4000/user/delete
router.post("/delete", userController.deleteUser)



// http://localhost:4000/user/restore
router.post("/restore", userController.restore)


// http://localhost:4000/user/hard-delete
router.post("/hard-delete", userController.hardDelete)


module.exports = router