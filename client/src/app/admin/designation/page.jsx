"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// Dummy designation data including total employees
const dummyDesignations = [
  { id: 1, title: "Software Engineer", department: "Development", totalEmployees: 12 },
  { id: 2, title: "Product Manager", department: "Product", totalEmployees: 4 },
  { id: 3, title: "UX Designer", department: "Design", totalEmployees: 5 },
  { id: 4, title: "QA Analyst", department: "Quality Assurance", totalEmployees: 6 },
  { id: 5, title: "HR Specialist", department: "Human Resources", totalEmployees: 3 },
];

export default function DesignationPage() {
  const [designations, setDesignations] = useState(dummyDesignations);

  // Dummy delete function
  const deleteDesignation = (id) => {
    if (confirm("Are you sure you want to delete this designation?")) {
      setDesignations((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Designation" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        {/* Topbar */}
        <Topbar title="Designation" />

        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Designations</h1>
              <p className="text-gray-400">Manage company designations</p>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
              onClick={() => alert("Add designation form/modal")}
            >
              <FaPlus /> Add Designation
            </button>
          </div>

          {/* Table */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold">Title</th>
                  <th className="p-4 text-sm font-semibold">Department</th>
                  <th className="p-4 text-sm font-semibold">Total Employees</th>
                  <th className="p-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {designations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-400">
                      No designations found
                    </td>
                  </tr>
                ) : (
                  designations.map((d) => (
                    <tr
                      key={d.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="p-4 font-medium">{d.title}</td>
                      <td className="p-4">{d.department}</td>
                      <td className="p-4">{Number(d.totalEmployees) || 0}</td>
                      <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
                        <button
                          title="Edit designation"
                          onClick={() => alert(`Edit designation ${d.title}`)}
                          className="hover:text-blue-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          title="Delete designation"
                          onClick={() => deleteDesignation(d.id)}
                          className="hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
