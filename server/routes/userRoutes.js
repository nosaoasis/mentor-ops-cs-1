const express = require("express")
const router = express.Router()

const {registerUserController} = require("../controllers/UserControllers")

router.route("/signup").post(registerUserController)

module.exports = router