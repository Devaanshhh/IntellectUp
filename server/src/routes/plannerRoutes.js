const express =
require("express")

const router =
express.Router()

const auth =
require("../middleware/authMiddleware")

const {
  addPlannerEntry,
  getPlannerEntries,
  getTodayEntries
} = require("../controllers/plannerController")

router.post(
  "/",
  auth,
  addPlannerEntry
)

router.get(
  "/",
  auth,
  getPlannerEntries
)
router.get(
  "/today",
  auth,
  getTodayEntries
)

module.exports = router