const asyncHandler = require(
  "../utils/asyncHandler"
)

const {
  createFolderService,
  getFoldersService,
  deleteFolderService,
} = require(
  "../services/folderService"
)

const createFolder = asyncHandler(
  async (req, res) => {

    const { name } = req.body

    const folder =
      await createFolderService(
        req.user.id,
        name
      )

    res.status(201).json({
      success: true,
      folder,
    })

  }
)

const getFolders = asyncHandler(
  async (req, res) => {

    const folders =
      await getFoldersService(
        req.user.id
      )

    res.status(200).json({
      success: true,
      folders,
    })

  }
)

const deleteFolder = asyncHandler(
  async (req, res) => {

    await deleteFolderService(
      req.params.id
    )

    res.status(200).json({
      success: true,
      message: "Folder deleted",
    })

  }
)

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,
}