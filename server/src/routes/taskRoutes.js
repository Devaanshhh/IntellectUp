const express = require("express");
const router = express.Router();

const {
  addTask,
  getAllTasks,
  updateTaskStatus,
  deleteTask
} = require(
  "../controllers/taskController"
)

const auth = require("../middleware/authMiddleware");

// Routes
router.post("/", auth, addTask);
router.get("/", auth, getAllTasks);
router.put("/:id/status", auth, updateTaskStatus);
router.delete(
  "/:id",
  auth,
  deleteTask
)

module.exports = router;