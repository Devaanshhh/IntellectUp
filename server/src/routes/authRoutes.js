const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const {
  registerUser,
  loginUser,
} = require("../controllers/authController")
const {
  validateRequiredFields,
} = require(
  "../middleware/validateMiddleware"
)
const router = express.Router()

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working",
  })
})

router.post(
  "/register",

  validateRequiredFields([
    "username",
    "email",
    "password",
  ]),

  registerUser
)

router.post(
  "/login",

  validateRequiredFields([
    "email",
    "password",
  ]),

  loginUser
)

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    res.status(200).json({
      message: "Protected route accessed",
      user: req.user,
    })

  }
)
module.exports = router