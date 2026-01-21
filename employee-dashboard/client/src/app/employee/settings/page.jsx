// "use client";

// import { useState } from "react";
// import {
//   User,
//   Mail,
//   Lock,
//   Camera,
//   BarChart3,
//   Palette,
//   LogOut,
//   Bell,
//   Send,
// } from "lucide-react";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("profile");

//   const [profileData, setProfileData] = useState({
//     name: "John Anderson",
//     email: "john.anderson@company.com",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [appearance, setAppearance] = useState("system");

//   const [notifications, setNotifications] = useState({
//     pushEnabled: true,
//     emailEnabled: true,
//   });

//   const [notification, setNotification] = useState({
//     title: "",
//     description: "",
//     recipient: "all",
//   });

//   const tabs = [
//     { id: "profile", label: "Edit Profile", icon: User },
//     { id: "stats", label: "My Stats", icon: BarChart3 },
//     // { id: "appearance", label: "Appearance", icon: Palette },
//     { id: "notifications", label: "Notifications", icon: Bell },
//   ];

//   const handleSaveProfile = () => {
//     alert("Profile updated successfully!");
//   };

//   const handlePasswordChange = () => {
//     if (profileData.newPassword !== profileData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     alert("Password changed successfully!");
//     setProfileData({
//       ...profileData,
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//   };

//   const handleLogout = () => {
//     if (confirm("Are you sure you want to log out?")) {
//       alert("Logged out successfully!");
//     }
//   };

//   const handleSendNotification = () => {
//     if (!notification.title || !notification.description) {
//       alert("Please fill in all fields");
//       return;
//     }
//     alert(`Notification sent to ${notification.recipient}!`);
//     setNotification({ title: "", description: "", recipient: "all" });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-semibold">Settings</h1>
//         <p className="text-gray-400">
//           Manage your account settings and preferences
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
//         <div className="flex border-b border-gray-800 bg-gray-950">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-6 py-4 ${
//                   activeTab === tab.id
//                     ? "border-b-2 border-red-500 text-red-400"
//                     : "text-gray-400 hover:text-white"
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 {tab.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* PROFILE */}
//           {activeTab === "profile" && (
//             <div className="space-y-6">
//               <div className="flex items-center gap-6">
//                 <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-xl font-bold">
//                   JA
//                 </div>
//                 <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
//                   Upload Photo
//                 </button>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <input
//                   value={profileData.name}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, name: e.target.value })
//                   }
//                   className="bg-gray-800 p-3 rounded-lg"
//                   placeholder="Full Name"
//                 />
//                 <input
//                   value={profileData.email}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, email: e.target.value })
//                   }
//                   className="bg-gray-800 p-3 rounded-lg"
//                   placeholder="Email"
//                 />
//               </div>

//               <button
//                 onClick={handleSaveProfile}
//                 className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600"
//               >
//                 Save Changes
//               </button>

//               <div className="border-t border-gray-800 pt-6">
//                 <div className="max-w-md space-y-4">
//                   {/* Current Password */}
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="password"
//                       placeholder="Current Password"
//                       className="bg-gray-800 pl-10 pr-3 py-3 rounded-lg w-full"
//                       value={profileData.currentPassword}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           currentPassword: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   {/* New Password */}
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="password"
//                       placeholder="New Password"
//                       className="bg-gray-800 pl-10 pr-3 py-3 rounded-lg w-full"
//                       value={profileData.newPassword}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           newPassword: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="password"
//                       placeholder="Confirm Password"
//                       className="bg-gray-800 pl-10 pr-3 py-3 rounded-lg w-full"
//                       value={profileData.confirmPassword}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           confirmPassword: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <button
//                     onClick={handlePasswordChange}
//                     className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600"
//                   >
//                     Update Password
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STATS */}
//           {activeTab === "stats" && (
//             <div className="grid md:grid-cols-3 gap-6">
//               {[
//                 { label: "Tasks Completed", value: "48" },
//                 { label: "On-Time %", value: "96%" },
//                 { label: "Active Projects", value: "23" },
//                 { label: "Vacation Balance", value: "15 Days" },
//                 { label: "Hours This Month", value: "156" },
//                 { label: "Rating", value: "4.8/5" },
//               ].map((stat, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-800 p-6 rounded-xl border border-gray-700"
//                 >
//                   <div className="text-3xl font-bold text-red-400">
//                     {stat.value}
//                   </div>
//                   <div className="text-gray-400">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* APPEARANCE */}
//           {/* {activeTab === "appearance" && (
//             <div className="space-y-4 max-w-xl">
//               {["system", "light", "dark"].map((mode) => (
//                 <button
//                   key={mode}
//                   onClick={() => setAppearance(mode)}
//                   className={`w-full text-left p-4 rounded-lg border ${
//                     appearance === mode
//                       ? "border-red-500 bg-gray-800"
//                       : "border-gray-700"
//                   }`}
//                 >
//                   {mode.toUpperCase()} MODE
//                 </button>
//               ))}
//             </div>
//           )} */}

//           {/* NOTIFICATIONS */}
//           {activeTab === "notifications" && (
//             <div className="space-y-6 max-w-xl">
//               <input
//                 placeholder="Title"
//                 className="bg-gray-800 p-3 rounded-lg w-full"
//                 value={notification.title}
//                 onChange={(e) =>
//                   setNotification({ ...notification, title: e.target.value })
//                 }
//               />
//               <textarea
//                 placeholder="Description"
//                 className="bg-gray-800 p-3 rounded-lg w-full"
//                 rows={4}
//                 value={notification.description}
//                 onChange={(e) =>
//                   setNotification({
//                     ...notification,
//                     description: e.target.value,
//                   })
//                 }
//               />
//               <select
//                 className="bg-gray-800 p-3 rounded-lg w-full"
//                 value={notification.recipient}
//                 onChange={(e) =>
//                   setNotification({
//                     ...notification,
//                     recipient: e.target.value,
//                   })
//                 }
//               >
//                 <option value="all">All Users</option>
//                 <option value="employees">Employees</option>
//                 <option value="clients">Clients</option>
//                 <option value="admin">Admin</option>
//               </select>

//               <button
//                 onClick={handleSendNotification}
//                 className="flex items-center gap-2 px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600"
//               >
//                 <Send className="w-5 h-5" />
//                 Send Notification
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Logout */}
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700"
//       >
//         <LogOut className="w-5 h-5" />
//         Log Out
//       </button>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  BarChart3,
  LogOut,
  Bell,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@company.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [notification, setNotification] = useState({
    title: "",
    description: "",
    recipient: "all",
  });

  const tabs = [
    { id: "profile", label: "Edit Profile", icon: User },
    { id: "stats", label: "My Stats", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleSaveProfile = () => alert("Profile updated successfully!");

  const handlePasswordChange = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setProfileData({
      ...profileData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) alert("Logged out!");
  };

  const handleSendNotification = () => {
    if (!notification.title || !notification.description) {
      alert("Please fill all fields");
      return;
    }
    alert(`Notification sent to ${notification.recipient}`);
    setNotification({ title: "", description: "", recipient: "all" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-800 bg-gray-950">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 ${
                  activeTab === tab.id
                    ? "border-b-2 border-red-500 text-red-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Avatar */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="relative">
                  <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-xl font-bold">
                    JA
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-gray-900 rounded-full border border-gray-700 hover:bg-gray-800">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  Upload Photo
                </button>
              </div>

              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="bg-gray-800 pl-10 pr-3 py-3 rounded-lg w-full"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    placeholder="Full Name"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="bg-gray-800 pl-10 pr-3 py-3 rounded-lg w-full"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Save Changes
              </button>

              {/* PASSWORDS */}
              <div className="border-t border-gray-800 pt-6">
                <div className="max-w-md space-y-4">
                  {[
                    { key: "current", label: "Current Password" },
                    { key: "new", label: "New Password" },
                    { key: "confirm", label: "Confirm Password" },
                  ].map(({ key, label }) => (
                    <div key={key} className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword[key] ? "text" : "password"}
                        placeholder={label}
                        className="bg-gray-800 pl-10 pr-10 py-3 rounded-lg w-full"
                        value={profileData[`${key}Password`] || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            [`${key}Password`]: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            [key]: !showPassword[key],
                          })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword[key] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handlePasswordChange}
                    className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 w-full sm:w-auto"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATS */}
          {activeTab === "stats" && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                ["Tasks Completed", "48"],
                ["On-Time %", "96%"],
                ["Active Projects", "23"],
                ["Vacation Balance", "15 Days"],
                ["Hours This Month", "156"],
                ["Rating", "4.8/5"],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                >
                  <div className="text-3xl font-bold text-red-400">
                    {value}
                  </div>
                  <div className="text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-6 max-w-xl">
              <input
                placeholder="Title"
                className="bg-gray-800 p-3 rounded-lg w-full"
                value={notification.title}
                onChange={(e) =>
                  setNotification({ ...notification, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                rows={4}
                className="bg-gray-800 p-3 rounded-lg w-full"
                value={notification.description}
                onChange={(e) =>
                  setNotification({
                    ...notification,
                    description: e.target.value,
                  })
                }
              />
              <select
                className="bg-gray-800 p-3 rounded-lg w-full"
                value={notification.recipient}
                onChange={(e) =>
                  setNotification({
                    ...notification,
                    recipient: e.target.value,
                  })
                }
              >
                <option value="all">All Users</option>
                <option value="employees">Employees</option>
                <option value="clients">Clients</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={handleSendNotification}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600"
              >
                <Send className="w-5 h-5" />
                Send Notification
              </button>
            </div>
          )}
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
