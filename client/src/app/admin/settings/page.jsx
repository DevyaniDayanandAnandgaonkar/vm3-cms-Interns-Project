"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Lock, Palette, Building } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Lock },
    { id: "company", label: "Company Info", icon: Building },
  ];

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Settings" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar />
        
        <main className="p-4 sm:p-6 md:p-10 text-white">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400">Manage your application preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="w-full lg:w-64 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-red-500 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <Card className="bg-gray-900 border-gray-800 text-white">
                {activeTab === "notifications" && <NotificationsSettings />}
                {activeTab === "appearance" && <AppearanceSettings />}
                {activeTab === "security" && <SecuritySettings />}
                {activeTab === "company" && <CompanySettings />}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NotificationsSettings() {
  return (
    <>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription className="text-gray-400">
          Configure how you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Email Notifications</Label>
            <p className="text-sm text-gray-400">Receive emails about your account activity.</p>
          </div>
          <input type="checkbox" className="w-5 h-5 accent-red-500 cursor-pointer" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Push Notifications</Label>
            <p className="text-sm text-gray-400">Receive push notifications on your device.</p>
          </div>
          <input type="checkbox" className="w-5 h-5 accent-red-500 cursor-pointer" />
        </div>
         <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Marketing Emails</Label>
            <p className="text-sm text-gray-400">Receive emails about new products, features, and more.</p>
          </div>
          <input type="checkbox" className="w-5 h-5 accent-red-500 cursor-pointer" />
        </div>
        <div className="pt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Save Preferences</Button>
        </div>
      </CardContent>
    </>
  );
}

function AppearanceSettings() {
  return (
    <>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription className="text-gray-400">
          Customize the look and feel of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-red-500 rounded-lg p-1 bg-black cursor-pointer">
                    <div className="bg-gray-800 h-20 rounded mb-2"></div>
                    <div className="text-center text-sm font-medium">Dark</div>
                </div>
                 <div className="border border-gray-700 rounded-lg p-1 bg-white cursor-pointer opacity-50">
                    <div className="bg-gray-100 h-20 rounded mb-2"></div>
                    <div className="text-center text-sm text-black font-medium">Light</div>
                </div>
                 <div className="border border-gray-700 rounded-lg p-1 bg-gray-900 cursor-pointer opacity-50">
                    <div className="bg-gray-800 h-20 rounded mb-2"></div>
                    <div className="text-center text-sm font-medium">System</div>
                </div>
            </div>
        </div>
        <div className="pt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Save Changes</Button>
        </div>
      </CardContent>
    </>
  );
}

function SecuritySettings() {
  return (
    <>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your password and security settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
        </div>
        <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="Enter new password" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
        </div>
         <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="Confirm new password" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
        </div>
         <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label className="text-base">Two-Factor Authentication</Label>
            <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
          </div>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Enable 2FA</Button>
        </div>
        <div className="pt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Update Password</Button>
        </div>
      </CardContent>
    </>
  );
}

function CompanySettings() {
  return (
    <>
      <CardHeader>
        <CardTitle>Company Info</CardTitle>
        <CardDescription className="text-gray-400">
          Update your company details and contact information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Company Name</Label>
                <Input placeholder="Acme Inc." defaultValue="VM3 Tech Solutions" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
            </div>
             <div className="space-y-2">
                <Label>Industry</Label>
                <Input placeholder="Technology" defaultValue="Software Development" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
            </div>
        </div>
        <div className="space-y-2">
            <Label>Address</Label>
            <Input placeholder="123 Main St" defaultValue="123 Tech Park, Silicon Valley" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input type="email" placeholder="contact@example.com" defaultValue="info@vm3tech.com" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
            </div>
             <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
            </div>
        </div>
        <div className="space-y-2">
            <Label>Website</Label>
            <Input type="url" placeholder="https://example.com" defaultValue="https://vm3tech.com" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
        </div>
        <div className="pt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Save Company Info</Button>
        </div>
      </CardContent>
    </>
  );
}
