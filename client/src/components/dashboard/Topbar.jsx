// //  src/components/dashboard/Topbar.jsx
// "use client";
// import React from "react";
// import { Bell } from "lucide-react";
// import { useAppSelector } from "@/redux/hooks";

// export default function Topbar() {
//   const user = useAppSelector((s) => s.auth.user);

//   return (
//     <div className="w-full border-b border-gray-200 bg-white px-6 py-3 mb-6 flex items-center justify-between">
//       <div className="text-sm text-gray-700">Hello, <span className="font-medium">{user?.name || "User"}</span></div>

//       <div className="flex items-center gap-4">
//         <button aria-label="notifications" className="p-2 rounded hover:bg-gray-50">
//           <Bell className="w-5 h-5 text-gray-600" />
//         </button>

//         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-gray-700">
//           {user?.name ? user.name.split(" ").map(n => n[0]).slice(0,2).join("") : "U"}
//         </div>
//       </div>
//     </div>
//   );
// }




// src/components/dashboard/Topbar.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice"; // <-- Make sure path is correct

export default function Topbar() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className="w-full bg-black border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      
      {/* Greeting */}
      <div className="text-white text-xl font-bold">
        Hello, <span className="font-bold">{user?.name || "User"}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        
        {/* Notification button */}
        <button className="p-2 rounded-lg hover:bg-red-500 transition">
          <Bell className="w-5 h-5 text-white" />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
          >
            {initials}
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border border-gray-200 py-1 z-50">

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-red-600 hover:text-white transition rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
