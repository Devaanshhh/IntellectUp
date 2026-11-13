const pool = require("../config/db")

const createResource = async (
  user_id,
  filename,
  original_name,
  filepath,
  filetype,
  filesize
) => {

  const result = await pool.query(

    `INSERT INTO resources
    (
      user_id,
      filename,
      original_name,
      filepath,
      filetype,
      filesize
    )

    VALUES ($1, $2, $3, $4, $5, $6)

    RETURNING *`,

    [
      user_id,
      filename,
      original_name,
      filepath,
      filetype,
      filesize,
    ]

  )

  return result.rows[0]
}
const getUserResources = async (userId) => {

  const result = await pool.query(

    `SELECT *
     FROM resources
     WHERE user_id = $1
     ORDER BY created_at DESC`,

    [userId]

  )

  return result.rows
}

const getResourceById = async (
  resourceId
) => {

  const result = await pool.query(

    `SELECT *
     FROM resources
     WHERE id = $1`,

    [resourceId]

  )

  return result.rows[0]
}

const deleteResourceById = async (
  resourceId
) => {

  await pool.query(

    `DELETE FROM resources
     WHERE id = $1`,

    [resourceId]

  )
}

const renameResourceById = async (
  resourceId,
  newName
) => {

  const result = await pool.query(

    `UPDATE resources
     SET original_name = $1
     WHERE id = $2
     RETURNING *`,

    [newName, resourceId]

  )

  return result.rows[0]
}


module.exports = {
  createResource,
  getUserResources,
  getResourceById,
  deleteResourceById,
  renameResourceById,
}