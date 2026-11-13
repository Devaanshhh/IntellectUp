const {
  getUserStreak,
} = require("../models/streakModel")

const getStreak = async (
  req,
  res
) => {

  try {

    const streak =
      await getUserStreak(
        req.user.id
      )

    res.json({
      success: true,
      streak
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to fetch streak"
    })

  }

}

module.exports = {
  getStreak
}