"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEmployees, deleteEmployee } from "@/redux/features/employeeSlice";

import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function EmployeesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 🔥 FIX: Safe selector fallback
  const employees = useAppSelector((state) => state.employees?.employees || []);
  const isAuthenticated = useAppSelector(
    (state) => state.auth?.isAuthenticated
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    dispatch(fetchEmployees());
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-black min-h-screen">

      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Employees" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Employees" />

        {/* MAIN */}
        <main className="p-6 sm:p-10 bg-black min-h-screen text-white">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Employees</h1>
              <p className="text-gray-400 mt-1">
                Manage employees in your organization
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              class="bg-[#fec63f] text-black px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-[#d6a021]"

            >
              <span className="text-lg font-bold">+</span> Add Employee
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Position</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      {/* Name */}
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                          {emp.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        {emp.name}
                      </td>

                      {/* Contact */}
                      <td className="p-4">
                        <div>{emp.email}</div>
                        <div className="text-gray-400 text-sm">{emp.phone}</div>
                      </td>

                      {/* Department */}
                      <td className="p-4">{emp.department}</td>

                      {/* Position */}
                      <td className="p-4">{emp.position}</td>

                      {/* Status */}
                      <td className="p-4">
                        <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 flex justify-center gap-5 text-xl">
                        <button className="hover:text-blue-400">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => dispatch(deleteEmployee(emp.id))}
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
                      colSpan="6"
                      className="text-center p-4 text-gray-400"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-xl w-[400px] shadow-xl">

            <h2 className="text-xl font-bold mb-4">Add Employee</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Dummy: Employee Added");
                setShowModal(false);
              }}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-semibold">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="font-semibold">Department</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>

              {/* Position */}
              <div>
                <label className="font-semibold">Position</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Add
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
