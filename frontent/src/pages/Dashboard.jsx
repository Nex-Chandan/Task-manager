import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchTasks, createTask, updateTask, deleteTask, toggleStatus } from "../api/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks]       = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(true);

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await fetchTasks();
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editTask) {
        const { data } = await updateTask(editTask._id, formData);
        setTasks(tasks.map((t) => (t._id === editTask._id ? data : t)));
        setEditTask(null);
        toast.success("Task updated!");
      } else {
        const { data } = await createTask(formData);
        setTasks([data, ...tasks]);
        toast.success("Task added!");
      }
    } catch {
      toast.error("Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted!");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await toggleStatus(id);
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter + search
  const filteredTasks = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const total     = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending   = tasks.filter((t) => t.status === "pending").length;

  const filters = [
    { key: "all",       label: "All" },
    { key: "pending",   label: "⏳ Pending" },
    { key: "completed", label: "✓ Completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 text-center border border-gray-100">
            <p className="text-3xl font-bold text-indigo-600">{total}</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">Total</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 text-center border border-gray-100">
            <p className="text-3xl font-bold text-amber-500">{pending}</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">Pending</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 text-center border border-gray-100">
            <p className="text-3xl font-bold text-green-500">{completed}</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">Completed</p>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm
          onSubmit={handleSubmit}
          editTask={editTask}
          onCancel={() => setEditTask(null)}
        />

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-indigo-500 transition"
          />
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition ${
                  filter === f.key
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Task count */}
        <p className="text-xs text-gray-400 mb-3">
          Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </p>

        {/* Task List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="text-5xl mb-4">📋</span>
            <p className="text-base font-medium text-gray-500">No tasks found</p>
            <p className="text-sm mt-1">
              {search ? "Try a different search term." : "Add your first task above!"}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;