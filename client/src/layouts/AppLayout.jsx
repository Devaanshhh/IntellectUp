import { useState } from "react"

import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"

import { useTheme }
from "../context/ThemeContext"

function AppLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const { theme } = useTheme()

  return (

    <div className="min-h-screen bg-[#111315] text-white">

      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">

        <Sidebar
          sidebarOpen={sidebarOpen}
        />

        <main
          className="
          flex-1
          p-6
          overflow-auto
          "
        >
          {children}
        </main>

      </div>

    </div>

  )

}

export default AppLayout