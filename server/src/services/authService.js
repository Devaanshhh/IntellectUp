const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {
  findUserByEmail,
  createUser,
} = require("../models/authModel")

const {
  getUserStreak,
  createUserStreak,
  updateUserStreak,
} = require("../models/streakModel")

const registerService = async (
  username,
  email,
  password
) => {

  // Check existing user
  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    throw new Error("Email already exists")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  )

  // Create user
  const user = await createUser(
    username,
    email,
    hashedPassword
  )

  return user
}

const loginService = async (
  email,
  password
) => {

  // Check user
  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error("Invalid credentials")
  }
  // STREAK LOGIC

const streak =
  await getUserStreak(
    user.id
  )

if (!streak) {

  await createUserStreak(
    user.id
  )

}

else {

  const today =
    new Date()

  const lastLogin =
    new Date(
      streak.last_login
    )

  const diffDays =
    Math.floor(
      (
        today -
        lastLogin
      ) /
      (
        1000 *
        60 *
        60 *
        24
      )
    )

  if (diffDays === 1) {

    await updateUserStreak(
      user.id,
      streak.current_streak + 1
    )

  }

  else if (
    diffDays > 1
  ) {

    await updateUserStreak(
      user.id,
      1
    )

  }

}

  // Compare password
  const isMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!isMatch) {
    throw new Error("Invalid credentials")
  }

  // Generate token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  }
}

module.exports = {
  registerService,
  loginService,
}