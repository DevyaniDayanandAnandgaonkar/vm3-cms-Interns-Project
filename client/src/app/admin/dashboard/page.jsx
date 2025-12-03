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


// // src/app/admin/dashboard/page.jsx
// "use client";

// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
// } from "recharts";

// import { Sidebar } from "@/components/dashboard/Sidebar";
// // import { Topbar } from "@/components/dashboard/Topbar";
// import Topbar from "@/components/dashboard/Topbar";

// export default function Dashboard() {
//   const router = useRouter();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/admin/login");
//     }
//   }, [isAuthenticated, router]);

//   const departmentData = [
//     { name: "Sales", value: 15 },
//     { name: "Marketing", value: 28 },
//     { name: "HR", value: 35 },
//     { name: "Dev", value: 10 },
//   ];

//   const projectStatusData = [
//     { name: "Active", value: 60 },
//     { name: "Inactive", value: 25 },
//     { name: "Completed", value: 25 },
//   ];

//   const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd"];

//   const [currentPage, setCurrentPage] = useState("Dashboard");

//   function handleNavigate(page) {
//     setCurrentPage(page);

//     const routeMap = {
//       Dashboard: "/admin/dashboard",
//       Departments: "/admin/departments",
//       Employees: "/admin/employees",
//       Clients: "/admin/clients",
//       Partners: "/admin/partners",
//       Projects: "/admin/projects",
//     };

//     router.push(routeMap[page] || "/admin/dashboard");
//   }

//   return (
//     <div className="flex bg-gray-50 min-h-screen">

//       {/* SIDEBAR — responsive */}
//       <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-4 sm:p-6 md:p-10">

//         {/* TOP BAR */}
//         <Topbar currentPage={currentPage} onNavigate={handleNavigate}/>
        

//         {/* STAT CARDS — responsive grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card title="Total Employees" value="150" />
//           <Card title="Total Clients" value="75" />
//           <Card title="Total Projects" value="20" />
//           <Card title="Completed Projects" value="10" />
//         </div>

//         {/* CHARTS SECTION */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

//           {/* BAR CHART — auto shrink on mobile */}
//           <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
//             <h2 className="text-lg font-semibold mb-4">
//               Employees by Department
//             </h2>

//             <div className="w-full flex justify-center">
//               <BarChart
//                 width={350}
//                 height={250}
//                 data={departmentData}
//                 className="max-w-full"
//               >
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#3b82f6" />
//               </BarChart>
//             </div>
//           </div>

//           {/* PIE CHART */}
//           <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Projects Status Overview
//             </h2>

//             <PieChart width={260} height={260}>
//               <Pie
//                 data={projectStatusData}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={50}
//                 outerRadius={90}
//               >
//                 {projectStatusData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </div>
//         </div>

//         {/* SUMMARY BOX */}
//         <div className="mt-12 bg-white rounded-xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Summary</h2>
//           <p className="text-gray-500">
//             Add your custom summary or reports here…
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* CARD COMPONENT */
// function Card({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow text-center">
//       <p className="text-gray-500">{title}</p>
//       <h3 className="text-3xl font-bold mt-2">{value}</h3>
//     </div>
//   );
// }

"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  const departmentData = [
    { name: "Sales", value: 15 },
    { name: "Marketing", value: 28 },
    { name: "HR", value: 35 },
    { name: "Devloper", value: 10 },
  ];

  const projectStatusData = [
    { name: "Active", value: 60 },
    { name: "Inactive", value: 25 },
    { name: "Completed", value: 25 },
  ];

  const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd"];

  const [currentPage, setCurrentPage] = useState("Dashboard");

  function handleNavigate(page) {
    setCurrentPage(page);

    const routeMap = {
      Dashboard: "/admin/dashboard",
      Departments: "/admin/departments",
      Employees: "/admin/employees",
      Clients: "/admin/clients",
      Partners: "/admin/partners",
      Projects: "/admin/projects",
    };

    router.push(routeMap[page] || "/admin/dashboard");
  }

  return (
    <div className="flex bg-black min-h-screen">

      {/* FIXED SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-0 md:ml-64">

        {/* TOP BAR */}
        <Topbar />

        {/* CONTENT */}
        <main className="p-4 sm:p-6 md:p-10">

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card  title="Total Employees" value="150"  />
            <Card title="Total Clients" value="75" />
            <Card title="Total Projects" value="20" />
            <Card title="Completed Projects" value="10" />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

            {/* BAR CHART */}
            <div className="bg-gray-50/10 p-6 rounded-xl shadow overflow-x-auto">
              <h2 className="text-lg text-amber-50 font-semibold mb-4">Employees by Department</h2>

              <div className="w-full  flex justify-center">
                <BarChart width={350} height={250} data={departmentData}>
                  <XAxis dataKey="name"
                  stroke="white" 
                  tick={{ fill: "#3b82f6" }} />
                  <YAxis stroke="white" 
                  tick={{ fill: "#3b82f6" }}/>
                  <Tooltip />
                  <Bar dataKey="value"  fill="#3b82f6" />
                </BarChart>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="bg-white/10 p-6 rounded-xl shadow flex flex-col items-center">
              <h2 className="text-lg text-amber-50 font-semibold mb-4">Projects Status Overview</h2>

              <PieChart width={360} height={260}>
                <Pie
                  data={projectStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
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

          {/* SUMMARY */}
          <div className="mt-12 bg-gray-50/10 rounded-xl shadow p-6">
            <h2 className="text-xl text-green-100 font-semibold mb-4">Summary</h2>
            <p className="text-gray-100">Add your custom summary or reports here…</p>
          </div>

        </main>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value }) {
  return (
    <div className="bg-gray-50/10 p-6 rounded-xl shadow text-center">
      <p className="text-green-100 font-bold">{title}</p>
      <h3 className="text-3xl text-blue-800 font-bold mt-2">{value}</h3>
    </div>
  );
}
