import {
  FaMoon,
  FaSun,
} from "react-icons/fa"

import {
  useTheme,
} from "../../context/ThemeContext"

function ThemeToggle() {

  const {
    theme,
    toggleTheme,
  } = useTheme()

  return (

    <button

      onClick={toggleTheme}

      className="

      p-3
      rounded-xl

      bg-gray-200
      dark:bg-gray-800

      transition-all
      duration-300

      "

    >

      {

        theme === "dark"

        ?

        <FaSun />

        :

        <FaMoon />

      }

    </button>

  )
}

export default ThemeToggle