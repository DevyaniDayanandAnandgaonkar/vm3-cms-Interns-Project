"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function RolesPage() {
  const [roles, setRoles] = useState([
    {
      name: "Administrator",
      description: "Full system access and control",
      users: 3,
      permissions: ["Create", "Read", "Update", "Delete"],
      status: "Active",
    },
    {
      name: "Manager",
      description: "Manage departments and employees",
      users: 12,
      permissions: ["Create", "Read", "Update"],
      status: "Active",
    },
    {
      name: "Team Lead",
      description: "Lead project teams and track progress",
      users: 15,
      permissions: ["Create", "Read", "Update"],
      status: "Active",
    },
    {
      name: "Employee",
      description: "Standard employee access",
      users: 98,
      permissions: ["Read"],
      status: "Active",
    },
    {
      name: "Contractor",
      description: "Limited access for contractors",
      users: 22,
      permissions: ["Read"],
      status: "Active",
    },
  ]);

  return (
    <div className="flex bg-black min-h-screen">

      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Roles" />
      </div>

      {/* Main */}
      <div className="flex-1 ml-0 md:ml-64 bg-gray-900 text-white">
        <Topbar title="Roles & Permissions" />

        <main className="p-6">

          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Roles & Permissions
              </h1>
              <p className="text-gray-400">
                Manage user roles and their access permissions
              </p>
            </div>

            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              + Add Role
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-gray-800 rounded-xl shadow border border-gray-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-700 border-b border-gray-600">
                <tr>
                  <th className="p-4 text-gray-200">Role Name</th>
                  <th className="p-4 text-gray-200">Description</th>
                  <th className="p-4 text-gray-200">Users</th>
                  <th className="p-4 text-gray-200">Permissions</th>
                  <th className="p-4 text-gray-200">Status</th>
                  <th className="p-4 text-center text-gray-200">Actions</th>
                </tr>
              </thead>

              <tbody>
                {roles.map((role, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    {/* Role Name */}
                    <td className="p-4 font-medium text-white">
                      {role.name}
                    </td>

                    {/* Description */}
                    <td className="p-4 text-gray-300">{role.description}</td>

                    {/* Users */}
                    <td className="p-4">
                      <span className="bg-gray-900 text-gray-200 px-3 py-1 rounded-full text-sm border border-gray-600">
                        {role.users} users
                      </span>
                    </td>

                    {/* Permissions */}
                    <td className="p-4 flex flex-wrap gap-2">
                      {role.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-900 px-3 py-1 text-sm rounded-full text-gray-200 border border-gray-600"
                        >
                          ✓ {perm}
                        </span>
                      ))}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-700 text-white rounded-full text-sm">
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 flex gap-6 justify-center text-xl">
                      <button className="text-gray-300 hover:text-blue-400">
                        <FaEdit />
                      </button>
                      <button className="text-gray-300 hover:text-red-500">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}


// Black background
// ✔ Gray-900 page container
// ✔ Gray-800 table
// ✔ Gray-700 table head
// ✔ Red buttons
// ✔ White text
// ✔ Hover colors same as departments page