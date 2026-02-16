"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { Bell, LogOut, User } from "lucide-react";
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // Clear Redux state + localStorage together
    dispatch(logout());
    router.replace("/login");
  };

  // Display client name if available
  const displayName = client?.client_name || "Client";

  return (
    <header className="w-full bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <h1 className="text-lg font-medium text-gray-100">
          Hello, <span className="font-semibold">{displayName}</span>
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <Button size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500"></span>
          </Button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-100">
              <User size={18} />
            </div>
          </div>

          {/* Logout */}
          <Button onClick={handleLogout} className="flex items-center gap-1">
            <LogOut size={16} />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
