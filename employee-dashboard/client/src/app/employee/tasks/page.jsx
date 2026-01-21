// export default function TasksPage() {
//   return <div className="bg-gray-900 p-6 rounded-xl">Tasks View</div>;
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Clock,
  CheckCircle,
  Circle,
  Calendar,
  FolderOpen,
  X,
  Edit2,
  Trash2,
} from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Complete Q4 Report",
      description: "Prepare and submit quarterly performance report",
      priority: "high",
      status: "in-progress",
      dueDate: "2025-12-15",
      projectName: "Financial Analytics Dashboard",
      clientCompany: "TechCorp Solutions Inc.",
      teamMembers: [
        { id: "1", name: "Sarah Johnson", role: "Lead Analyst" },
        { id: "2", name: "Mike Chen", role: "Developer" },
        { id: "3", name: "Emily Davis", role: "Designer" },
      ],
    },
    {
      id: "2",
      title: "Team Meeting Preparation",
      description: "Prepare slides for upcoming team meeting",
      priority: "medium",
      status: "pending",
      dueDate: "2025-12-12",
      projectName: "Marketing Campaign 2025",
      clientCompany: "BrandMax Marketing",
      teamMembers: [
        { id: "4", name: "John Smith", role: "Project Manager" },
        { id: "5", name: "Lisa Wang", role: "Content Writer" },
      ],
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    projectName: "",
    clientCompany: "",
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) return;

    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        ...newTask,
        status: "pending",
        teamMembers: [],
      },
    ]);

    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      projectName: "",
      clientCompany: "",
    });
    setShowAddTask(false);
  };

  const addTeamMember = (taskId) => {
    if (!newTeamMember.name || !newTeamMember.role) return;

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              teamMembers: [
                ...task.teamMembers,
                {
                  id: Date.now().toString(),
                  name: newTeamMember.name,
                  role: newTeamMember.role,
                },
              ],
            }
          : task
      )
    );

    setNewTeamMember({ name: "", role: "" });
  };

  const removeTeamMember = (taskId, memberId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              teamMembers: task.teamMembers.filter(
                (m) => m.id !== memberId
              ),
            }
          : task
      )
    );
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const getStatusIcon = (status) => {
    if (status === "completed")
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status === "in-progress")
      return <Clock className="w-5 h-5 text-blue-400" />;
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <p className="text-gray-400">
            Manage all company tasks and assignments
          </p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {/* Add Task */}
      {showAddTask && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg mb-4">New Task</h3>
          <input
            className="w-full mb-3 p-2 bg-gray-800 rounded"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />
          <textarea
            className="w-full mb-3 p-2 bg-gray-800 rounded"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <input
            type="date"
            className="w-full mb-3 p-2 bg-gray-800 rounded"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Save
          </button>
          <button
            onClick={() => setShowAddTask(false)}
            className="ml-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(task.status)}
                <h3 className="text-lg">{task.title}</h3>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-400 mb-2">{task.description}</p>

            <div className="flex items-center gap-2">
              {task.teamMembers.map((m) => (
                <div
                  key={m.id}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs"
                  title={m.name}
                >
                  {getInitials(m.name)}
                </div>
              ))}
              <button
                onClick={() => setShowTeamModal(task.id)}
                className="text-sm text-gray-400"
              >
                + Add Member
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg">Team Members</h3>
              <button onClick={() => setShowTeamModal(null)}>
                <X />
              </button>
            </div>

            <input
              className="w-full mb-3 p-2 bg-gray-800 rounded"
              placeholder="Name"
              value={newTeamMember.name}
              onChange={(e) =>
                setNewTeamMember({
                  ...newTeamMember,
                  name: e.target.value,
                })
              }
            />
            <input
              className="w-full mb-3 p-2 bg-gray-800 rounded"
              placeholder="Role"
              value={newTeamMember.role}
              onChange={(e) =>
                setNewTeamMember({
                  ...newTeamMember,
                  role: e.target.value,
                })
              }
            />

            <button
              onClick={() => addTeamMember(showTeamModal)}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
