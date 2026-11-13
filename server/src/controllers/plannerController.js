const {
  createPlannerEntry,
  getPlannerByUser,
  getTodaySchedule
} = require("../models/plannerModel")

const addPlannerEntry = async (
  req,
  res
) => {

  try {

    const {
      title,
      study_date,
      start_time,
      end_time,
      notes
    } = req.body

    const entry =
      await createPlannerEntry(

        req.user.id,

        title,
        study_date,
        start_time,
        end_time,
        notes

      )

    res.status(201).json({

      success: true,
      entry

    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to create planner entry"
    })

  }

}

const getPlannerEntries = async (
  req,
  res
) => {

  try {

    const entries =
      await getPlannerByUser(
        req.user.id
      )

    res.json({

      success: true,
      entries

    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to fetch planner"
    })

  }

}
const getTodayEntries = async (
  req,
  res
) => {

  try {

    const entries =
      await getPlannerByUser(
        req.user.id
      )

    const today =
      new Date()
        .toLocaleDateString(
          "en-CA"
        )

    const todayEntries =
      entries.filter(
        entry =>
          entry.study_date
            ?.toISOString()
            ?.split("T")[0]
          === today
      )

    res.json({
      success: true,
      entries: todayEntries
    })

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      message:
        "Failed to fetch today's schedule"
    })

  }

}

module.exports = {
  addPlannerEntry,
  getPlannerEntries,
  getTodayEntries
}