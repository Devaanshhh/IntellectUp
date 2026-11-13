import { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import API from "../../api/axios"

function Dashboard() {
const [streak, setStreak] = useState(0)
const [goals, setGoals] = useState([])
const [tasks, setTasks] = useState([])
const [resources, setResources] = useState([])
const [plannerEntries, setPlannerEntries] = useState([])
  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    )

  const firstName =
    user?.username || "Student"

    const fetchStreak = async () => {

  try {

    const res =
      await API.get("/streak")

    setStreak(
      res.data.streak?.current_streak || 0
    )

  }

  catch (err) {

    console.error(err)

  }

}

const fetchDashboardData = async () => {

  try {

    const [

      streakRes,
      goalsRes,
      tasksRes,
      resourcesRes,
      plannerRes

    ] = await Promise.all([

      API.get("/streak"),
      API.get("/goals"),
      API.get("/tasks"),
      API.get("/resources"),
      API.get("/planner")

    ])

    setStreak(
      streakRes.data.streak?.current_streak || 0
    )

    setGoals(
      goalsRes.data.goals || []
    )

    setTasks(
      tasksRes.data.tasks || []
    )

    setResources(
      resourcesRes.data.resources || []
    )

    setPlannerEntries(
      plannerRes.data.entries || []
    )

  }

  catch (err) {

    console.error(err)

  }

}

useEffect(() => {

  fetchDashboardData()

}, [])

  return (

    <AppLayout>

      {/* HEADER */}

      <div>

        <h1

          className="

          text-4xl

          font-bold

          "

        >

          Welcome back,
          {` ${firstName}`} 👋

        </h1>

        <p

          className="

          mt-2

          text-gray-500
          dark:text-gray-400

          "

        >

          Stay focused and keep
          building momentum.

        </p>

      </div>

      {/* STATS */}

      <div

        className="

        grid

        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4

        gap-6

        mt-8

        "

      >

        <div

          className="

          p-6

          rounded-2xl

          bg-white
          dark:bg-[#1A1D21]

          shadow-sm

          "

        >

          <h3
            className="text-sm text-gray-500"
          >

            🔥 Current Streak

          </h3>

          <p
            className="text-3xl font-bold mt-3"
          >

            {streak} Days

          </p>

        </div>

        <div

          className="

          p-6

          rounded-2xl

          bg-white
          dark:bg-[#1A1D21]

          shadow-sm

          "

        >

          <h3
            className="text-sm text-gray-500"
          >

            📚 Resources

          </h3>

          <p
            className="text-3xl font-bold mt-3"
          >

           {resources.length}

          </p>

        </div>

        <div

          className="

          p-6

          rounded-2xl

          bg-white
          dark:bg-[#1A1D21]

          shadow-sm

          "

        >

          <h3
            className="text-sm text-gray-500"
          >

            🎯 Active Goals

          </h3>

          <p
            className="text-3xl font-bold mt-3"
          >

            {goals.length}

          </p>

        </div>

        <div

          className="

          p-6

          rounded-2xl

          bg-white
          dark:bg-[#1A1D21]

          shadow-sm

          "

        >

          <h3
            className="text-sm text-gray-500"
          >

            ⏰ Pending Tasks

          </h3>

          <p
            className="text-3xl font-bold mt-3"
          >

            {
  tasks.filter(
    task =>
      task.status !== "completed"
  ).length
}

          </p>

        </div>

      </div>

      {/* TASKS + DEADLINES */}

      <div

        className="

        grid

        grid-cols-1
        lg:grid-cols-2

        gap-6

        mt-8

        "

      >

        <div

          className="

          p-6

          rounded-2xl

          bg-white
          dark:bg-[#1A1D21]

          "

        >

          <h2

            className="

            text-xl

            font-semibold

            mb-4

            "

          >

            Today's Schedule

          </h2>

          <ul className="space-y-4">

{
plannerEntries.length > 0

?

plannerEntries

.filter(entry => {

const today =
new Date()
.toISOString()
.slice(0, 10)

const entryDate =
new Date(entry.study_date)
.toISOString()
.slice(0, 10)

return entryDate === today

})

.map(entry => (

<li
key={entry.id}
className="flex justify-between"
>

<span>
{entry.title}
</span>

<span
className="
text-sm
text-green-400
"
>
{entry.start_time}
</span>

</li>

))

:

<li>
No tasks scheduled for today
</li>

}

</ul>

        </div>

        <div

          className="

          p-6

          rounded-2xl

          bg-white
          dark:bg-[#1A1D21]

          "

        >

          <h2

            className="

            text-xl

            font-semibold

            mb-4

            "

          >

            Upcoming Deadlines

          </h2>

         <ul className="space-y-4">

{
  tasks.filter(
    task =>
      task.status !== "completed"
  ).length > 0

  ?

  tasks

    .filter(
      task =>
        task.status !== "completed"
    )

    .slice(0, 5)

    .map(task => (

      <li
        key={task.id}
        className="
        flex
        justify-between
        "
      >

        <span>
          {task.title}
        </span>

        <span
          className="
          text-xs
          text-yellow-400
          "
        >
          {task.priority}
        </span>

      </li>

    ))

  :

  <li>
    No pending deadlines
  </li>
}

</ul>

        </div>

      </div>

 {/* GOALS + RESOURCES */}

<div

  className="

  grid

  grid-cols-1
  lg:grid-cols-2

  gap-6

  mt-8

  "

>

  {/* CURRENT GOAL */}

  <div

    className="

    p-6

    rounded-2xl

    bg-white
    dark:bg-[#1A1D21]

    "

  >

    <h2

      className="

      text-xl

      font-semibold

      mb-4

      "

    >

      Current Goal

    </h2>

    {

      goals.length > 0

      ? (

        <>

          <h3 className="text-lg font-semibold">

            {goals[0].title}

          </h3>

          <div

            className="

            w-full

            bg-gray-700

            rounded-full

            h-3

            mt-4

            "

          >

            <div

              className="

              bg-[#7AC943]

              h-3

              rounded-full

              "

              style={{

                width: `${

                  Math.min(

                    100,

                    Math.round(

                      (

                        (goals[0].current_value || 0)

                        /

                        (goals[0].target_value || 1)

                      ) * 100

                    )

                  )

                }%`

              }}

            >

            </div>

          </div>

          <p

            className="

            mt-3

            text-green-500

            font-semibold

            "

          >

            {

              Math.min(

                100,

                Math.round(

                  (

                    (goals[0].current_value || 0)

                    /

                    (goals[0].target_value || 1)

                  ) * 100

                )

              )

            }%

          </p>

        </>

      )

      : (

        <p>

          No active goals

        </p>

      )

    }

  </div>

  {/* RECENT RESOURCES */}

  <div

    className="

    p-6

    rounded-2xl

    bg-white
    dark:bg-[#1A1D21]

    "

  >

    <h2

      className="

      text-xl

      font-semibold

      mb-4

      "

    >

      Recent Resources

    </h2>

    <ul

      className="

      space-y-4

      "

    >

      {

        resources.length > 0

        ? (

          resources

            .slice(0, 5)

            .map(resource => (

              <li

                key={resource.id}

              >

                📄 {resource.file_name}

              </li>

            ))

        )

        : (

          <li>

            No resources uploaded

          </li>

        )

      }

    </ul>

  </div>

</div>
    </AppLayout>

  )

}

export default Dashboard