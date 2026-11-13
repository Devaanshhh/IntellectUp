const {
  createFolder,
  getUserFolders,
  deleteFolderById,
} = require("../models/folderModel")

const createFolderService = async (
  userId,
  name
) => {

  if (!name) {
    throw new Error("Folder name required")
  }

  return await createFolder(
    userId,
    name
  )
}

const getFoldersService = async (
  userId
) => {

  return await getUserFolders(userId)
}

const deleteFolderService = async (
  folderId
) => {

  await deleteFolderById(folderId)
}

module.exports = {
  createFolderService,
  getFoldersService,
  deleteFolderService,
}