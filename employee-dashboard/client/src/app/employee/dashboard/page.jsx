// export default function DashboardPage() {
//   return <h1 className="text-xl">Employee Dashboard</h1>;
// }
"use client";

import {
  CheckSquare,
  ListTodo,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    {
      label: "Active Tasks",
      value: "8",
      icon: CheckSquare,
      textColor: "text-indigo-400",
      change: "+2 from last week",
    },
    {
      label: "Pending To-Dos",
      value: "12",
      icon: ListTodo,
      textColor: "text-purple-400",
      change: "4 completed today",
    },
    {
      label: "Leave Balance",
      value: "15 Days",
      icon: Calendar,
      textColor: "text-pink-400",
      change: "Vacation available",
    },
    {
      label: "Performance",
      value: "94%",
      icon: TrendingUp,
      textColor: "text-blue-400",
      change: "+5% this month",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Complete Q4 Report",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-12-15",
    },
    {
      id: 2,
      title: "Team Meeting Preparation",
      status: "pending",
      priority: "medium",
      dueDate: "2025-12-12",
    },
    {
      id: 3,
      title: "Code Review",
      status: "completed",
      priority: "medium",
      dueDate: "2025-12-10",
    },
  ];

  const upcomingLeaves = [
    {
      id: 1,
      type: "Vacation Leave",
      dates: "Dec 20 - Dec 27",
      status: "approved",
    },
    {
      id: 2,
      type: "Sick Leave",
      dates: "Dec 12",
      status: "pending",
    },
  ];

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-medium";
    if (status === "completed")
      return <span className={`${base} bg-green-900 text-green-300`}>Completed</span>;
    if (status === "in-progress")
      return <span className={`${base} bg-blue-900 text-blue-300`}>In Progress</span>;
    if (status === "pending")
      return <span className={`${base} bg-yellow-900 text-yellow-300`}>Pending</span>;
    if (status === "approved")
      return <span className={`${base} bg-green-900 text-green-300`}>Approved</span>;
    return <span className={`${base} bg-gray-800 text-gray-300`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const base = "px-2 py-1 rounded text-xs";
    if (priority === "high")
      return <span className={`${base} bg-red-900 text-red-300`}>High</span>;
    if (priority === "medium")
      return <span className={`${base} bg-yellow-900 text-yellow-300`}>Medium</span>;
    return <span className={`${base} bg-green-900 text-green-300`}>Low</span>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Welcome back, John</h1>
        <p className="text-gray-400">
          Here’s what’s happening with your work today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <Icon className={`w-6 h-6 ${stat.textColor} mb-4`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-2">
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">Recent Tasks</h2>
            <button
              onClick={() => router.push("/employee/tasks")}
              className="text-red-400 text-sm"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3>{task.title}</h3>
                  {getPriorityBadge(task.priority)}
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  {getStatusBadge(task.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Leaves */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">Upcoming Leaves</h2>
            <button
              onClick={() => router.push("/employee/leaves")}
              className="text-red-400 text-sm"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {upcomingLeaves.map((leave) => (
              <div key={leave.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between">
                  <h3>{leave.type}</h3>
                  {getStatusBadge(leave.status)}
                </div>
                <p className="text-sm text-gray-400">
                  {leave.dates}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push("/employee/tasks")}
            className="flex flex-col items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            <span>Add Task</span>
          </button>

          <button
            onClick={() => router.push("/employee/todos")}
            className="flex flex-col items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <ListTodo className="w-6 h-6 text-purple-400" />
            <span>Add To-Do</span> 
          </button>

          <button
            onClick={() => router.push("/employee/leaves")}
            className="flex flex-col items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <Calendar className="w-6 h-6 text-pink-400" />
            <span>Request Leave</span>
          </button>

          <button
            onClick={() => router.push("/employee/tasks")}
            className="flex flex-col items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}