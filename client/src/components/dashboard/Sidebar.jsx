// // src/components/dashboard/Sidebar.jsx
// "use client";
// import React from 'react';
// import {
//   LayoutDashboard,
//   Building2,
//   Users,
//   UserCircle,
//   Handshake,
//   FolderKanban,
//   History,
//   UserCog,
//   Briefcase,
//   FileText,
//   Settings,
// } from 'lucide-react';

// const menuItems = [
//   { icon: LayoutDashboard, label: 'Dashboard' },
//   { icon: Building2, label: 'Departments' },
//   { icon: Users, label: 'Employees' },
//   { icon: UserCircle, label: 'Clients' },
//   { icon: Handshake, label: 'Partners' },
//   { icon: FolderKanban, label: 'Projects' },
//   { icon: History, label: 'Project History' },
//   { icon: UserCog, label: 'Roles' },
//   { icon: Briefcase, label: 'Designation' },
//   { icon: FileText, label: 'Reports' },
//   { icon: Settings, label: 'Settings' },
// ];

// export function Sidebar({ currentPage, onNavigate }) {
//   return (
//     <div className="w-64 bg-white border-r border-gray-200 p-6">
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//           <LayoutDashboard className="w-6 h-6 text-white" />
//         </div>
//         <span className="text-gray-900  font-semibold sm:text-2xl">Dashboard</span>
//       </div>

//       <nav className="space-y-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = item.label === currentPage;

//           return (
//             <button
//               key={item.label}
//               onClick={() => onNavigate(item.label)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive
//                   ? "bg-blue-500 text-white"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }


"use client";
import React from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCircle,
  Handshake,
  FolderKanban,
  History,
  UserCog,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Building2, label: "Departments", path: "/admin/departments" },
  { icon: Users, label: "Employees", path: "/admin/employees" },
  { icon: UserCircle, label: "Clients", path: "/admin/clients" },
  { icon: Handshake, label: "Partners", path: "/admin/partners" },
  { icon: FolderKanban, label: "Projects", path: "/admin/projects" },
  { icon: History, label: "Project History", path: "/admin/project-history" },
  { icon: UserCog, label: "Roles", path: "/admin/roles" },
  { icon: Briefcase, label: "Designation", path: "/admin/designation" },
  { icon: FileText, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function Sidebar({ currentPage }) {
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <span className="text-gray-200 font-semibold text-xl">Dashboard</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => {
          const active = label === currentPage;

          return (
            <button
              key={label}
              onClick={() => router.push(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${active ? "bg-red-500 text-white" : "text-gray-200 hover:bg-red-400"}
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
