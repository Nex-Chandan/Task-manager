const TaskCard = ({ task, onDelete, onToggle, onEdit }) => {
  const isCompleted = task.status === "completed";

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });

  return (
    <div className={`bg-white rounded-2xl shadow-sm border-l-4 mb-3 p-5 hover:shadow-md transition-shadow ${isCompleted ? "border-green-400" : "border-amber-400"}`}>

      {/* Top row */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(task._id)}
            className="w-4 h-4 mt-1 accent-indigo-600 cursor-pointer flex-shrink-0"
          />
          <div>
            <h3 className={`text-sm font-semibold ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${isCompleted ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
          {isCompleted ? "✓ Completed" : "⏳ Pending"}
        </span>
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">📅 {formatDate(task.createdAt)}</span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;