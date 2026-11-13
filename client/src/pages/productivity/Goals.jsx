import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import API from "../../api/axios";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data.goals || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      await API.post("/goals", {
        title,
        target_value: Number(targetValue), // Standardized to match database naming conventions
      });

      setTitle("");
      setTargetValue("");
      fetchGoals();
    } catch (err) {
      console.error(err);
      alert("Failed to create goal");
    }
  };

  const updateProgress = async (goal) => {
    const value = prompt("Enter current progress", goal.current_value || 0);
    if (value === null || value === "") return;

    // Optimistic Update: Instantly change progress locally for slick performance
    setGoals((prevGoals) =>
      prevGoals.map((g) =>
        g.id === goal.id ? { ...g, current_value: Number(value) } : g
      )
    );

    try {
      await API.put(`/goals/${goal.id}`, {
        current_value: Number(value),
      });
    } catch {
      alert("Failed to update goal");
      fetchGoals(); // Rollback on failure
    }
  };

  const deleteGoal = async (id) => {
    const confirmDelete = window.confirm("Delete this goal?");
    if (!confirmDelete) return;

    // Optimistic Update: Instantly filter out item
    setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));

    try {
      await API.delete(`/goals/${id}`);
    } catch {
      alert("Failed to delete goal");
      fetchGoals(); // Rollback on failure
    }
  };

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold">Goals</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Track your long-term learning goals.
      </p>

      {/* CREATE GOAL */}
      <form
        onSubmit={handleCreateGoal}
        className="mt-8 p-6 rounded-2xl bg-white dark:bg-[#1A1D21] space-y-4"
      >
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
        />

        <input
          type="number"
          placeholder="Target value"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          required
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
        />

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[#7AC943] text-black font-semibold hover:scale-105 transition-all"
        >
          Create Goal
        </button>
      </form>

      {/* GOALS GRID */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {goals.map((goal) => {
          // Safeguard to prevent Division by Zero or NaN
          const target = goal.target_value || 1;
          const current = goal.current_value || 0;
          const progress =
Math.min(
  100,
  Math.round(
    (
      (goal.current_value || 0) /
      goal.target_value
    ) * 100
  )
)

          return (
            <div
              key={goal.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#1A1D21] border border-gray-100 dark:border-gray-800 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">🎯 {goal.title}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  Progress
                </p>
                <p className="mt-1 text-lg font-medium">
                  {current} / {target}
                </p>

                {/* Progress Bar Container */}
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 mt-4 overflow-hidden">
                  <div
                    className="bg-[#7AC943] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 font-semibold text-green-500">
                  {progress}%
                </p>
              </div>

              {/* FIXED: Elements now safely enclosed within the layout component wrapper */}
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => updateProgress(goal)}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                >
                  Update Progress
                </button>

                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-[#1A1D21] text-center text-gray-500">
            No goals created yet.
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Goals;