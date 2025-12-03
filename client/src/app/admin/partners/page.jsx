"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PartnersPage() {
  const [partners, setPartners] = useState([
    {
      id: 1,
      company: "Tech Partners LLC",
      contact: "Alex Johnson",
      email: "alex@techpartners.com",
      category: "Technology",
      website: "techpartners.com",
      status: "Active",
    },
    {
      id: 2,
      company: "Marketing Pro",
      contact: "Lisa Anderson",
      email: "lisa@marketingpro.com",
      category: "Marketing",
      website: "marketingpro.com",
      status: "Active",
    },
    {
      id: 3,
      company: "Design Studio",
      contact: "Tom Martinez",
      email: "tom@designstudio.com",
      category: "Design",
      website: "designstudio.com",
      status: "Active",
    },
    {
      id: 4,
      company: "Cloud Services Inc.",
      contact: "Rachel Green",
      email: "rachel@cloudservices.com",
      category: "Infrastructure",
      website: "cloudservices.com",
      status: "Active",
    },
    {
      id: 5,
      company: "Consulting Group",
      contact: "Mark Thompson",
      email: "mark@consulting.com",
      category: "Consulting",
      website: "consulting.com",
      status: "Inactive",
    },
  ]);

  const deletePartner = (id) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex bg-black min-h-screen">

      {/* SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Partners" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Partners" />

        {/* MAIN CONTENT */}
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Partners</h1>
              <p className="text-gray-400 mt-1">Manage business partners</p>
            </div>

            {/* Add Partner */}
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow">
              + Add Partner
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold">Company</th>
                  <th className="p-4 text-sm font-semibold">Contact Person</th>
                  <th className="p-4 text-sm font-semibold">Category</th>
                  <th className="p-4 text-sm font-semibold">Website</th>
                  <th className="p-4 text-sm font-semibold">Status</th>
                  <th className="p-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {partners.length > 0 ? (
                  partners.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      {/* Company */}
                      <td className="p-4">
                        <div className="font-medium">{p.company}</div>
                        <div className="text-gray-400 text-sm">{p.email}</div>
                      </td>

                      {/* Contact */}
                      <td className="p-4 text-gray-300">{p.contact}</td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                          {p.category}
                        </span>
                      </td>

                      {/* Website */}
                      <td className="p-4 text-blue-300 hover:underline cursor-pointer">
                        {p.website}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {p.status === "Active" ? (
                          <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 flex justify-center gap-5 text-xl">
                        <button className="hover:text-blue-400">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deletePartner(p.id)}
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
                      className="text-center p-5 text-gray-400"
                    >
                      No partners found
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
