"use client";

import { Bell, LogOut, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <h1 className="text-lg font-medium text-gray-800">
          Hello, <span className="font-semibold">Robert Fox</span>
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <button className="relative text-gray-600 hover:text-gray-800">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <User size={18} />
            </div>
          </div>

          {/* Logout */}
          <button className="flex items-center gap-1 text-gray-700 hover:text-red-600">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
