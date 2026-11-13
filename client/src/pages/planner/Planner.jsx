import { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import API from "../../api/axios"

function Planner() {

  const [entries, setEntries] =
    useState([])

  const [formData, setFormData] =
    useState({

      title: "",
      study_date: "",
      start_time: "",
      end_time: "",
      notes: ""

    })

  const fetchEntries = async () => {

    try {

      const res =
        await API.get("/planner")

      setEntries(
        res.data.entries || []
      )

    }

    catch (err) {

      console.error(err)

    }

  }

  useEffect(() => {

    fetchEntries()

  }, [])

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await API.post(
        "/planner",
        formData
      )

      setFormData({

        title: "",
        study_date: "",
        start_time: "",
        end_time: "",
        notes: ""

      })

      fetchEntries()

    }

    catch (err) {

      console.error(err)

      alert(
        "Failed to create planner entry"
      )

    }

  }

  return (

    <AppLayout>

      <h1
        className="
        text-4xl
        font-bold
        "
      >

        Schedule

      </h1>

      <form

        onSubmit={handleSubmit}

        className="
        mt-8
        p-6
        rounded-2xl
        bg-[#1A1D21]
        space-y-4
        "

      >

        <input
          name="title"
          placeholder="Study Session"
          value={formData.title}
          onChange={handleChange}
          required
          className="
          w-full
          p-3
          rounded-xl
          bg-[#111315]
          border
          border-gray-700
          "
        />

        <input
          type="date"
          name="study_date"
          value={formData.study_date}
          onChange={handleChange}
          required
          className="
          w-full
          p-3
          rounded-xl
          bg-[#111315]
          border
          border-gray-700
          "
        />

        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          required
          className="
          w-full
          p-3
          rounded-xl
          bg-[#111315]
          border
          border-gray-700
          "
        />

        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          required
          className="
          w-full
          p-3
          rounded-xl
          bg-[#111315]
          border
          border-gray-700
          "
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="
          w-full
          p-3
          rounded-xl
          bg-[#111315]
          border
          border-gray-700
          "
        />

        <button

          type="submit"

          className="
          px-5
          py-3
          rounded-xl
          bg-[#7AC943]
          text-black
          font-semibold
          "

        >

          Add Session

        </button>

      </form>

      <div
        className="
        mt-8
        grid
        md:grid-cols-2
        gap-6
        "
      >

        {

          entries.map((entry) => (

            <div

              key={entry.id}

              className="
              p-6
              rounded-2xl
              bg-[#1A1D21]
              "

            >

              <h2
                className="
                text-xl
                font-semibold
                "
              >

                {entry.title}

              </h2>

              <p className="mt-3">

                📅 {entry.study_date?.split("T")[0]}

              </p>

              <p>

                ⏰ {entry.start_time}
                -
                {entry.end_time}

              </p>

              <p className="mt-3">

                {entry.notes}

              </p>

            </div>

          ))

        }

      </div>

    </AppLayout>

  )

}

export default Planner