const pool = require("../config/db")

const createPlannerEntry = async (
  userId,
  title,
  studyDate,
  startTime,
  endTime,
  notes
) => {

  const result = await pool.query(

    `
    INSERT INTO planner
    (
      user_id,
      title,
      study_date,
      start_time,
      end_time,
      notes
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,

    [
      userId,
      title,
      studyDate,
      startTime,
      endTime,
      notes
    ]

  )

  return result.rows[0]

}

const getPlannerByUser = async (
  userId
) => {

  const result = await pool.query(

    `
    SELECT *
    FROM planner
    WHERE user_id = $1
    ORDER BY study_date ASC
    `,

    [userId]

  )

  return result.rows

}
const getTodaySchedule = async (userId) => {

  const result = await pool.query(

    `
    SELECT *
    FROM planner
    WHERE user_id = $1
    AND study_date = CURRENT_DATE
    ORDER BY start_time ASC
    `,

    [userId]

  )

  return result.rows

}

module.exports = {
  createPlannerEntry,
  getPlannerByUser,
  getTodaySchedule
}