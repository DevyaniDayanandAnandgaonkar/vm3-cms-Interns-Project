"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeTasks, updateTaskProgress } from "@/redux/features/taskSlice";
import {
  Clock,
  CheckCircle,
  Circle,
} from "lucide-react";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.employeeTasks);

  useEffect(() => {
    dispatch(fetchEmployeeTasks());
  }, [dispatch]);

  const handleProgressChange = async (taskId, progress) => {
    await dispatch(updateTaskProgress({ taskId, progress: parseInt(progress) }));
    dispatch(fetchEmployeeTasks());
  };

  const getStatusIcon = (status) => {
    if (status === "completed")
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status === "inprogress")
      return <Clock className="w-5 h-5 text-blue-400" />;
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "Low":
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">My Tasks</h1>
        <p className="text-gray-400">
          View and track your assigned tasks
        </p>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-center text-gray-400 py-10">Loading tasks...</div>
      )}

      {error && (
        <div className="text-center text-red-400 py-10">Error: {error}</div>
      )}

      {/* No Tasks */}
      {!loading && !error && tasks.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No tasks assigned to you yet.
        </div>
      )}

      {/* Task Cards */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.task_id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(task.status)}
                <div>
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-400 text-sm mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}
                >
                  {task.priority}
                </span>
                <span className="text-sm text-gray-400">
                  Due: {formatDate(task.due_date)}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-medium">{task.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${task.progress || 0}%` }}
                ></div>
              </div>

              {/* Progress Slider */}
              {task.status !== "completed" && (
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    defaultValue={task.progress || 0}
                    onMouseUp={(e) => handleProgressChange(task.task_id, e.target.value)}
                    onTouchEnd={(e) => handleProgressChange(task.task_id, e.target.value)}
                    className="flex-1 accent-red-500"
                  />
                  <span className="text-xs text-gray-500 w-16 text-right">
                    Update %
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
