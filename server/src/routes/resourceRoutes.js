const express = require("express")

const router = express.Router()

const authMiddleware = require(
  "../middleware/authMiddleware"
)

const upload = require(
  "../config/multer"
)

const {
  uploadResource,
  getResources,
  deleteResource,
  renameResource,
} = require(
  "../controllers/resourceController"
)

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadResource
)
router.get(
  "/",
  authMiddleware,
  getResources
)

router.delete(
  "/:id",
  authMiddleware,
  deleteResource
)

router.put(
  "/:id",
  authMiddleware,
  renameResource
)
module.exports = router