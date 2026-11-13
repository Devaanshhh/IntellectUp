const asyncHandler = require(
  "../utils/asyncHandler"
)

const {
  uploadResourceService,
  getResourcesService,
  deleteResourceService,
  renameResourceService,
} = require("../services/resourceService")

const uploadResource = asyncHandler(
  async (req, res) => {

    const resource =
      await uploadResourceService(
        req.user.id,
        req.file
      )

    res.status(201).json({
      success: true,
      message: "Resource uploaded successfully",
      resource,
    })

  }
)

const getResources = asyncHandler(
  async (req, res) => {

    const resources =
      await getResourcesService(
        req.user.id
      )

    res.status(200).json({
      success: true,
      resources,
    })

  }
)

const deleteResource = asyncHandler(
  async (req, res) => {

    await deleteResourceService(
      req.params.id,
      req.user.id
    )

    res.status(200).json({
      success: true,
      message: "Resource deleted",
    })

  }
)

const renameResource = asyncHandler(
  async (req, res) => {

    const { newName } = req.body

    if (!newName) {

      res.status(400)

      throw new Error("New name required")
    }

    const updatedResource =
      await renameResourceService(
        req.params.id,
        req.user.id,
        newName
      )

    res.status(200).json({
      success: true,
      resource: updatedResource,
    })

  }
)

module.exports = {
  uploadResource,
  getResources,
  deleteResource,
  renameResource,
}