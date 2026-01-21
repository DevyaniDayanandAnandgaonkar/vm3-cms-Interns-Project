 "use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit2,
  Save,
  X,
} from "lucide-react";

export default function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    employeeId: "EMP-2024-1234",
    joinDate: "2022-03-15",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="p-8 bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-100">Profile</h2>
            <p className="text-gray-400">
              Manage your personal information
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          {/* Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-400 h-32" />

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex items-end gap-6 -mt-16 mb-6">
              <div className="w-32 h-32 bg-gray-900 rounded-full border-4 border-gray-900 shadow-lg flex items-center justify-center">
                <User className="w-16 h-16 text-gray-500" />
              </div>
              <div className="pb-4">
                <h3 className="text-2xl font-semibold text-gray-100">
                  {profile.name}
                </h3>
                <p className="text-gray-400">{profile.position}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reusable Field */}
                {[
                  { label: "Full Name", key: "name", icon: User },
                  { label: "Email", key: "email", icon: Mail },
                  { label: "Phone", key: "phone", icon: Phone },
                  { label: "Location", key: "location", icon: MapPin },
                  { label: "Department", key: "department", icon: Briefcase },
                  { label: "Position", key: "position", icon: Briefcase },
                ].map(({ label, key, icon: Icon }) => (
                  <div key={key}>
                    <label className="block text-sm text-gray-400 mb-2">
                      {label}
                    </label>

                    {isEditing ? (
                      <input
                        value={editedProfile[key]}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-3 text-gray-200">
                        <Icon className="w-5 h-5 text-gray-500" />
                        <span>{profile[key]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Employment Info */}
              <div className="pt-6 border-t border-gray-800">
                <h4 className="font-semibold text-gray-200 mb-4">
                  Employment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div>
                    <span className="text-sm text-gray-500">Employee ID</span>
                    <div>{profile.employeeId}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Join Date</span>
                    <div>
                      {new Date(profile.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
