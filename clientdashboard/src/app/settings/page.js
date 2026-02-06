"use client";
import { User, Mail, Phone, Building, Lock, Bell, Shield } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

// Client profile data
const clientProfiles = {
  1: {
    company_name: 'Tech Corp Inc.',
    contact_person: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, New York, NY 10001',
    website: 'www.techcorp.com'
  },
  2: {
    company_name: 'Digital Solutions Ltd.',
    contact_person: 'Sarah Williams',
    email: 'sarah.williams@digitalsolutions.com',
    phone: '+1 (555) 234-5678',
    address: '456 Tech Avenue, San Francisco, CA 94102',
    website: 'www.digitalsolutions.com'
  },
  3: {
    company_name: 'Creative Agency',
    contact_person: 'Michael Brown',
    email: 'michael.brown@creativeagency.com',
    phone: '+1 (555) 345-6789',
    address: '789 Design Boulevard, Los Angeles, CA 90001',
    website: 'www.creativeagency.com'
  }
};

export default function ClientSettings(props) {
  const clientInfo = props?.clientInfo || { client_id: 1, client_name: 'Default' };
  const initialProfile = useMemo(() => {
    return clientProfiles[clientInfo.client_id] || clientProfiles[1];
  }, [clientInfo.client_id]);

  const [profileData, setProfileData] = useState(initialProfile);

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    project_updates: true,
    status_changes: true,
    budget_alerts: false,
    weekly_reports: true
  });

  const handleProfileUpdate = () => {
    // In a real application, this would save to backend
    toast.success('Profile updated successfully');
  };

  const handlePasswordChange = () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.new_password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    // In a real application, this would save to backend
    toast.success('Password changed successfully');
    setPasswordData({
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  const handleNotificationUpdate = () => {
    // In a real application, this would save to backend
    toast.success('Notification settings updated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="p-6 bg-white rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Profile Information</h2>
            <p className="text-gray-600">Update your company and contact details</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company_name">Company Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="company_name"
                  value={profileData.company_name}
                  onChange={(e) => setProfileData({ ...profileData, company_name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact_person">Contact Person</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="contact_person"
                  value={profileData.contact_person}
                  onChange={(e) => setProfileData({ ...profileData, contact_person: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              rows={3}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              value={profileData.website}
              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <button onClick={handleProfileUpdate} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Save Profile Changes
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="p-6 bg-white rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 rounded-lg">
            <Lock className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Security</h2>
            <p className="text-gray-600">Change your password and security settings</p>
          </div>
        </div>

        <div className="grid gap-6 max-w-xl">
          <div className="space-y-2">
            <label htmlFor="current_password">Current Password</label>
            <input
              id="current_password"
              type="password"
              value={passwordData.current_password}
              onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="new_password">New Password</label>
            <input
              id="new_password"
              type="password"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              placeholder="Enter new password"
            />
            <p className="text-gray-600">Password must be at least 8 characters long</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm_password">Confirm New Password</label>
            <input
              id="confirm_password"
              type="password"
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex justify-end">
            <button onClick={handlePasswordChange} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="p-6 bg-white rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg">
            <Bell className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Notifications</h2>
            <p className="text-gray-600">Manage your notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-gray-900">Email Notifications</p>
              <p className="text-gray-600">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.email_notifications}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, email_notifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-gray-900">Project Updates</p>
              <p className="text-gray-600">Get notified about project progress updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.project_updates}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, project_updates: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-gray-900">Status Changes</p>
              <p className="text-gray-600">Alerts when project status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.status_changes}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, status_changes: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-gray-900">Budget Alerts</p>
              <p className="text-gray-600">Notifications when budget thresholds are reached</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.budget_alerts}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, budget_alerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-gray-900">Weekly Reports</p>
              <p className="text-gray-600">Receive weekly project summary reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.weekly_reports}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, weekly_reports: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button onClick={handleNotificationUpdate} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="p-6 bg-white rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gray-100 rounded-lg">
            <Shield className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Account Information</h2>
            <p className="text-gray-600">View your account details</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">Account ID</span>
            <span className="text-gray-900">CLIENT-001</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">Account Type</span>
            <span className="text-gray-900">Premium Client</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600">Member Since</span>
            <span className="text-gray-900">January 2024</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600">Active Projects</span>
            <span className="text-gray-900">5 Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}