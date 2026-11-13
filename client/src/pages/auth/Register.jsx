import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../../assets/logo/logo.png"
import API from "../../api/axios"

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const res = await API.post(
        "/auth/register",
        formData
      )

      alert(res.data.message)

      setFormData({
        username: "",
        email: "",
        password: "",
      })

    }

    catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration failed"
      )

    }

    finally {

      setLoading(false)

    }

  }

  return (

    <div
      className="
      min-h-screen
      grid
      grid-cols-1
      md:grid-cols-2
      "
    >

      {/* LEFT PANEL */}

      <div
        className="
        hidden
        md:flex

        items-center
        justify-center

        bg-[#0B2A5B]

        px-16

        text-white
        "
      >

        <div className="max-w-xl">

          <div
            className="
            inline-flex
            items-center

            px-4
            py-2

            rounded-full

            bg-white/10

            border
            border-white/10

            mb-8
            "
          >

            <span
              className="
              text-sm
              tracking-[0.25em]
              uppercase
              text-[#7AC943]
              font-semibold
              "
            >
              AI-Powered Student Ecosystem
            </span>

          </div>

          <h1
            className="
            text-6xl
            font-bold
            leading-[1.1]
            tracking-tight
            "
          >

            Begin
            <br />

            Your Success
            <br />

            Journey.

          </h1>

          <p
            className="
            mt-8
            text-xl
            text-gray-300
            leading-relaxed
            "
          >

            Join students who are building
            better study habits, stronger focus,
            and smarter learning workflows.

          </p>

          <div
            className="
            mt-12
            p-6

            rounded-2xl

            bg-white/5

            border
            border-white/10
            "
          >

            <p
              className="
              text-lg
              italic
              text-gray-100
              "
            >

              “Consistency beats intensity
              when repeated every day.”

            </p>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div
        className="
        flex
        items-center
        justify-center

        bg-[#111315]

        px-6
        "
      >

        <div
          className="
          w-full
          max-w-md

          bg-[#1A1D21]

          rounded-3xl

          p-10

          border
          border-gray-800

          shadow-2xl
          "
        >

          {/* HEADER */}

          <div>

            <div
              className="
              flex
              items-center
              gap-4

              mb-8
              "
            >

              <img
                src={logo}
                alt="logo"
                className="
                w-20
                h-20
                object-contain
                "
              />

              <div>

                <h1
                  className="
                  text-4xl
                  font-bold
                  text-white
                  "
                >
                  IntellectUp
                </h1>

                <p
                  className="
                  mt-2
                  text-green-300
                  text-sm
                  tracking-[0.2em]
                  "
                >
                  Focus. Learn. Grow
                </p>

              </div>

            </div>

            <h2
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              Create Account
            </h2>

            <p
              className="
              text-gray-400
              mt-2
              "
            >
              Start your productivity journey.
            </p>

          </div>

          {/* FORM */}

          <form
            className="mt-8"
            onSubmit={handleSubmit}
          >

            <div className="mb-4">

              <label
                className="
                block
                mb-2
                text-sm
                text-gray-300
                "
              >
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="
                w-full
                px-4
                py-3

                rounded-xl

                bg-[#111315]

                border
                border-gray-700

                focus:border-[#7AC943]

                outline-none
                "
              />

            </div>

            <div className="mb-4">

              <label
                className="
                block
                mb-2
                text-sm
                text-gray-300
                "
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="
                w-full
                px-4
                py-3

                rounded-xl

                bg-[#111315]

                border
                border-gray-700

                focus:border-[#7AC943]

                outline-none
                "
              />

            </div>

            <div className="mb-6">

              <label
                className="
                block
                mb-2
                text-sm
                text-gray-300
                "
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="
                w-full
                px-4
                py-3

                rounded-xl

                bg-[#111315]

                border
                border-gray-700

                focus:border-[#7AC943]

                outline-none
                "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full

              py-3

              rounded-xl

              font-semibold

              bg-[#7AC943]

              text-black

              hover:scale-[1.02]

              transition-all
              duration-300
              "
            >

              {
                loading
                  ? "Creating..."
                  : "Create Account"
              }

            </button>

            <p
              className="
              mt-6

              text-center

              text-gray-400
              "
            >

              Already have an account?

              <Link
                to="/"
                className="
                ml-2

                text-[#7AC943]

                hover:underline
                "
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  )

}

export default Register