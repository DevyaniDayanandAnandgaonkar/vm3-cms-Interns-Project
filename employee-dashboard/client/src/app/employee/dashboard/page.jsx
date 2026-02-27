"use client";

import {
  CheckSquare,
  ListTodo,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function formatDateDDMMYYYY(dateStr) {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/employee-dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setDashboardData(data.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      label: "Active Tasks",
      value: dashboardData?.activeTasks || 0,
      icon: CheckSquare,
      textColor: "text-indigo-400",
      change: "+2 from last week",
    },
    {
      label: "Pending To-Dos",
      value: dashboardData?.pendingTodos || 0,
      icon: ListTodo,
      textColor: "text-purple-400",
      change: "4 completed today",
    },
    {
      label: "Leave Balance",
      value: `${dashboardData?.leaveBalance || 0} Days`,
      icon: Calendar,
      textColor: "text-pink-400",
      change: "Vacation available",
    },
    {
      label: "Performance",
      value: `${dashboardData?.performance || 0}%`,
      icon: TrendingUp,
      textColor: "text-blue-400",
      change: "+5% this month",
    },
  ];

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-medium";
    if (status === "completed")
      return <span className={`${base} bg-green-900 text-green-300`}>Completed</span>;
    if (status === "inprogress")
      return <span className={`${base} bg-blue-900 text-blue-300`}>In Progress</span>;
    if (status === "pending")
      return <span className={`${base} bg-yellow-900 text-yellow-300`}>Pending</span>;
    if (status === "approved")
      return <span className={`${base} bg-green-900 text-green-300`}>Approved</span>;
    return <span className={`${base} bg-gray-800 text-gray-300`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const base = "px-2 py-1 rounded text-xs";
    if (priority === "High")
      return <span className={`${base} bg-red-900 text-red-300`}>High</span>;
    if (priority === "Medium")
      return <span className={`${base} bg-yellow-900 text-yellow-300`}>Medium</span>;
    return <span className={`${base} bg-green-900 text-green-300`}>Low</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Welcome back, {dashboardData?.name || "Employee"}
        </h1>
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

      {/* Recent + Upcoming Grid */}
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
            {dashboardData?.recentTasks?.map((task, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3>{task.title}</h3>
                  {getPriorityBadge(task.priority)}
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDateDDMMYYYY(task.due_date)}
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
            {dashboardData?.upcomingLeaves?.map((leave, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between">
                  <h3>{leave.leave_type}</h3>
                  {getStatusBadge(leave.status)}
                </div>
                <p className="text-sm text-gray-400">
                  {formatDateDDMMYYYY(leave.start_date)} -{" "}
                  {formatDateDDMMYYYY(leave.end_date)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
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