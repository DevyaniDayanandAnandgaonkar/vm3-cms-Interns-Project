// "use client";

// import { Sidebar } from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";

// import {
//   FaUserTie,
//   FaChartLine,
//   FaCoins,
//   FaClipboardList,
//   FaCalendarCheck,
//   FaChartBar,
// } from "react-icons/fa";

// export default function ReportsPage() {
//   const reportItems = [
//     {
//       id: 1,
//       title: "Employee Report",
//       desc: "Detailed employee attendance, performance, and statistics",
//       last: "2024-11-15",
//       color: "bg-blue-100 text-blue-600 border-blue-300",
//       icon: <FaUserTie />,
//     },
//     {
//       id: 2,
//       title: "Project Report",
//       desc: "Project progress, timelines, and completion rates",
//       last: "2024-11-16",
//       color: "bg-green-100 text-green-600 border-green-300",
//       icon: <FaClipboardList />,
//     },
//     {
//       id: 3,
//       title: "Financial Report",
//       desc: "Revenue, expenses, and financial summaries",
//       last: "2024-11-14",
//       color: "bg-purple-100 text-purple-600 border-purple-300",
//       icon: <FaCoins />,
//     },
//     {
//       id: 4,
//       title: "Performance Report",
//       desc: "Team and individual performance metrics",
//       last: "2024-11-17",
//       color: "bg-orange-100 text-orange-600 border-orange-300",
//       icon: <FaChartLine />,
//     },
//     {
//       id: 5,
//       title: "Attendance Report",
//       desc: "Employee attendance and leave records",
//       last: "2024-11-17",
//       color: "bg-pink-100 text-pink-600 border-pink-300",
//       icon: <FaCalendarCheck />,
//     },
//     {
//       id: 6,
//       title: "Analytics Report",
//       desc: "Comprehensive business analytics and insights",
//       last: "2024-11-16",
//       color: "bg-blue-200 text-blue-700 border-blue-400",
//       icon: <FaChartBar />,
//     },
//   ];

//   return (
//     <div className="flex bg-gray-100 min-h-screen text-gray-900">
//       {/* Sidebar */}
//       <div className="hidden md:flex">
//         <Sidebar currentPage="Reports" />
//       </div>

//       {/* Main section */}
//       <div className="flex-1 md:ml-64">

//         {/* Topbar */}
//         <Topbar title="Reports" />

//         {/* Page Content */}
//         <main className="p-6 sm:p-10">

//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold">Reports</h1>
//             <p className="text-gray-500">
//               Generate and download various business reports
//             </p>

//             {/* Tabs */}
//             <div className="flex gap-4 mt-5">
//               <button className="px-5 py-2 bg-black text-white rounded-lg shadow">
//                 Generate Reports
//               </button>
//               <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg shadow">
//                 Recent Reports
//               </button>
//             </div>
//           </div>

//           {/* Report Cards */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {reportItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-md transition"
//               >
//                 <div
//                   className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl ${item.color}`}
//                 >
//                   {item.icon}
//                 </div>

//                 <h3 className="text-lg font-semibold mt-4">{item.title}</h3>

//                 <p className="text-gray-600 text-sm mt-1">{item.desc}</p>

//                 <p className="text-gray-400 text-sm mt-3">
//                   Last generated: {item.last}
//                 </p>

//                 <button
//                   className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-900 transition"
//                 >
//                   Generate Report
//                 </button>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }





"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import {
  FaUserTie,
  FaChartLine,
  FaCoins,
  FaClipboardList,
  FaCalendarCheck,
  FaChartBar,
} from "react-icons/fa";

export default function ReportsPage() {
  const reportItems = [
    {
      id: 1,
      title: "Employee Report",
      desc: "Detailed employee attendance, performance, and statistics",
      last: "2024-11-15",
      color: "bg-blue-900/40 text-blue-300 border-blue-700",
      icon: <FaUserTie />,
    },
    {
      id: 2,
      title: "Project Report",
      desc: "Project progress, timelines, and completion rates",
      last: "2024-11-16",
      color: "bg-green-900/40 text-green-300 border-green-700",
      icon: <FaClipboardList />,
    },
    {
      id: 3,
      title: "Financial Report",
      desc: "Revenue, expenses, and financial summaries",
      last: "2024-11-14",
      color: "bg-purple-900/40 text-purple-300 border-purple-700",
      icon: <FaCoins />,
    },
    {
      id: 4,
      title: "Performance Report",
      desc: "Team and individual performance metrics",
      last: "2024-11-17",
      color: "bg-orange-900/40 text-orange-300 border-orange-700",
      icon: <FaChartLine />,
    },
    {
      id: 5,
      title: "Attendance Report",
      desc: "Employee attendance and leave records",
      last: "2024-11-17",
      color: "bg-pink-900/40 text-pink-300 border-pink-700",
      icon: <FaCalendarCheck />,
    },
    {
      id: 6,
      title: "Analytics Report",
      desc: "Comprehensive business analytics and insights",
      last: "2024-11-16",
      color: "bg-blue-800/40 text-blue-300 border-blue-600",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Reports" />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">

        {/* Topbar */}
        <Topbar title="Reports" />

        {/* Main container */}
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Reports</h1>
            <p className="text-gray-400">
              Generate and download various business reports
            </p>

            {/* Tabs */}
            <div className="flex gap-4 mt-5">
              <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition">
                Generate Reports
              </button>

              <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg shadow transition">
                Recent Reports
              </button>
            </div>
          </div>

          {/* Report Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow hover:bg-gray-700 transition"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl border ${item.color}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold mt-4 text-white">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>

                <p className="text-gray-500 text-sm mt-3">
                  Last generated: {item.last}
                </p>

                <button
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition"
                >
                  Generate Report
                </button>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
