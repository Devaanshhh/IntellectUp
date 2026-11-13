import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Login from
"../pages/auth/Login"

import Register from
"../pages/auth/Register"

import Dashboard from
"../pages/dashboard/Dashboard"

import Resources from
"../pages/resources/Resources" 

import ProtectedRoute from
"./ProtectedRoute"

import Tasks from "../pages/tasks/Tasks"

import Goals from "../pages/productivity/Goals"

import Planner from "../pages/planner/Planner"


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }
        />
        <Route
          path="/resources"
          element={

            <ProtectedRoute>

              <Resources />

            </ProtectedRoute>

          }
        />
        <Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  }
/>
<Route
  path="/goals"
  element={
    <ProtectedRoute>
      <Goals />
    </ProtectedRoute>
  }
/>
<Route
  path="/planner"
  element={
    <ProtectedRoute>
      <Planner />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  )

}

export default AppRoutes