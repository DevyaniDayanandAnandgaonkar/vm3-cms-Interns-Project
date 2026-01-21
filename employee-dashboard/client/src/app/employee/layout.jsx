// "use client";

// import Sidebar from "@/components/employee/Sidebar";
// import Topbar from "@/components/employee/Topbar";

// export default function EmployeeLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col">
//         <Topbar />

//         <main className="p-6 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import { Providers } from "@/redux/Providers";
import Sidebar from "@/components/employee/Sidebar";
import Topbar from "@/components/employee/Topbar";

export default function EmployeeLayout({ children }) {
  return (
    <Providers>
      <div className="min-h-screen bg-black text-white">
        <Sidebar />

        <div className="ml-64 flex flex-col">
          <Topbar />
          <main className="p-6 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
