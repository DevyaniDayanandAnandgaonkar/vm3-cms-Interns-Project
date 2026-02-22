"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMediaPlatforms,
  addMediaPlatform,
  updateMediaPlatform,
  deleteMediaPlatform,
} from "@/store/slices/mediaPlatformSlice";
import {
  Share2, Instagram, Linkedin, Youtube, Twitter,
  Eye, EyeOff, Pen, Trash2, Clock, CircleCheck, CircleX, Upload
} from "lucide-react";
import { Button } from '@/components/ui/button';


const ProfileCard = ({ profile, onDelete, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);


  const [isModalOpenSecound, setIsModalOpenSecound] = useState(false);
  const [isDropdownOpenSecound, setIsDropdownOpenSecound] = useState(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);


  const [selectedPlatform, setSelectedPlatform] = useState(profile.platform);
  const [selectedAccountType, setSelectedAccountType] = useState(profile.account_type || "Company");
  const [loginId, setLoginId] = useState(profile.username);
  const [password, setPassword] = useState(profile.password);

  const platforms = ["Instagram", "Facebook", "Twitter", "LinkedIn", "Youtube", "GMB (Google My Business)"];
  const accountTypes = ["Company", "Personal"];


  const updateProfile = () => {
    onUpdate(profile.id, {
      platform: selectedPlatform,
      account_type: selectedAccountType,
      username: loginId,
      password: password,
    });

    setIsModalOpenSecound(false);
    alert("Changes Saved!");
  };


  const getPlatformStyle = (name) => {
    switch (name) {
      case "Facebook": return { icon: <Share2 className="w-5 h-5 text-blue-600" />, color: "text-blue-600" };
      case "Instagram": return { icon: <Instagram className="w-5 h-5 text-pink-600" />, color: "text-pink-600" };
      case "LinkedIn": return { icon: <Linkedin className="w-5 h-5 text-blue-700" />, color: "text-blue-700" };
      case "Twitter": return { icon: <Twitter className="w-5 h-5 text-sky-500" />, color: "text-sky-500" };
      case "Youtube": return { icon: <Youtube className="w-5 h-5 text-red-600" />, color: "text-red-600" };
      default: return { icon: <Share2 className="w-5 h-5 text-gray-600" />, color: "text-gray-600" };
    }
  };

  const style = getPlatformStyle(profile.platform);

  return (
    <div className="bg-gray-800 flex flex-col gap-6 rounded-xl border border-gray-700 p-6 shadow-sm mb-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {style.icon}
            <h2 className="text-xl font-semibold text-white">{profile.platform}</h2>
            <span className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
              {profile.account_type || "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <label className="text-sm text-white">Login ID</label>
              <p className="text-gray-300 font-medium">{profile.username}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-white">Password</label>
              <div className="flex items-center gap-2">
                <p className="text-gray-300 font-medium">
                  {showPassword ? profile.password : "••••••••••"}
                </p>
                <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsModalOpenSecound(true)} variant="ghost" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
            <Pen className="w-4 h-4" />
          </Button>
          <Button onClick={() => onDelete(profile.id)} variant="ghost" size="sm" className="h-8 w-8 p-0 flex items-center justify-center text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>




      {isModalOpenSecound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md mx-4 overflow-visible relative">


            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="text-xl font-medium">Edit Social Media Profile</h5>

              <Button onClick={() => setIsModalOpenSecound(false)} variant="ghost" className="text-gray-400 text-2xl">&times;</Button>
            </div>


            <div className="p-4 space-y-4">


              <div className="relative">
                <label className="block text-sm font-medium text-gray-200 mb-2">Platform</label>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => { setIsDropdownOpenSecound(!isDropdownOpenSecound); setIsAccountTypeOpen(false); }}
                  className="w-full p-2 text-left flex justify-between items-center"
                >
                  {selectedPlatform} <span className="text-gray-500 text-xs">▼</span>
                </Button>
                {isDropdownOpenSecound && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {platforms.map((platform) => (
                      <div key={platform} onClick={() => { setSelectedPlatform(platform); setIsDropdownOpenSecound(false); }} className="cursor-pointer p-2 hover:bg-gray-100 mb-1 rounded-md text-gray-800">
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <div className="relative">
                <label className="block text-sm font-medium text-gray-200 mb-2">Account Type</label>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => { setIsAccountTypeOpen(!isAccountTypeOpen); setIsDropdownOpenSecound(false); }}
                  className="w-full p-2 text-left flex justify-between items-center"
                >
                  {selectedAccountType} <span className="text-gray-500 text-xs">▼</span>
                </Button>
                {isAccountTypeOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2" style={{ scrollbarWidth: 'none' }}>
                    {accountTypes.map((item) => (
                      <div key={item} onClick={() => { setSelectedAccountType(item); setIsAccountTypeOpen(false); }} className="cursor-pointer p-2 hover:bg-gray-100 mb-1 rounded-md text-gray-800">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Login ID / Username</label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>


            <div className="flex justify-end gap-2 p-4 border-t bg-gray">
              <Button onClick={() => setIsModalOpenSecound(false)} variant="outline">Close</Button>
              <Button onClick={updateProfile} variant="success">Save Changes</Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};



export default function Page() {
  const dispatch = useDispatch();
  const { platforms: profiles, loading, error } = useSelector((state) => state.mediaPlatform);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [selectedAccountType, setSelectedAccountType] = useState("Company");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  const platformsList = ["Instagram", "Facebook", "Twitter", "LinkedIn", "Youtube", "GMB (Google My Business)"];
  const accountTypes = ["Company", "Personal"];

  // Fetch media platforms on mount
  useEffect(() => {
    dispatch(fetchMediaPlatforms());
  }, [dispatch]);


  const handleAddProfile = () => {
    if (!loginId || !password) {
      alert("Please fill in Login ID and Password");
      return;
    }
    dispatch(addMediaPlatform({
      platform: selectedPlatform,
      account_type: selectedAccountType,
      username: loginId,
      password: password,
    }));
    setLoginId("");
    setPassword("");
    setSelectedPlatform("Instagram");
    setSelectedAccountType("Company");
    setIsModalOpen(false);
    alert("Profile Created Successfully!");
  };


  const handleDelete = (id) => {
    dispatch(deleteMediaPlatform(id));
  };


  const handleUpdate = (id, updatedData) => {
    dispatch(updateMediaPlatform({ id, ...updatedData }));
  };

  return (
    <div className="">


      <div className="rounded-lg flex justify-between items-center mb-6">
        <div>
          <h1 className="font-semibold text-2xl">Social Media Profiles</h1>
          <p className="text-gray-600">Manage your social media accounts and content</p>
        </div>
        <div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <span className="pr-2">+</span> Add Profile
          </Button>
        </div>
      </div>


      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading profiles...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">{error}</div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-10 bg-gray-800 rounded-lg border border-dashed border-gray-700 text-gray-400">
            No profiles added yet. Click &quot;+ Add Profile&quot; to start.
          </div>
        ) : (
          profiles.map((profile) => (

            <ProfileCard
              key={profile.id}
              profile={profile}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mx-4 overflow-visible relative">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="text-xl font-medium">Add Social Media Profile</h5>
              <Button variant="ghost" className="text-gray-500 hover:text-gray-700 font-bold text-2xl leading-none" onClick={() => setIsModalOpen(false)}>&times;</Button>
            </div>
            <div className="p-4 space-y-4">

              <div className="relative">
                <label className="block text-sm font-medium text-white mb-2">Platform</label>
                <Button type="button" variant="outline" onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsAccountTypeOpen(false); }} className="w-full p-2 text-left flex justify-between items-center">
                  {selectedPlatform} <span className="text-white text-xs">▼</span>
                </Button>
                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {platformsList.map((platform) => (
                      <div key={platform} onClick={() => { setSelectedPlatform(platform); setIsDropdownOpen(false); }} className="cursor-pointer p-2 hover:bg-gray-100 mb-1 rounded-md text-gray-800">
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-white mb-2">Account Type</label>
                <Button type="button" variant="outline" onClick={() => { setIsAccountTypeOpen(!isAccountTypeOpen); setIsDropdownOpen(false); }} className="w-full p-2 text-left flex justify-between items-center">
                  {selectedAccountType} <span className="text-white text-xs">▼</span>
                </Button>
                {isAccountTypeOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2" style={{ scrollbarWidth: 'none' }}>
                    {accountTypes.map((item) => (
                      <div key={item} onClick={() => { setSelectedAccountType(item); setIsAccountTypeOpen(false); }} className="cursor-pointer p-2 hover:bg-gray-100 mb-1 rounded-md text-gray-800">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Login ID / Username</label>
                <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Enter Login ID" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-800">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button onClick={handleAddProfile}>Add Profile</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}