const {
  createResource,
  getUserResources,
  getResourceById,
  deleteResourceById,
  renameResourceById,
} = require("../models/resourceModel")

const fs = require("fs")

const uploadResourceService = async (
  userId,
  file
) => {

  if (!file) {
    throw new Error("No file uploaded")
  }

  const resource = await createResource(
    userId,
    file.filename,
    file.originalname,
    file.path,
    file.mimetype,
    file.size
  )

  return resource
}

const getResourcesService = async (
  userId
) => {

  return await getUserResources(userId)
}

const deleteResourceService = async (
  resourceId,
  userId
) => {

  const resource =
    await getResourceById(resourceId)

  if (!resource) {
    throw new Error("Resource not found")
  }

  if (resource.user_id !== userId) {
    throw new Error("Unauthorized")
  }

  // Delete physical file
  if (fs.existsSync(resource.filepath)) {
    fs.unlinkSync(resource.filepath)
  }

  await deleteResourceById(resourceId)
}

const renameResourceService = async (
  resourceId,
  userId,
  newName
) => {

  const resource =
    await getResourceById(resourceId)

  if (!resource) {
    throw new Error("Resource not found")
  }

  if (resource.user_id !== userId) {
    throw new Error("Unauthorized")
  }

  return await renameResourceById(
    resourceId,
    newName
  )
}

module.exports = {
  uploadResourceService,
  getResourcesService,
  deleteResourceService,
  renameResourceService,
}