require("dotenv").config()
const taskRoutes =
require("./routes/taskRoutes")
const app = require("./app")
const goalRoutes =
require("./routes/goalRoutes")
const plannerRoutes =
require("./routes/plannerRoutes")
const streakRoutes =
require("./routes/streakRoutes")
const {
  logInfo,
} = require("./utils/logger")

const PORT = process.env.PORT || 5000
app.use(
  "/api/tasks",
  taskRoutes
)

app.use(
  "/api/goals",
  goalRoutes
)

app.use(
  "/api/planner",
  plannerRoutes
)
app.use(
  "/api/streak",
  streakRoutes
)

app.listen(PORT, () => {

  logInfo(
    `Server running on port ${PORT}`
  )

})