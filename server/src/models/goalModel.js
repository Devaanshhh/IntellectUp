const pool = require("../config/db")

const createGoal = async (
  userId,
  title,
  targetValue
) => {

  const result = await pool.query(
    `
    INSERT INTO goals
    (
      user_id,
      title,
      target_value
    )
    VALUES ($1,$2,$3)
    RETURNING *
    `,
    [
      userId,
      title,
      targetValue
    ]
  )

  return result.rows[0]
}

const getGoalsByUser = async (
  userId
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM goals
    WHERE user_id=$1
    ORDER BY created_at DESC
    `,
    [userId]
  )

  return result.rows
}
const updateGoalProgress = async (
  id,
  currentValue
) => {

  const result = await pool.query(
    `
    UPDATE goals
    SET current_value=$1
    WHERE id=$2
    RETURNING *
    `,
    [
      currentValue,
      id
    ]
  )

  return result.rows[0]
}

const deleteGoal = async (id) => {

  await pool.query(
    `
    DELETE FROM goals
    WHERE id=$1
    `,
    [id]
  )

}

module.exports = {
  createGoal,
  getGoalsByUser,
  updateGoalProgress,
  deleteGoal
}