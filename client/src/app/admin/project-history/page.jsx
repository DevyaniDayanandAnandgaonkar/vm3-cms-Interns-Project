"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaTrash, FaEye, FaFileCsv } from "react-icons/fa";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  try {
    // Use a fixed locale + options to ensure consistent SSR and client rendering
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  } catch (e) {
    // Fallback to manual formatting (DD/MM/YYYY)
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  }
}

// CSV Export util
function exportCSV(data) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map(row =>
      headers.map(fieldName => JSON.stringify(row[fieldName], (_, value) =>
        value === null ? "" : value
      )).join(",")
    ),
  ];
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project_history.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const dummyProjects = [
  {
    id: 1,
    name: "Website Redesign",
    client: "Tech Corp Inc.",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    completedOn: "2024-04-15",
    teamCount: 5,
    status: "Completed",
    budget: 100000,
    totalCost: 90000,
    received: 85000,
    remaining: 5000,
    description: "Full website overhaul with new branding and responsive design.",
  },
  {
    id: 2,
    name: "Brand Identity",
    client: "Creative Agency",
    startDate: "2023-11-10",
    endDate: "2024-01-10",
    completedOn: "2024-01-10",
    teamCount: 3,
    status: "Completed",
    budget: 40000,
    totalCost: 38000,
    received: 38000,
    remaining: 0,
    description: "Logo, branding guidelines, and marketing collateral design.",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    client: "Global Enterprises",
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    completedOn: "2024-03-20",
    teamCount: 4,
    status: "Canceled",
    budget: 60000,
    totalCost: 30000,
    received: 25000,
    remaining: 5000,
    description: "Q1 product marketing campaign across digital channels.",
  },
  {
    id: 4,
    name: "Mobile App Development",
    client: "Digital Solutions Ltd.",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    completedOn: "",
    teamCount: 8,
    status: "In Progress",
    budget: 150000,
    totalCost: 60000,
    received: 45000,
    remaining: 15000,
    description: "Development of cross-platform mobile application.",
  },
  {
    id: 5,
    name: "Cloud Migration",
    client: "Cloud Services Inc.",
    startDate: "2023-10-01",
    endDate: "2024-01-01",
    completedOn: "2024-01-01",
    teamCount: 6,
    status: "Completed",
    budget: 120000,
    totalCost: 115000,
    received: 110000,
    remaining: 5000,
    description: "Migration of on-premise systems to cloud infrastructure.",
  },
];

export default function ProjectHistoryPage() {
  // Use dummy data directly
  const projects = dummyProjects;

  // Filters
  const [filters, setFilters] = useState({
    name: "",
    client: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Modal state
  const [modalProject, setModalProject] = useState(null);

  // Filter projects memoized
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchName = p.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchClient = p.client.toLowerCase().includes(filters.client.toLowerCase());
      const matchStatus = filters.status === "" || p.status === filters.status;
      const matchStartDate =
        filters.startDate === "" || new Date(p.startDate) >= new Date(filters.startDate);
      const matchEndDate =
        filters.endDate === "" || new Date(p.endDate) <= new Date(filters.endDate);
      return matchName && matchClient && matchStatus && matchStartDate && matchEndDate;
    });
  }, [projects, filters]);

  // Pagination slice
  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, page]);

  // Page count
  const pageCount = Math.ceil(filteredProjects.length / pageSize);

  return (
    <div className="flex bg-black min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar currentPage="ProjectHistory" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Project History" />

        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">Project History</h1>
            <p className="text-gray-400">All completed or past projects</p>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-gray-300 font-semibold mb-1">Project Name</label>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="Search project"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-semibold mb-1">Client</label>
              <input
                type="text"
                value={filters.client}
                onChange={(e) => setFilters((f) => ({ ...f, client: e.target.value }))}
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="Search client"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-semibold mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="">All</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-semibold mb-1">Start Date (From)</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-semibold mb-1">End Date (To)</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>

            <button
              onClick={() => setFilters({ name: "", client: "", status: "", startDate: "", endDate: "" })}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow ml-auto"
              title="Clear filters"
            >
              Clear Filters
            </button>
          </div>

          {/* Export CSV */}
          <button
            onClick={() => exportCSV(filteredProjects)}
            className="mb-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
          >
            <FaFileCsv /> Export CSV
          </button>

          {/* Table */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold">Project Name</th>
                  <th className="p-4 text-sm font-semibold">Client</th>
                  <th className="p-4 text-sm font-semibold">Timeline</th>
                  <th className="p-4 text-sm font-semibold">Team</th>
                  <th className="p-4 text-sm font-semibold">Budget</th>
                  <th className="p-4 text-sm font-semibold">Total Cost</th>
                  <th className="p-4 text-sm font-semibold">Received</th>
                  <th className="p-4 text-sm font-semibold">Remaining</th>
                  <th className="p-4 text-sm font-semibold">Completed On</th>
                  <th className="p-4 text-sm font-semibold">Status</th>
                  <th className="p-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProjects.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="p-6 text-center text-gray-400">
                      No projects found
                    </td>
                  </tr>
                ) : (
                  paginatedProjects.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">{p.client}</td>
                      <td className="p-4 text-gray-400">
                        {formatDate(p.startDate)} → {formatDate(p.endDate)}
                      </td>
                      <td className="p-4">👥 {p.teamCount}</td>
                      <td className="p-4">${p.budget.toLocaleString()}</td>
                      <td className="p-4">${p.totalCost.toLocaleString()}</td>
                      <td className="p-4">${p.received.toLocaleString()}</td>
                      <td className="p-4">${p.remaining.toLocaleString()}</td>
                      <td className="p-4">{p.completedOn ? formatDate(p.completedOn) : "-"}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            p.status === "Completed"
                              ? "bg-green-600/20 text-green-400"
                              : p.status === "Canceled"
                              ? "bg-red-600/20 text-red-400"
                              : "bg-blue-600/20 text-blue-400"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
                        <button
                          title="View Details"
                          onClick={() => setModalProject(p)}
                          className="hover:text-blue-400"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => alert("Delete functionality here")}
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

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-6 gap-2 text-white">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
                disabled={page === pageCount}
                className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {/* View Details Modal */}
          {modalProject && (
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
              <div className="bg-gray-900 rounded-xl max-w-lg w-full p-6 text-white shadow-lg relative">
                <button
                  onClick={() => setModalProject(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
                  aria-label="Close modal"
                >
                  &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">{modalProject.name}</h2>

                <p className="mb-2">
                  <strong>Client:</strong> {modalProject.client}
                </p>
                <p className="mb-2">
                  <strong>Timeline:</strong> {formatDate(modalProject.startDate)} →{" "}
                  {formatDate(modalProject.endDate)}
                </p>
                <p className="mb-2">
                  <strong>Team Count:</strong> {modalProject.teamCount}
                </p>
                <p className="mb-2">
                  <strong>Budget:</strong> ${modalProject.budget.toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Total Cost:</strong> ${modalProject.totalCost.toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Received:</strong> ${modalProject.received.toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Remaining:</strong> ${modalProject.remaining.toLocaleString()}
                </p>
                <p className="mb-4">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      modalProject.status === "Completed"
                        ? "bg-green-600/20 text-green-400"
                        : modalProject.status === "Canceled"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-blue-600/20 text-blue-400"
                    }`}
                  >
                    {modalProject.status}
                  </span>
                </p>

                <p>
                  <strong>Description:</strong> <br />
                  {modalProject.description}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
