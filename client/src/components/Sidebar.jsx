import React from 'react';
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
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Building2, label: 'Departments' },
  { icon: Users, label: 'Employees' },
  { icon: UserCircle, label: 'Clients' },
  { icon: Handshake, label: 'Partners' },
  { icon: FolderKanban, label: 'Projects' },
  //{ icon: History, label: 'Project History' },
  { icon: UserCog, label: 'Roles' },
  { icon: Briefcase, label: 'Designation' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar({ currentPage, onNavigate }) {
  return (
    <div className="w-64 bg-white border-r border-black-200 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <span className="text-black">Dashboard</span>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === currentPage;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-500 text-white' : 'text-black hover:bg-black-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
