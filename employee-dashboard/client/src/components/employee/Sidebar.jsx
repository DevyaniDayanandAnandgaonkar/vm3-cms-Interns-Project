// // "use client";
// // import Link from "next/link";

// // export default function Sidebar() {
// //   return (
// //     <aside className="w-64 bg-black text-white p-4">
// //       <nav className="space-y-3">
// //         <Link href="/employee/dashboard">Dashboard</Link>
// //         <Link href="/employee/todo">Todo</Link>
// //         <Link href="/employee/tasks">Tasks</Link>
// //         <Link href="/employee/leaves">Leaves</Link>
// //         <Link href="/employee/projects">Projects</Link>
// //       </nav>
// //     </aside>
// //   );
// // }


// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const menu = [
//   { name: "Dashboard", path: "/employee/dashboard" },
//   { name: "Todo", path: "/employee/todo" },
//   { name: "Tasks", path: "/employee/tasks" },
//   { name: "Leaves", path: "/employee/leaves" },
//   { name: "Projects", path: "/employee/projects" },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-black border-r border-gray-800 p-4">
//       <h2 className="text-xl font-semibold mb-6">Employee Dashboard</h2>

//       <nav className="space-y-2">
//         {menu.map((item) => (
//           <Link
//             key={item.path}
//             href={item.path}
//             className={`block px-4 py-3 rounded-lg transition
//               ${
//                 pathname === item.path
//                   ? "bg-red-600 text-white"
//                   : "text-gray-300 hover:bg-gray-800"
//               }`}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListTodo,
  CheckSquare,
  CalendarDays,
  FolderKanban,
  UserCircle,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/employee/dashboard" },
  { icon: ListTodo, label: "Todos", path: "/employee/todos" },
  { icon: CheckSquare, label: "Tasks", path: "/employee/tasks" },
  { icon: CalendarDays, label: "Leaves", path: "/employee/leaves" },
  { icon: FolderKanban, label: "Projects", path: "/employee/projects" },
  { icon: UserCircle, label: "Profile", path: "/employee/profile" },
  { icon: Settings, label: "Settings", path: "/employee/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 p-6">
      <h2 className="text-xl font-semibold mb-8">Employee Portal</h2>

      <nav className="space-y-2">
        {menu.map(({ icon: Icon, label, path }) => {
          const active = pathname === path;

          return (
            <button
              key={label}
              onClick={() => router.push(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? "bg-red-500 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
