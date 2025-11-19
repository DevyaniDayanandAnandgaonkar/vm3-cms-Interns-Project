// "use client";

// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Dashboard() {
//   const router = useRouter();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/admin/login");
//     }
//   }, [isAuthenticated]);

//   return (
//     <div className="text-white p-10">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//     </div>
//   );
// }



"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Dummy Data (same as screenshot)
  const departmentData = [
    { name: "Sales", value: 15 },
    { name: "Marketing", value: 28 },
    { name: "Development", value: 35 },
    { name: "HR", value: 10 },
  ];

  const projectStatusData = [
    { name: "Active", value: 60 },
    { name: "Inactive", value: 25 },
    { name: "Completed", value: 25 },
  ];

  const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd"];

  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* --------------------- SIDEBAR ----------------------- */}
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>
          Dashboard
        </h2>

        <nav className="mt-8 space-y-4">
          <a className="text-blue-600 font-medium block">Dashboard</a>
          <a className="block hover:text-blue-600">Departments</a>
          <a className="block hover:text-blue-600">Employees</a>
          <a className="block hover:text-blue-600">Clients</a>
          <a className="block hover:text-blue-600">Partners</a>
          <a className="block hover:text-blue-600">Projects</a>
          <a className="block hover:text-blue-600">Project History</a>
          <a className="block hover:text-blue-600">Roles</a>
          <a className="block hover:text-blue-600">Designation</a>
          <a className="block hover:text-blue-600">Reports</a>
          <a className="block hover:text-blue-600">Settings</a>
        </nav>
      </aside>

      {/* --------------------- MAIN CONTENT ------------------- */}
      <main className="flex-1 p-10">

        {/* ---------------- TOP BAR ---------------- */}
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search"
            className="w-96 px-4 py-2 border rounded-lg bg-white"
          />
          <img
            src="/avatar.png"
            alt="user"
            className="w-10 rounded-full border"
          />
        </div>

        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        {/* ---------------- STAT CARDS ---------------- */}
        <div className="grid grid-cols-4 gap-6">
          <Card title="Total Employees" value="150" />
          <Card title="Total Clients" value="75" />
          <Card title="Total Projects" value="20" />
          <Card title="Completed Projects" value="10" />
        </div>

        {/* ---------------- CHARTS SECTION ---------------- */}
        <div className="grid grid-cols-2 gap-10 mt-10">

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Employees by Department
            </h2>

            <BarChart width={400} height={250} data={departmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">
              Projects Status Overview
            </h2>

            <PieChart width={300} height={300}>
              <Pie
                data={projectStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {projectStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* ---------------- SUMMARY SECTION ---------------- */}
        <div className="mt-12 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p className="text-gray-500">
            Add your custom summary or reports here…
          </p>
        </div>
      </main>
    </div>
  );
}

/* --------------------- CARD COMPONENT ------------------ */
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
