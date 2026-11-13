import { useState } from "react"

import {
  FaBars,
  FaMoon,
  FaSun,
  FaChevronDown,
} from "react-icons/fa"

import logo from "../../assets/logo/logo.png"



function Navbar({

  sidebarOpen,
  setSidebarOpen,

}) {

  const [dropdownOpen, setDropdownOpen] =
    useState(false)

  const user =
    JSON.parse(
      localStorage.getItem("user")
    )

  const initials =
    user?.username
      ?.substring(0, 2)
      ?.toUpperCase() || "IU"

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    window.location.href = "/"

  }

  return (

    <nav

      className="

      h-20

      flex
      items-center
      justify-between

      px-6

      border-b

      bg-white
      dark:bg-[#111315]

      border-gray-200
      dark:border-gray-800

      "

    >

      {/* LEFT */}

      <div

        className="

        flex
        items-center

        gap-4

        "

      >

        <button

          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }

          className="

          text-xl

          "

        >

          <FaBars />

        </button>

        <img

          src={logo}

          alt="logo"

          className="

          w-12
          h-12

          object-contain

          "

        />

        <div>

          <h1

            className="

            font-bold
            text-xl

            text-gray-900
            dark:text-white

            "

          >

            IntellectUp

          </h1>

          <p

            className="

            text-xs

            text-green-500

            "

          >

            Focus. Learn. Grow

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div

        className="

        flex
        items-center

        gap-6

        "

      >

        <div

          className="

          relative

          "

        >

          <button

            onClick={() =>
              setDropdownOpen(
                !dropdownOpen
              )
            }

            className="

            flex
            items-center

            gap-3

            "

          >

            <div

              className="

              w-10
              h-10

              rounded-full

              bg-[#7AC943]

              flex
              items-center
              justify-center

              font-bold

              text-black

              "

            >

              {initials}

            </div>

            <FaChevronDown />

          </button>

          {

            dropdownOpen && (

              <div

                className="

                absolute

                right-0
                top-14

                w-48

                rounded-xl

                bg-white
                dark:bg-[#1A1D21]

                border

                border-gray-200
                dark:border-gray-700

                shadow-xl

                overflow-hidden

                "

              >

                <button

                  className="

                  w-full

                  text-left

                  px-4
                  py-3

                  hover:bg-gray-100
                  dark:hover:bg-[#24282E]

                  "

                >

                  Profile

                </button>

                <button

                  className="

                  w-full

                  text-left

                  px-4
                  py-3

                  hover:bg-gray-100
                  dark:hover:bg-[#24282E]

                  "

                >

                  Settings

                </button>

                <button

                  onClick={handleLogout}

                  className="

                  w-full

                  text-left

                  px-4
                  py-3

                  text-red-500

                  hover:bg-gray-100
                  dark:hover:bg-[#24282E]

                  "

                >

                  Logout

                </button>

              </div>

            )

          }

        </div>

      </div>

    </nav>

  )

}

export default Navbar