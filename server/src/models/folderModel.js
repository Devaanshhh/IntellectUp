const pool = require("../config/db")

const createFolder = async (
  userId,
  name
) => {

  const result = await pool.query(

    `INSERT INTO folders
    (user_id, name)

    VALUES ($1, $2)

    RETURNING *`,

    [userId, name]

  )

  return result.rows[0]
}

const getUserFolders = async (
  userId
) => {

  const result = await pool.query(

    `SELECT *
     FROM folders
     WHERE user_id = $1
     ORDER BY created_at DESC`,

    [userId]

  )

  return result.rows
}

const deleteFolderById = async (
  folderId
) => {

  await pool.query(

    `DELETE FROM folders
     WHERE id = $1`,

    [folderId]

  )
}

module.exports = {
  createFolder,
  getUserFolders,
  deleteFolderById,
}