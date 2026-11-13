const { createTask, getTasksByUser } = require("../models/taskModel");
// 💡 Tip: You should ideally move this pool query into taskModel.js to keep things consistent!
const pool = require("../config/db"); 

const addTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = await createTask(req.user.id, title, description, priority, dueDate);
    
    res.status(201).json({
      success: true,
      task
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.id);
    
    res.status(200).json({
      success: true,
      tasks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const task = await pool.query(
      `UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    res.json({
      success: true,
      task: task.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteTask = async (req, res) => {

  try {

    const { id } = req.params

    await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
      `,
      [id]
    )

    res.json({
      success: true,
      message: "Task deleted"
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message: "Server Error"
    })

  }

}

// FIXED: All three functions are now properly exported together
module.exports = {
  addTask,
  getAllTasks,
  updateTaskStatus,
  deleteTask
};