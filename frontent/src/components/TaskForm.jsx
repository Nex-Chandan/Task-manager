import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editTask, onCancel }) => {
  const [title, setTitle]      = useState("");
  const [description, setDesc] = useState("");
  const [error, setError]      = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDesc(editTask.description || "");
    } else {
      setTitle("");
      setDesc("");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    setError("");
    onSubmit({ title: title.trim(), description: description.trim() });
    if (!editTask) {
      setTitle("");
      setDesc("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">
        {editTask ? "✏️ Edit Task" : "➕ Add New Task"}
      </h3>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white transition mb-3"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white transition mb-4 resize-y"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            {editTask ? "Update Task" : "Add Task"}
          </button>
          {editTask && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;