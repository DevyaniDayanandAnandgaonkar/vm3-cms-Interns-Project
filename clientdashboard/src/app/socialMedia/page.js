"use client";

import { useState } from "react";
import { 
  Share2, Instagram, Linkedin, Youtube, Twitter, 
  Eye, EyeOff, Pen, Trash2, Clock, CircleCheck, CircleX, Upload 
} from "lucide-react";


const ProfileCard = ({ profile, onDelete, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);

  
  const [isModalOpenSecound, setIsModalOpenSecound] = useState(false);
  const [isDropdownOpenSecound, setIsDropdownOpenSecound] = useState(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  
  const [selectedPlatform, setSelectedPlatform] = useState(profile.platform);
  const [selectedAccountType, setSelectedAccountType] = useState(profile.type);
  const [loginId, setLoginId] = useState(profile.loginId);
  const [password, setPassword] = useState(profile.password);
  
  const platforms = ["Instagram", "Facebook", "Twitter", "LinkedIn", "Youtube", "GMB (Google My Business)"];
  const accountTypes = ["Company", "Personal"];


  const updateProfile = () => {
    const updatedData = {
      ...profile,
      platform: selectedPlatform,
      type: selectedAccountType,
      loginId: loginId,
      password: password
    };
    
    
    onUpdate(profile.id, updatedData);
    
 
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
    <div className="bg-white flex flex-col gap-6 rounded-xl border border-gray-200 p-6 shadow-sm mb-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {style.icon}
            <h2 className="text-xl font-semibold text-gray-900">{profile.platform}</h2>
            <span className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
              {profile.type}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Login ID</label>
              <p className="text-gray-900 font-medium">{profile.loginId}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Password</label>
              <div className="flex items-center gap-2">
                <p className="text-gray-900 font-medium">
                  {showPassword ? profile.password : "••••••••••"}
                </p>
                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsModalOpenSecound(true)} className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            <Pen className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(profile.id)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-gray-700">Content Statistics</span>
          <span className="text-sm text-gray-500">Last post: Just now</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-600" /><div><p className="text-gray-900 font-bold">0</p><p className="text-xs text-gray-500 uppercase">Pending</p></div></div>
          <div className="flex items-center gap-2"><CircleCheck className="w-4 h-4 text-green-600" /><div><p className="text-gray-900 font-bold">0</p><p className="text-xs text-gray-500 uppercase">Approved</p></div></div>
          <div className="flex items-center gap-2"><CircleX className="w-4 h-4 text-red-600" /><div><p className="text-gray-900 font-bold">0</p><p className="text-xs text-gray-500 uppercase">Rejected</p></div></div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-black text-white hover:bg-gray-800 text-sm font-medium"><Upload className="w-4 h-4 mr-2" />Upload Post</button>
        </div>
      </div>

      
      {isModalOpenSecound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mx-4 overflow-visible relative">
            
           
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="text-xl font-medium">Edit Social Media Profile</h5>
              
              <button onClick={() => setIsModalOpenSecound(false)} className="text-gray-500 hover:text-gray-700 font-bold text-2xl leading-none">&times;</button>
            </div>

            
            <div className="p-4 space-y-4">
              
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <button
                  type="button"
                  onClick={() => { setIsDropdownOpenSecound(!isDropdownOpenSecound); setIsAccountTypeOpen(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-gray-500"
                >
                  {selectedPlatform} <span className="text-gray-500 text-xs">▼</span>
                </button>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <button
                  type="button"
                  onClick={() => { setIsAccountTypeOpen(!isAccountTypeOpen); setIsDropdownOpenSecound(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-gray-500"
                >
                  {selectedAccountType} <span className="text-gray-500 text-xs">▼</span>
                </button>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Login ID / Username</label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

          
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

           
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button onClick={() => setIsModalOpenSecound(false)} className="px-4 py-2 bg-white hover:bg-gray-100 text-black border-2 border-gray-300 rounded-lg">Close</button>
              
              <button onClick={updateProfile} className="px-4 py-2 bg-black hover:bg-gray-800 rounded text-white">Save Changes</button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};



export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram"); 
  const [selectedAccountType, setSelectedAccountType] = useState("Company"); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  
  const [profiles, setProfiles] = useState([]);

  const platforms = ["Instagram", "Facebook", "Twitter", "LinkedIn", "Youtube", "GMB (Google My Business)"];
  const accountTypes = ["Company", "Personal"];

  
  const handleAddProfile = () => {
    if (!loginId || !password) {
      alert("Please fill in Login ID and Password");
      return;
    }
    const newProfile = {
      id: Date.now(), 
      platform: selectedPlatform,
      type: selectedAccountType,
      loginId: loginId,
      password: password
    };
    setProfiles([...profiles, newProfile]);
    setLoginId("");
    setPassword("");
    setSelectedPlatform("Instagram");
    setIsModalOpen(false);
    alert("Profile Created Successfully!");
  };

  
  const handleDelete = (id) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };


  const handleUpdate = (id, updatedData) => {
    const newProfiles = profiles.map((profile) => 
      profile.id === id ? updatedData : profile
    );
    setProfiles(newProfiles);
  };

  return (
    <div className="">
      
     
      <div className="rounded-lg flex justify-between items-center mb-6">
        <div>
          <h1 className="font-semibold text-2xl">Social Media Profiles</h1>
          <p className="text-gray-600">Manage your social media accounts and content</p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <span className="pr-2">+</span> Add Profile
          </button>
        </div>
      </div>

     
      <div className="space-y-6">
        {profiles.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
            No profiles added yet. Click "+ Add Profile" to start.
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
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mx-4 overflow-visible relative">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="text-xl font-medium">Add Social Media Profile</h5>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 font-bold text-2xl leading-none">&times;</button>
            </div>
            <div className="p-4 space-y-4">
           
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <button type="button" onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsAccountTypeOpen(false); }} className="w-full p-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-gray-500">
                  {selectedPlatform} <span className="text-gray-500 text-xs">▼</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {platforms.map((platform) => (
                      <div key={platform} onClick={() => { setSelectedPlatform(platform); setIsDropdownOpen(false); }} className="cursor-pointer p-2 hover:bg-gray-100 mb-1 rounded-md text-gray-800">
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>
             
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <button type="button" onClick={() => { setIsAccountTypeOpen(!isAccountTypeOpen); setIsDropdownOpen(false); }} className="w-full p-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-gray-500">
                  {selectedAccountType} <span className="text-gray-500 text-xs">▼</span>
                </button>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Login ID / Username</label>
                <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Enter Login ID" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"/>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white hover:bg-gray-100 text-black border-2 border-gray-300 rounded-lg">Close</button>
              <button onClick={handleAddProfile} className="px-4 py-2 bg-black hover:bg-gray-800 rounded text-white">Add Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}