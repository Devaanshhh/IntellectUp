const {
  registerService,
  loginService,
} = require("../services/authService")

const asyncHandler = require("../utils/asyncHandler")

const registerUser = asyncHandler(
  async (req, res) => {

    const {
      username,
      email,
      password,
    } = req.body



    const user = await registerService(
      username,
      email,
      password
    )

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    })

  }
)

const loginUser = asyncHandler(
  async (req, res) => {

    const { email, password } = req.body

    const data = await loginService(
      email,
      password
    )

    res.status(200).json({
      success: true,
      message: "Login successful",
      ...data,
    })

  }
)

module.exports = {
  registerUser,
  loginUser,
}