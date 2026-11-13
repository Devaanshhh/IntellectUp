import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import API from "../../api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks || []); // Fallback to empty array if data is undefined
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleStatus = async (task) => {
    const nextStatus = task.status === "Completed" ? "Pending" : "Completed";
    
    // Optimistic UI Update: change state immediately so the user doesn't see a delay
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === task.id ? { ...t, status: nextStatus } : t)
    );

    try {
      await API.put(`/tasks/${task.id}/status`, { status: nextStatus });
    } catch {
      alert("Failed to update task");
      fetchTasks(); // Rollback to actual server state if API fails
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    // Optimistic UI Update: remove task from UI immediately
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));

    try {
      await API.delete(`/tasks/${id}`);
    } catch {
      alert("Delete failed");
      fetchTasks(); // Rollback if server fails
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
      });

      // Reset Form fields
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold">Study Planner</h1>
      <p className="mt-2 text-gray-500">
        Manage your deadlines and priorities.
      </p>

      {/* CREATE TASK FORM */}
      <form
        onSubmit={handleCreateTask}
        className="mt-8 p-6 rounded-2xl bg-white dark:bg-[#1A1D21] space-y-4 border border-gray-100 dark:border-gray-800"
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[#7AC943] text-black font-semibold hover:scale-105 transition-all"
        >
          Add Task
        </button>
      </form>

      {/* TASK LIST CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#1A1D21] flex flex-col justify-between text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800"
          >
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
            </div>

            <div className="mt-4">
              {/* FIXED: Replaced standard span/p structure with unified layout classes */}
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <span>Priority: {task.priority}</span>
                <span>
                  📅 Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No deadline"}
                </span>
              </div>

              {/* Status Button */}
              <button
                onClick={() => toggleStatus(task)}
                className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  task.status === "Completed"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {task.status === "Completed" ? "Completed ✓" : "Mark Complete"}
              </button>

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="mt-2 w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

export default Tasks;