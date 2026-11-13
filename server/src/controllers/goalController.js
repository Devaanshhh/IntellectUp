const {
  createGoal,
  getGoalsByUser,
  updateGoalProgress,
  deleteGoal
} = require("../models/goalModel")

const addGoal = async (
  req,
  res
) => {

  try {

    const {
      title,
      targetValue
    } = req.body

    const goal =
      await createGoal(
        req.user.id,
        title,
        targetValue
      )

    res.status(201).json({
      success: true,
      goal
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to create goal"
    })

  }

}

const getAllGoals = async (
  req,
  res
) => {

  try {

    const goals =
      await getGoalsByUser(
        req.user.id
      )

    res.json({
      success: true,
      goals
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to fetch goals"
    })

  }

}
const updateGoal = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params

    const {
  current_value
} = req.body

const goal =
  await updateGoalProgress(
    id,
    current_value
  )

    res.json({
      success: true,
      goal
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to update goal"
    })

  }

}

const removeGoal = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params

    await deleteGoal(id)

    res.json({
      success: true,
      message:
        "Goal deleted"
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to delete goal"
    })

  }

}

module.exports = {
  addGoal,
  getAllGoals,
  updateGoal,
  removeGoal
}