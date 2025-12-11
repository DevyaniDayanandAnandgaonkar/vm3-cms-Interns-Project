// // // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { fetchDesignations, createDesignation, removeDesignation } from "@/redux/features/designationSlice";
// // // // // import { Sidebar } from "@/components/dashboard/Sidebar";
// // // // // import Topbar from "@/components/dashboard/Topbar";
// // // // // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// // // // // export default function DesignationPage() {
// // // // //   const dispatch = useDispatch();
// // // // //   const { data: designations = [], loading, error } = useSelector((state) => state.designation);

// // // // //   const [showForm, setShowForm] = useState(false);
// // // // //   const [title, setTitle] = useState("");
// // // // //   const [departmentId, setDepartmentId] = useState("");
// // // // //   const [departmentName, setDepartmentName] = useState(""); // for UI display

// // // // //   useEffect(() => {
// // // // //     dispatch(fetchDesignations());
// // // // //   }, [dispatch]);

// // // // //   const handleAdd = async () => {
// // // // //     if (!title.trim() || !departmentId) {
// // // // //       alert("Please fill title and department");
// // // // //       return;
// // // // //     }

// // // // //     await dispatch(createDesignation({ designation_name: title, department_id: departmentId, department_name: departmentName }));
// // // // //     setShowForm(false);
// // // // //     setTitle("");
// // // // //     setDepartmentId("");
// // // // //     setDepartmentName("");
// // // // //   };

// // // // //   const handleDelete = (id) => {
// // // // //     if (confirm("Are you sure you want to delete this designation?")) {
// // // // //       dispatch(removeDesignation(id));
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex bg-black min-h-screen">
// // // // //       <div className="hidden md:flex">
// // // // //         <Sidebar currentPage="Designation" />
// // // // //       </div>

// // // // //       <div className="flex-1 ml-0 md:ml-64">
// // // // //         <Topbar title="Designation" />

// // // // //         <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
// // // // //           <div className="mb-8 flex justify-between items-center">
// // // // //             <div>
// // // // //               <h1 className="text-3xl font-bold mb-1">Designations</h1>
// // // // //               <p className="text-gray-400">Manage company designations</p>
// // // // //             </div>
// // // // //             <button
// // // // //               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
// // // // //               onClick={() => setShowForm(true)}
// // // // //             >
// // // // //               <FaPlus /> Add Designation
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Modal */}
// // // // //           {showForm && (
// // // // //             <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
// // // // //               <div className="bg-gray-800 p-6 rounded-xl w-96">
// // // // //                 <h2 className="text-xl font-bold mb-4">Add Designation</h2>

// // // // //                 <input
// // // // //                   className="w-full p-2 mb-3 bg-gray-700 rounded"
// // // // //                   placeholder="Designation Title"
// // // // //                   value={title}
// // // // //                   onChange={(e) => setTitle(e.target.value)}
// // // // //                 />

// // // // //                 <input
// // // // //                   className="w-full p-2 mb-4 bg-gray-700 rounded"
// // // // //                   placeholder="Department Name"
// // // // //                   value={departmentName}
// // // // //                   onChange={(e) => { setDepartmentName(e.target.value); setDepartmentId(e.target.value); }} 
// // // // //                   // for demo: using name as ID, in real app use dropdown with proper IDs
// // // // //                 />

// // // // //                 <div className="flex justify-end gap-3">
// // // // //                   <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
// // // // //                   <button onClick={handleAdd} className="px-4 py-2 bg-red-600 rounded">Save</button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Table */}
// // // // //           <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
// // // // //             <table className="w-full text-left">
// // // // //               <thead className="bg-gray-700">
// // // // //                 <tr>
// // // // //                   <th className="p-4 text-sm font-semibold">Title</th>
// // // // //                   <th className="p-4 text-sm font-semibold">Department</th>
// // // // //                   <th className="p-4 text-sm font-semibold">Total Employees</th>
// // // // //                   <th className="p-4 text-center text-sm font-semibold">Actions</th>
// // // // //                 </tr>
// // // // //               </thead>

// // // // //               <tbody>
// // // // //                 {loading ? (
// // // // //                   <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr>
// // // // //                 ) : designations.length === 0 ? (
// // // // //                   <tr><td colSpan="4" className="p-6 text-center text-gray-400">No designations found</td></tr>
// // // // //                 ) : (
// // // // //                   designations.map((d) => (
// // // // //                     <tr key={d.id} className="border-b border-gray-700 hover:bg-gray-700/50">
// // // // //                       <td className="p-4 font-medium">{d.title}</td>
// // // // //                       <td className="p-4">{d.department}</td>
// // // // //                       <td className="p-4">{d.totalEmployees}</td>
// // // // //                       <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
// // // // //                         <button title="Edit" onClick={() => alert("Edit not implemented")} className="hover:text-blue-400">
// // // // //                           <FaEdit />
// // // // //                         </button>
// // // // //                         <button title="Delete" onClick={() => handleDelete(d.id)} className="hover:text-red-500">
// // // // //                           <FaTrash />
// // // // //                         </button>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))
// // // // //                 )}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>

// // // // //           {error && <p className="text-red-500 mt-3">{error}</p>}
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { fetchDesignations, createDesignation, removeDesignation } from "@/redux/features/designationSlice";
// // // // import { Sidebar } from "@/components/dashboard/Sidebar";
// // // // import Topbar from "@/components/dashboard/Topbar";
// // // // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// // // // import axios from "axios";

// // // // export default function DesignationPage() {
// // // //   const dispatch = useDispatch();
// // // //   const { data: designations = [], loading, error } = useSelector((state) => state.designation);

// // // //   const [showForm, setShowForm] = useState(false);
// // // //   const [title, setTitle] = useState("");
// // // //   const [departmentId, setDepartmentId] = useState("");
// // // //   const [departments, setDepartments] = useState([]);

// // // //   // fetch designations
// // // //   useEffect(() => {
// // // //     dispatch(fetchDesignations());
// // // //   }, [dispatch]);

// // // //   // fetch departments for dropdown
// // // //   useEffect(() => {
// // // //     const fetchDepartments = async () => {
// // // //       try {
// // // //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/departments`);
// // // //         setDepartments(res.data);
// // // //       } catch (err) {
// // // //         console.error("Error fetching departments:", err);
// // // //       }
// // // //     };
// // // //     fetchDepartments();
// // // //   }, []);

// // // //   const handleAdd = async () => {
// // // //     if (!title.trim() || !departmentId) {
// // // //       alert("Please fill title and select department");
// // // //       return;
// // // //     }

// // // //     const selectedDepartment = departments.find(d => d.department_id === parseInt(departmentId));

// // // //     await dispatch(createDesignation({
// // // //       designation_name: title,
// // // //       department_id: parseInt(departmentId),
// // // //       department_name: selectedDepartment?.department_name || ""
// // // //     }));

// // // //     setShowForm(false);
// // // //     setTitle("");
// // // //     setDepartmentId("");
// // // //   };

// // // //   const handleDelete = (id) => {
// // // //     if (confirm("Are you sure you want to delete this designation?")) {
// // // //       dispatch(removeDesignation(id));
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex bg-black min-h-screen">
// // // //       <div className="hidden md:flex">
// // // //         <Sidebar currentPage="Designation" />
// // // //       </div>

// // // //       <div className="flex-1 ml-0 md:ml-64">
// // // //         <Topbar title="Designation" />

// // // //         <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
// // // //           <div className="mb-8 flex justify-between items-center">
// // // //             <div>
// // // //               <h1 className="text-3xl font-bold mb-1">Designations</h1>
// // // //               <p className="text-gray-400">Manage company designations</p>
// // // //             </div>
// // // //             <button
// // // //               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
// // // //               onClick={() => setShowForm(true)}
// // // //             >
// // // //               <FaPlus /> Add Designation
// // // //             </button>
// // // //           </div>

// // // //           {/* Modal */}
// // // //           {showForm && (
// // // //             <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
// // // //               <div className="bg-gray-800 p-6 rounded-xl w-96">
// // // //                 <h2 className="text-xl font-bold mb-4">Add Designation</h2>

// // // //                 <input
// // // //                   className="w-full p-2 mb-3 bg-gray-700 rounded"
// // // //                   placeholder="Designation Title"
// // // //                   value={title}
// // // //                   onChange={(e) => setTitle(e.target.value)}
// // // //                 />

// // // //                 <select
// // // //                   className="w-full p-2 mb-4 bg-gray-700 rounded"
// // // //                   value={departmentId}
// // // //                   onChange={(e) => setDepartmentId(e.target.value)}
// // // //                 >
// // // //                   <option value="">Select Department</option>
// // // //                   {departments.map((d) => (
// // // //                     <option key={d.department_id} value={d.department_id}>
// // // //                       {d.department_name}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>

// // // //                 <div className="flex justify-end gap-3">
// // // //                   <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
// // // //                   <button onClick={handleAdd} className="px-4 py-2 bg-red-600 rounded">Save</button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* Table */}
// // // //           <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
// // // //             <table className="w-full text-left">
// // // //               <thead className="bg-gray-700">
// // // //                 <tr>
// // // //                   <th className="p-4 text-sm font-semibold">Title</th>
// // // //                   <th className="p-4 text-sm font-semibold">Department</th>
// // // //                   <th className="p-4 text-sm font-semibold">Total Employees</th>
// // // //                   <th className="p-4 text-center text-sm font-semibold">Actions</th>
// // // //                 </tr>
// // // //               </thead>

// // // //               <tbody>
// // // //                 {loading ? (
// // // //                   <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr>
// // // //                 ) : designations.length === 0 ? (
// // // //                   <tr><td colSpan="4" className="p-6 text-center text-gray-400">No designations found</td></tr>
// // // //                 ) : (
// // // //                   designations.map((d) => (
// // // //                     <tr key={d.id} className="border-b border-gray-700 hover:bg-gray-700/50">
// // // //                       <td className="p-4 font-medium">{d.title}</td>
// // // //                       <td className="p-4">{d.department}</td>
// // // //                       <td className="p-4">{d.totalEmployees}</td>
// // // //                       <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
// // // //                         <button title="Edit" onClick={() => alert("Edit not implemented")} className="hover:text-blue-400">
// // // //                           <FaEdit />
// // // //                         </button>
// // // //                         <button title="Delete" onClick={() => handleDelete(d.id)} className="hover:text-red-500">
// // // //                           <FaTrash />
// // // //                         </button>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>

// // // //           {error && <p className="text-red-500 mt-3">{error}</p>}
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { fetchDesignations, createDesignation, removeDesignation } from "@/redux/features/designationSlice";
// // // // import { Sidebar } from "@/components/dashboard/Sidebar";
// // // // import Topbar from "@/components/dashboard/Topbar";
// // // // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// // // // import axios from "axios";

// // // // export default function DesignationPage() {
// // // //   const dispatch = useDispatch();
// // // //   const { data: designations = [], loading, error } = useSelector((state) => state.designation);

// // // //   const [showForm, setShowForm] = useState(false);
// // // //   const [title, setTitle] = useState("");
// // // //   const [departmentId, setDepartmentId] = useState("");
// // // //   const [departments, setDepartments] = useState([]);

// // // //   // Fetch designations
// // // //   useEffect(() => {
// // // //     dispatch(fetchDesignations());
// // // //   }, [dispatch]);

// // // //   // Fetch departments from backend
// // // //   useEffect(() => {
// // // //     const fetchDepartments = async () => {
// // // //       try {
// // // //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/departments`);
// // // //         setDepartments(res.data);
// // // //       } catch (err) {
// // // //         console.error("Error fetching departments:", err);
// // // //       }
// // // //     };
// // // //     fetchDepartments();
// // // //   }, []);

// // // //   const handleAdd = async () => {
// // // //     if (!title.trim() || !departmentId) {
// // // //       alert("Please fill title and select department");
// // // //       return;
// // // //     }

// // // //     const selectedDepartment = departments.find(d => d.department_id === parseInt(departmentId));

// // // //     await dispatch(createDesignation({
// // // //       designation_name: title,
// // // //       department_id: parseInt(departmentId),
// // // //       department_name: selectedDepartment?.department_name || ""
// // // //     }));

// // // //     setShowForm(false);
// // // //     setTitle("");
// // // //     setDepartmentId("");
// // // //   };

// // // //   const handleDelete = (id) => {
// // // //     if (confirm("Are you sure you want to delete this designation?")) {
// // // //       dispatch(removeDesignation(id));
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex bg-black min-h-screen">
// // // //       <div className="hidden md:flex">
// // // //         <Sidebar currentPage="Designation" />
// // // //       </div>

// // // //       <div className="flex-1 ml-0 md:ml-64">
// // // //         <Topbar title="Designation" />

// // // //         <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
// // // //           <div className="mb-8 flex justify-between items-center">
// // // //             <div>
// // // //               <h1 className="text-3xl font-bold mb-1">Designations</h1>
// // // //               <p className="text-gray-400">Manage company designations</p>
// // // //             </div>
// // // //             <button
// // // //               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
// // // //               onClick={() => setShowForm(true)}
// // // //             >
// // // //               <FaPlus /> Add Designation
// // // //             </button>
// // // //           </div>

// // // //           {/* Modal */}
// // // //           {showForm && (
// // // //             <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
// // // //               <div className="bg-gray-800 p-6 rounded-xl w-96">
// // // //                 <h2 className="text-xl font-bold mb-4">Add Designation</h2>

// // // //                 <input
// // // //                   className="w-full p-2 mb-3 bg-gray-700 rounded"
// // // //                   placeholder="Designation Title"
// // // //                   value={title}
// // // //                   onChange={(e) => setTitle(e.target.value)}
// // // //                 />

// // // //                 <select
// // // //                   className="w-full p-2 mb-4 bg-gray-700 rounded"
// // // //                   value={departmentId}
// // // //                   onChange={(e) => setDepartmentId(e.target.value)}
// // // //                 >
// // // //                   <option value="">Select Department</option>
// // // //                   {departments.map((d) => (
// // // //                     <option key={d.department_id} value={d.department_id}>
// // // //                       {d.department_name}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>

// // // //                 <div className="flex justify-end gap-3">
// // // //                   <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
// // // //                   <button onClick={handleAdd} className="px-4 py-2 bg-red-600 rounded">Save</button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* Table */}
// // // //           <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
// // // //             <table className="w-full text-left">
// // // //               <thead className="bg-gray-700">
// // // //                 <tr>
// // // //                   <th className="p-4 text-sm font-semibold">Title</th>
// // // //                   <th className="p-4 text-sm font-semibold">Department</th>
// // // //                   <th className="p-4 text-sm font-semibold">Total Employees</th>
// // // //                   <th className="p-4 text-center text-sm font-semibold">Actions</th>
// // // //                 </tr>
// // // //               </thead>

// // // //               <tbody>
// // // //                 {loading ? (
// // // //                   <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr>
// // // //                 ) : designations.length === 0 ? (
// // // //                   <tr><td colSpan="4" className="p-6 text-center text-gray-400">No designations found</td></tr>
// // // //                 ) : (
// // // //                   designations.map((d) => (
// // // //                     <tr key={d.id} className="border-b border-gray-700 hover:bg-gray-700/50">
// // // //                       <td className="p-4 font-medium">{d.title}</td>
// // // //                       <td className="p-4">{d.department}</td>
// // // //                       <td className="p-4">{d.totalEmployees}</td>
// // // //                       <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
// // // //                         <button title="Edit" onClick={() => alert("Edit not implemented")} className="hover:text-blue-400">
// // // //                           <FaEdit />
// // // //                         </button>
// // // //                         <button title="Delete" onClick={() => handleDelete(d.id)} className="hover:text-red-500">
// // // //                           <FaTrash />
// // // //                         </button>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>

// // // //           {error && <p className="text-red-500 mt-3">{error}</p>}
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { fetchDesignations, createDesignation, removeDesignation } from "@/redux/features/designationSlice";
// // // import { Sidebar } from "@/components/dashboard/Sidebar";
// // // import Topbar from "@/components/dashboard/Topbar";
// // // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// // // import axios from "axios";

// // // export default function DesignationPage() {
// // //   const dispatch = useDispatch();
// // //   const { data: designations = [], loading, error } = useSelector((state) => state.designation);

// // //   const [showForm, setShowForm] = useState(false);
// // //   const [title, setTitle] = useState("");
// // //   const [departmentId, setDepartmentId] = useState("");
// // //   const [departments, setDepartments] = useState([]);
// // //   const [deptLoading, setDeptLoading] = useState(true);

// // //   // For custom dropdown
// // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // //   const [selectedDepartmentName, setSelectedDepartmentName] = useState("");

// // //   // Fetch designations
// // //   useEffect(() => {
// // //     dispatch(fetchDesignations());
// // //   }, [dispatch]);

// // //   // Fetch departments from backend
// // //   useEffect(() => {
// // //     const fetchDepartments = async () => {
// // //       try {
// // //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/departments`);
// // //         setDepartments(res.data);
// // //       } catch (err) {
// // //         console.error("Error fetching departments:", err);
// // //       } finally {
// // //         setDeptLoading(false);
// // //       }
// // //     };
// // //     fetchDepartments();
// // //   }, []);

// // //   const handleAdd = async () => {
// // //     if (!title.trim() || !departmentId) {
// // //       alert("Please fill title and select department");
// // //       return;
// // //     }

// // //     const selectedDepartment = departments.find(d => d.department_id === parseInt(departmentId));

// // //     await dispatch(createDesignation({
// // //       designation_name: title,
// // //       department_id: parseInt(departmentId),
// // //       department_name: selectedDepartment?.department_name || ""
// // //     }));

// // //     setShowForm(false);
// // //     setTitle("");
// // //     setDepartmentId("");
// // //     setSelectedDepartmentName("");
// // //     setDropdownOpen(false);
// // //   };

// // //   const handleDelete = (id) => {
// // //     if (confirm("Are you sure you want to delete this designation?")) {
// // //       dispatch(removeDesignation(id));
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex bg-black min-h-screen">
// // //       <div className="hidden md:flex">
// // //         <Sidebar currentPage="Designation" />
// // //       </div>

// // //       <div className="flex-1 ml-0 md:ml-64">
// // //         <Topbar title="Designation" />

// // //         <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
// // //           {/* Header */}
// // //           <div className="mb-8 flex justify-between items-center">
// // //             <div>
// // //               <h1 className="text-3xl font-bold mb-1">Designations</h1>
// // //               <p className="text-gray-400">Manage company designations</p>
// // //             </div>
// // //             <button
// // //               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
// // //               onClick={() => setShowForm(true)}
// // //             >
// // //               <FaPlus /> Add Designation
// // //             </button>
// // //           </div>

// // //           {/* Modal Form */}
// // //           {showForm && (
// // //             <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-visible">
// // //               <div className="bg-gray-800 p-6 rounded-xl w-96 relative">
// // //                 <h2 className="text-xl font-bold mb-4">Add Designation</h2>

// // //                 <input
// // //                   className="w-full p-2 mb-3 bg-gray-700 rounded"
// // //                   placeholder="Designation Title"
// // //                   value={title}
// // //                   onChange={(e) => setTitle(e.target.value)}
// // //                 />

// // //                 {/* Custom dropdown for departments */}
// // //                 <div className="relative mb-4">
// // //                   <button
// // //                     type="button"
// // //                     className="w-full p-2 bg-gray-700 rounded text-left"
// // //                     onClick={() => setDropdownOpen(!dropdownOpen)}
// // //                   >
// // //                     {selectedDepartmentName || "Select Department"}
// // //                   </button>

// // //                   {dropdownOpen && (
// // //                     <div className="absolute w-full bg-gray-700 mt-1 rounded shadow-lg max-h-60 overflow-y-auto z-50">
// // //                       {deptLoading ? (
// // //                         <div className="p-2 text-gray-400">Loading departments...</div>
// // //                       ) : (
// // //                         departments.map((d) => (
// // //                           <div
// // //                             key={d.department_id}
// // //                             className="p-2 hover:bg-gray-600 cursor-pointer"
// // //                             onClick={() => {
// // //                               setDepartmentId(d.department_id);
// // //                               setSelectedDepartmentName(d.department_name);
// // //                               setDropdownOpen(false);
// // //                             }}
// // //                           >
// // //                             {d.department_name}
// // //                           </div>
// // //                         ))
// // //                       )}
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <div className="flex justify-end gap-3">
// // //                   <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
// // //                   <button onClick={handleAdd} className="px-4 py-2 bg-red-600 rounded">Save</button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Designations Table */}
// // //           <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
// // //             <table className="w-full text-left">
// // //               <thead className="bg-gray-700">
// // //                 <tr>
// // //                   <th className="p-4 text-sm font-semibold">Title</th>
// // //                   <th className="p-4 text-sm font-semibold">Department</th>
// // //                   <th className="p-4 text-sm font-semibold">Total Employees</th>
// // //                   <th className="p-4 text-center text-sm font-semibold">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {loading ? (
// // //                   <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr>
// // //                 ) : designations.length === 0 ? (
// // //                   <tr><td colSpan="4" className="p-6 text-center text-gray-400">No designations found</td></tr>
// // //                 ) : (
// // //                   designations.map((d) => (
// // //                     <tr key={d.id} className="border-b border-gray-700 hover:bg-gray-700/50">
// // //                       <td className="p-4 font-medium">{d.title}</td>
// // //                       <td className="p-4">{d.department}</td>
// // //                       <td className="p-4">{d.totalEmployees}</td>
// // //                       <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
// // //                         <button title="Edit" onClick={() => alert("Edit not implemented")} className="hover:text-blue-400">
// // //                           <FaEdit />
// // //                         </button>
// // //                         <button title="Delete" onClick={() => handleDelete(d.id)} className="hover:text-red-500">
// // //                           <FaTrash />
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           {error && <p className="text-red-500 mt-3">{error}</p>}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchDesignations, createDesignation, removeDesignation } from "@/redux/features/designationSlice";
// // import { Sidebar } from "@/components/dashboard/Sidebar";
// // import Topbar from "@/components/dashboard/Topbar";
// // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// // import axios from "axios";

// // export default function DesignationPage() {
// //   const dispatch = useDispatch();
// //   const { data: designations = [], loading, error } = useSelector((state) => state.designation);

// //   const [showForm, setShowForm] = useState(false);
// //   const [title, setTitle] = useState("");
// //   const [departmentId, setDepartmentId] = useState("");
// //   const [departments, setDepartments] = useState([]);
// //   const [deptLoading, setDeptLoading] = useState(true);

// //   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// //   // Fetch departments
// //   useEffect(() => {
// //     const fetchDepartments = async () => {
// //       try {
// //         const res = await axios.get(`${API_URL}/api/departments`);
// //         setDepartments(res.data);
// //       } catch (err) {
// //         console.error("Error fetching departments:", err);
// //       } finally {
// //         setDeptLoading(false);
// //       }
// //     };
// //     fetchDepartments();
// //   }, []);

// //   // Fetch designations from Redux store
// //   useEffect(() => {
// //     dispatch(fetchDesignations());
// //   }, [dispatch]);

// //   // Add new designation
// //   const handleAdd = async () => {
// //     if (!title.trim() || !departmentId) {
// //       alert("Please fill title and select department");
// //       return;
// //     }

// //     const selectedDepartment = departments.find(d => d.department_id === parseInt(departmentId));

// //     try {
// //       // Call backend POST directly
// //       const res = await axios.post(`${API_URL}/api/designations`, {
// //         designation_name: title,
// //         department_id: parseInt(departmentId)
// //       });

// //       // Update Redux store
// //       dispatch(createDesignation({
// //         id: res.data.id,
// //         title,
// //         department: selectedDepartment?.department_name || "",
// //         totalEmployees: 0
// //       }));

// //       setShowForm(false);
// //       setTitle("");
// //       setDepartmentId("");
// //     } catch (err) {
// //       console.error("Error adding designation:", err);
// //       alert("Failed to add designation");
// //     }
// //   };

// //   // Delete designation
// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this designation?")) return;

// //     try {
// //       await axios.delete(`${API_URL}/api/designations/${id}`);
// //       dispatch(removeDesignation(id));
// //     } catch (err) {
// //       console.error("Error deleting designation:", err);
// //       alert("Failed to delete designation");
// //     }
// //   };

// //   return (
// //     <div className="flex bg-black min-h-screen">
// //       {/* Sidebar */}
// //       <div className="hidden md:flex">
// //         <Sidebar currentPage="Designation" />
// //       </div>

// //       <div className="flex-1 ml-0 md:ml-64">
// //         <Topbar title="Designation" />

// //         <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
// //           {/* Header */}
// //           <div className="mb-8 flex justify-between items-center">
// //             <div>
// //               <h1 className="text-3xl font-bold mb-1">Designations</h1>
// //               <p className="text-gray-400">Manage company designations</p>
// //             </div>
// //             <button
// //               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
// //               onClick={() => setShowForm(true)}
// //             >
// //               <FaPlus /> Add Designation
// //             </button>
// //           </div>

// //           {/* Modal Form */}
// //           {showForm && (
// //             <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
// //               <div className="bg-gray-800 p-6 rounded-xl w-96">
// //                 <h2 className="text-xl font-bold mb-4">Add Designation</h2>

// //                 <input
// //                   className="w-full p-2 mb-3 bg-gray-700 rounded"
// //                   placeholder="Designation Title"
// //                   value={title}
// //                   onChange={(e) => setTitle(e.target.value)}
// //                 />

// //                 <select
// //                   className="w-full p-2 mb-4 bg-gray-700 rounded"
// //                   value={departmentId}
// //                   onChange={(e) => setDepartmentId(e.target.value)}
// //                 >
// //                   <option value="">Select Department</option>
// //                   {deptLoading ? (
// //                     <option disabled>Loading departments...</option>
// //                   ) : (
// //                     departments.map(d => (
// //                       <option key={d.department_id} value={d.department_id}>
// //                         {d.department_name}
// //                       </option>
// //                     ))
// //                   )}
// //                 </select>

// //                 <div className="flex justify-end gap-3">
// //                   <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
// //                   <button onClick={handleAdd} className="px-4 py-2 bg-red-600 rounded">Save</button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Designations Table */}
// //           <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
// //             <table className="w-full text-left">
// //               <thead className="bg-gray-700">
// //                 <tr>
// //                   <th className="p-4 text-sm font-semibold">Title</th>
// //                   <th className="p-4 text-sm font-semibold">Department</th>
// //                   <th className="p-4 text-sm font-semibold">Total Employees</th>
// //                   <th className="p-4 text-center text-sm font-semibold">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading ? (
// //                   <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr>
// //                 ) : designations.length === 0 ? (
// //                   <tr><td colSpan="4" className="p-6 text-center text-gray-400">No designations found</td></tr>
// //                 ) : (
// //                   designations.map(d => (
// //                     <tr key={d.id} className="border-b border-gray-700 hover:bg-gray-700/50">
// //                       <td className="p-4 font-medium">{d.title}</td>
// //                       <td className="p-4">{d.department}</td>
// //                       <td className="p-4">{d.totalEmployees}</td>
// //                       <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
// //                         <button title="Edit" onClick={() => alert("Edit not implemented")} className="hover:text-blue-400">
// //                           <FaEdit />
// //                         </button>
// //                         <button title="Delete" onClick={() => handleDelete(d.id)} className="hover:text-red-500">
// //                           <FaTrash />
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {error && <p className="text-red-500 mt-3">{error}</p>}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDesignations,
//   createDesignation,
//   removeDesignation,
// } from "@/redux/features/designationSlice";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import axios from "axios";

// export default function DesignationPage() {
//   const dispatch = useDispatch();
//   const { data: designations = [], loading, error } = useSelector(
//     (state) => state.designation
//   );

//   const [showForm, setShowForm] = useState(false);
//   const [title, setTitle] = useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [deptLoading, setDeptLoading] = useState(true);

//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

//   /* -----------------------------
//      FETCH DEPARTMENTS
//   ----------------------------- */
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/departments`);
//         setDepartments(res.data);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//       } finally {
//         setDeptLoading(false);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   /* -----------------------------
//      FETCH DESIGNATIONS (Redux)
//   ----------------------------- */
//   useEffect(() => {
//     dispatch(fetchDesignations());
//   }, [dispatch]);

//   /* -----------------------------
//      ADD NEW DESIGNATION
//   ----------------------------- */
//   const handleAdd = () => {
//     if (!title.trim() || !departmentId) {
//       alert("Please fill title and select department");
//       return;
//     }

//     const selectedDept = departments.find(
//       (d) => d.department_id === parseInt(departmentId)
//     );

//     dispatch(
//       createDesignation({
//         designation_name: title,
//         department_id: parseInt(departmentId),
//         department_name: selectedDept.department_name,
//       })
//     );

//     setShowForm(false);
//     setTitle("");
//     setDepartmentId("");
//   };

//   /* -----------------------------
//      DELETE DESIGNATION
//   ----------------------------- */
//   const handleDelete = (id) => {
//     if (!confirm("Delete this designation?")) return;
//     dispatch(removeDesignation(id));
//   };

//   return (
//     <div className="flex bg-black min-h-screen">
//       {/* Sidebar */}
//       <div className="hidden md:flex">
//         <Sidebar currentPage="Designation" />
//       </div>

//       <div className="flex-1 ml-0 md:ml-64">
//         <Topbar title="Designation" />

//         <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
//           {/* Header */}
//           <div className="mb-8 flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold mb-1">Designations</h1>
//               <p className="text-gray-400">Manage company designations</p>
//             </div>
//             <button
//               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
//               onClick={() => setShowForm(true)}
//             >
//               <FaPlus /> Add Designation
//             </button>
//           </div>

//           {/* Modal */}
//           {showForm && (
//             <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//               <div className="bg-gray-800 p-6 rounded-xl w-96">
//                 <h2 className="text-xl font-bold mb-4">Add Designation</h2>

//                 <input
//                   className="w-full p-2 mb-3 bg-gray-700 rounded"
//                   placeholder="Designation Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />

//                 <select
//                   className="w-full p-2 mb-4 bg-gray-700 rounded"
//                   value={departmentId}
//                   onChange={(e) => setDepartmentId(e.target.value)}
//                 >
//                   <option value="">Select Department</option>

//                   {deptLoading ? (
//                     <option disabled>Loading departments...</option>
//                   ) : (
//                     departments.map((d) => (
//                       <option
//                         key={d.department_id}
//                         value={d.department_id}
//                       >
//                         {d.department_name}
//                       </option>
//                     ))
//                   )}
//                 </select>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setShowForm(false)}
//                     className="px-4 py-2 bg-gray-600 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAdd}
//                     className="px-4 py-2 bg-red-600 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Table */}
//           <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
//             <table className="w-full text-left">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="p-4 text-sm font-semibold">Title</th>
//                   <th className="p-4 text-sm font-semibold">Department</th>
//                   <th className="p-4 text-sm font-semibold">
//                     Total Employees
//                   </th>
//                   <th className="p-4 text-center text-sm font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="4" className="p-6 text-center">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : designations.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="p-6 text-center text-gray-400"
//                     >
//                       No designations found
//                     </td>
//                   </tr>
//                 ) : (
//                   designations.map((d) => (
//                     <tr
//                       key={d.id}
//                       className="border-b border-gray-700 hover:bg-gray-700/50"
//                     >
//                       <td className="p-4 font-medium">{d.title}</td>
//                       <td className="p-4">{d.department}</td>
//                       <td className="p-4">{d.totalEmployees}</td>
//                       <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
//                         <button
//                           title="Edit"
//                           onClick={() =>
//                             alert("Edit not implemented yet")
//                           }
//                           className="hover:text-blue-400"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           title="Delete"
//                           onClick={() => handleDelete(d.id)}
//                           className="hover:text-red-500"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {error && (
//             <p className="text-red-500 mt-3">{error}</p>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDesignations,
  createDesignation,
  removeDesignation,
} from "@/redux/features/designationSlice";

import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function DesignationPage() {
  const dispatch = useDispatch();
  const { data: designations = [], loading, error } = useSelector(
    (state) => state.designation
  );

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [deptLoading, setDeptLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  /* ---------------------------------------
        FETCH DEPARTMENTS
  ---------------------------------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/departments`);
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      } finally {
        setDeptLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  /* ---------------------------------------
        FETCH ALL DESIGNATIONS
  ---------------------------------------- */
  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  /* ---------------------------------------
        ADD DESIGNATION
  ---------------------------------------- */
  const handleAdd = () => {
    if (!title.trim() || !departmentId) {
      alert("Please fill title and select department");
      return;
    }

    const selectedDept = departments.find(
      (d) => d.department_id === parseInt(departmentId)
    );

    dispatch(
      createDesignation({
        designation_name: title,
        department_id: parseInt(departmentId),
        department_name: selectedDept.department_name,
      })
    );

    setShowForm(false);
    setTitle("");
    setDepartmentId("");
  };

  /* ---------------------------------------
        DELETE DESIGNATION
  ---------------------------------------- */
  const handleDelete = (id) => {
    if (!confirm("Delete this designation?")) return;
    dispatch(removeDesignation(id));
  };

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Designation" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Designation" />

        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Designations</h1>
              <p className="text-gray-400">Manage company designations</p>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
              onClick={() => setShowForm(true)}
            >
              <FaPlus /> Add Designation
            </button>
          </div>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
              <div className="bg-gray-800 p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold mb-4">Add Designation</h2>

                <input
                  className="w-full p-2 mb-3 bg-gray-700 rounded"
                  placeholder="Designation Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <select
                  className="w-full p-2 mb-4 bg-gray-700 rounded"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="">Select Department</option>

                  {deptLoading ? (
                    <option disabled>Loading departments...</option>
                  ) : (
                    departments.map((d) => (
                      <option key={d.department_id} value={d.department_id}>
                        {d.department_name}
                      </option>
                    ))
                  )}
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-600 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-red-600 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold">Title</th>
                  <th className="p-4 text-sm font-semibold">Department</th>
                  <th className="p-4 text-sm font-semibold">Total Employees</th>
                  <th className="p-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : designations.length === 0 ? (
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
                      <td className="p-4">{d.totalEmployees}</td>

                      <td className="p-4 flex justify-center gap-4 text-lg text-gray-400">
                        <button
                          className="hover:text-blue-400"
                          onClick={() => alert("Edit not implemented")}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="hover:text-red-500"
                          onClick={() => handleDelete(d.id)}
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

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </main>
      </div>
    </div>
  );
}

