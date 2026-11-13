const pool = require("../config/db")

const getUserStreak = async (userId) => {

  const result = await pool.query(
    `
    SELECT *
    FROM user_streaks
    WHERE user_id = $1
    `,
    [userId]
  )

  return result.rows[0]
}

const createUserStreak = async (userId) => {

  const result = await pool.query(
    `
    INSERT INTO user_streaks
    (
      user_id,
      current_streak,
      last_login
    )
    VALUES
    (
      $1,
      1,
      CURRENT_DATE
    )
    RETURNING *
    `,
    [userId]
  )

  return result.rows[0]
}

const updateUserStreak = async (
  userId,
  streak
) => {

  const result = await pool.query(
    `
    UPDATE user_streaks
    SET
      current_streak = $1,
      last_login = CURRENT_DATE
    WHERE user_id = $2
    RETURNING *
    `,
    [
      streak,
      userId
    ]
  )

  return result.rows[0]
}

module.exports = {
  getUserStreak,
  createUserStreak,
  updateUserStreak
}