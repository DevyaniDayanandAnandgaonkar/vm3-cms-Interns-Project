"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      client: "Tech Corp Inc.",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      teamCount: 5,
      progress: 75,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "Digital Solutions Ltd.",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      teamCount: 8,
      progress: 45,
      status: "In Progress",
    },
    {
      id: 3,
      name: "Brand Identity",
      client: "Creative Agency",
      startDate: "2023-11-10",
      endDate: "2024-01-10",
      teamCount: 3,
      progress: 100,
      status: "Completed",
    },
  ]);

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex bg-black min-h-screen">

      {/* SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Projects" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Projects" />

        {/* MAIN CONTENT */}
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-gray-400 mt-1">
                Manage all company projects
              </p>
            </div>

            {/* RED BUTTON (same style as Employees page) */}
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow">
              + Add Project
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold">Project Name</th>
                  <th className="p-4 text-sm font-semibold">Client</th>
                  <th className="p-4 text-sm font-semibold">Timeline</th>
                  <th className="p-4 text-sm font-semibold">Team</th>
                  <th className="p-4 text-sm font-semibold">Progress</th>
                  <th className="p-4 text-sm font-semibold">Status</th>
                  <th className="p-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      {/* Project Name */}
                      <td className="p-4 font-medium text-white">
                        {project.name}
                      </td>

                      {/* Client */}
                      <td className="p-4 text-gray-300">
                        {project.client}
                      </td>

                      {/* Timeline */}
                      <td className="p-4 text-gray-400">
                        {project.startDate} → {project.endDate}
                      </td>

                      {/* Team */}
                      <td className="p-4 text-gray-300">
                        👥 {project.teamCount} members
                      </td>

                      {/* Progress */}
                      <td className="p-4 w-48">
                        <div className="w-full bg-gray-600 h-2 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              project.progress === 100
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-300">
                          {project.progress}%
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            project.status === "Completed"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-blue-600/20 text-blue-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 flex justify-center gap-5 text-xl">
                        <button className="hover:text-blue-400">
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => deleteProject(project.id)}
                          className="hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-5 text-gray-400"
                    >
                      No projects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
