// "use client";

// import { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaBuilding } from "react-icons/fa";

// export default function DepartmentsPage() {
//   const [departments, setDepartments] = useState([]);

//   // Fetch data from backend
//   useEffect(() => {
//     async function fetchDepartments() {
//       try {
//         const res = await fetch("http://localhost:5000/api/departments");
//         const data = await res.json();
//         setDepartments(data);
//       } catch (err) {
//         console.log("Error loading departments:", err);
//       }
//     }
//     fetchDepartments();
//   }, []);

//   return (
//     <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">

//       {/* PAGE HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
//           <p className="text-gray-500 mt-1">
//             Manage company departments and teams
//           </p>
//         </div>

//         <button className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-gray-800">
//           <span className="text-lg font-bold">+</span> Add Department
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden border">
//         <table className="w-full text-left table-auto">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-4 font-semibold text-gray-700">Department ID</th>
//               <th className="p-4 font-semibold text-gray-700">Department Name</th>
//               <th className="p-4 font-semibold text-gray-700">Description</th>
//               <th className="p-4 font-semibold text-gray-700">Status</th>
//               <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {departments.map((dept, index) => (
//               <tr
//                 key={index}
//                 className="border-b hover:bg-gray-50 transition"
//               >
//                 <td className="p-4 flex items-center gap-2 text-gray-700">
//                   <FaBuilding className="text-blue-600" /> {dept.id}
//                 </td>

//                 <td className="p-4 text-gray-700 font-medium">
//                   {dept.name}
//                 </td>

//                 <td className="p-4 text-gray-600">
//                   {dept.description}
//                 </td>

//                 <td className="p-4">
//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                     Active
//                   </span>
//                 </td>

//                 <td className="p-4 flex items-center justify-center gap-6 text-xl">
//                   <button className="text-gray-700 hover:text-blue-600 transition">
//                     <FaEdit />
//                   </button>

//                   <button className="text-gray-700 hover:text-red-600 transition">
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBuilding } from "react-icons/fa";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  // Fetch departments
  async function loadDepartments() {
    try {
      const res = await fetch("http://localhost:5000/api/departments");
      let data = await res.json();

      // ✅ Ensure always array
      if (!Array.isArray(data)) {
        data = [data];
      }

      setDepartments(data);
    } catch (err) {
      console.log("Error loading departments:", err);
      setDepartments([]); // ✅ prevent map crash
    }
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  // Handle Add Department
  async function handleAddDepartment(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) return alert("Failed to add department");

      setShowModal(false);
      setFormData({ name: "", description: "", status: "Active" });

      loadDepartments();
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <div className="flex bg-black min-h-screen">

      <div className="hidden md:flex">
        <Sidebar currentPage="Departments" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar />

        <main className="p-6 sm:p-10 bg-black min-h-screen text-white">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Departments</h1>
              <p className="text-gray-400 mt-1">Manage company departments and teams</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-red-700"
            >
              <span className="text-lg font-bold">+</span> Add Department
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {departments.length > 0 ? (
                  departments.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="p-4 flex items-center gap-2"><FaBuilding /> {dept.id}</td>
                      <td className="p-4">{dept.name}</td>
                      <td className="p-4">{dept.description}</td>
                      <td className="p-4">
                        <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          {dept.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-center gap-5 text-xl">
                        <button className="hover:text-blue-400"><FaEdit /></button>
                        <button className="hover:text-red-500"><FaTrash /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-400">
                      No departments found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-xl w-[400px] shadow-xl">

            <h2 className="text-xl font-bold mb-4">Add Department</h2>

            <form onSubmit={handleAddDepartment} className="space-y-4">

              <div>
                <label className="font-semibold">Department Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="font-semibold">Description</label>
                <textarea
                  className="w-full p-2 border rounded mt-1"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="font-semibold">Status</label>
                <select
                  className="w-full p-2 border rounded mt-1"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
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
