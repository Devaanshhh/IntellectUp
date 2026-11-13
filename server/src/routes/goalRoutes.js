const express =
require("express")

const router =
express.Router()

const auth =
require(
  "../middleware/authMiddleware"
)

const {
  addGoal,
  getAllGoals,
  updateGoal,
  removeGoal
} = require(
  "../controllers/goalController"
)


router.post(
  "/",
  auth,
  addGoal
)

router.get(
  "/",
  auth,
  getAllGoals
)
router.put(
  "/:id",
  auth,
  updateGoal
)

router.delete(
  "/:id",
  auth,
  removeGoal
)

module.exports =
router