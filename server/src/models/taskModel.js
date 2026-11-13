const pool = require("../config/db")

const createTask = async (
  userId,
  title,
  description,
  priority,
  dueDate
) => {

  const result = await pool.query(

    `
    INSERT INTO tasks
    (
      user_id,
      title,
      description,
      priority,
      due_date
    )
    VALUES
    ($1,$2,$3,$4,$5)
    RETURNING *
    `,

    [
      userId,
      title,
      description,
      priority,
      dueDate
    ]

  )

  return result.rows[0]

}
const getTasksByUser = async (userId) => {

  const result = await pool.query(

    `
    SELECT *
    FROM tasks
    WHERE user_id = $1
    ORDER BY due_date ASC
    `,

    [userId]

  )

  return result.rows

}

module.exports = {
  createTask,
  getTasksByUser
}