import {
  FaHome,
  FaFolder,
  FaTasks,
  FaBullseye,
  FaCalendarAlt,
  FaClock,
  FaRobot,
  FaChartBar,
  FaUsers,
} from "react-icons/fa"

import { NavLink } from "react-router-dom"

function Sidebar({ sidebarOpen }) {

  const menuItems = [

  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },

  {
    name: "Resources",
    icon: <FaFolder />,
    path: "/resources",
  },

  {
    name: "Planner",
    icon: <FaTasks />,
    path: "/tasks",
  },

  {
    name: "Goals",
    icon: <FaBullseye />,
    path: "/goals",
  },

  {
    name: "Schedule",
    icon: <FaCalendarAlt />,
    path: "/planner",
  },

  {
    name: "Focus Mode",
    icon: <FaClock />,
    path: "/focus",
  },

  {
    name: "AI Assistant",
    icon: <FaRobot />,
    path: "/assistant",
  },

  {
    name: "Analytics",
    icon: <FaChartBar />,
    path: "/analytics",
  },

  {
    name: "Study Rooms",
    icon: <FaUsers />,
    path: "/rooms",
  },

]

  return (

    <aside

      className={`

      h-[calc(100vh-80px)]

      border-r

      border-gray-200
      dark:border-gray-800

      bg-white
      dark:bg-[#111315]

      transition-all
      duration-300

      ${sidebarOpen ? "w-64" : "w-20"}

      `}

    >

      <div

        className="

        py-6

        flex
        flex-col

        gap-2

        "

      >

        {

          menuItems.map((item) => (

            <NavLink

              key={item.name}

              to={item.path}

              className={({ isActive }) => `

                mx-3

                flex
                items-center

                gap-4

                px-4
                py-3

                rounded-xl

                transition-all

                ${

                  isActive

                    ?

                    "bg-[#7AC943] text-black font-semibold"

                    :

                    "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1A1D21]"

                }

              `}

            >

              <span

                className="

                text-lg

                min-w-[20px]

                "

              >

                {item.icon}

              </span>

              {

                sidebarOpen && (

                  <span>

                    {item.name}

                  </span>

                )

              }

            </NavLink>

          ))

        }

      </div>

    </aside>

  )

}

export default Sidebar