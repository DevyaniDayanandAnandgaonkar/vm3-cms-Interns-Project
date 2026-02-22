"use client";
import { User, Mail, Phone, Building, Lock, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  fetchClientProfileData,
  updateClientBasicInfo,
  changeClientPassword,
  clearUpdateStatus,
} from '@/store/slices/clientProfileSlice';

export default function ClientSettings() {
  const dispatch = useDispatch();
  const { profileData, loading, updating, updateError, updateSuccess } = useSelector(
    (state) => state.clientProfile
  );

  const [profileForm, setProfileForm] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  });

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

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchClientProfileData());
  }, [dispatch]);

  // Populate form when profileData arrives
  useEffect(() => {
    if (profileData) {
      setProfileForm({
        company_name: profileData.company_name || profileData.client_name || '',
        contact_person: profileData.contact_person || profileData.contact_person_name || '',
        email: profileData.email || '',
        phone: profileData.phone || profileData.contact_no || '',
        address: profileData.address || '',
        website: profileData.website_url || '',
      });
    }
  }, [profileData]);

  // Show toast on update success/error
  useEffect(() => {
    if (updateSuccess) {
      toast.success(updateSuccess);
      dispatch(clearUpdateStatus());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearUpdateStatus());
    }
  }, [updateSuccess, updateError, dispatch]);

  const handleProfileUpdate = () => {
    dispatch(updateClientBasicInfo({
      company_name: profileForm.company_name,
      contact_person: profileForm.contact_person,
      email: profileForm.email,
      phone: profileForm.phone,
      address: profileForm.address,
    }));
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
    dispatch(changeClientPassword({
      current_password: passwordData.current_password,
      new_password: passwordData.new_password,
    }));
    setPasswordData({
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  const handleNotificationUpdate = () => {
    toast.success('Notification settings updated');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-200 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        <div className="p-12 bg-gray-800 rounded-md shadow text-center">
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-200 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="p-6 bg-gray-800 rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-gray-200">Profile Information</h2>
            <p className="text-gray-400">Update your company and contact details</p>
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
                  value={profileForm.company_name}
                  onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })}
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
                  value={profileForm.contact_person}
                  onChange={(e) => setProfileForm({ ...profileForm, contact_person: e.target.value })}
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
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
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
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
              rows={3}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              value={profileForm.website}
              onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleProfileUpdate} variant="default" disabled={updating}>
              {updating ? 'Saving...' : 'Save Profile Changes'}
            </Button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="p-6 bg-gray-800 rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 rounded-lg">
            <Lock className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-gray-200">Security</h2>
            <p className="text-gray-400">Change your password and security settings</p>
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
            <p className="text-gray-400">Password must be at least 8 characters long</p>
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
            <Button onClick={handlePasswordChange} variant="default" disabled={updating}>
              {updating ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="p-6 bg-gray-800 rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg">
            <Bell className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-gray-200">Notifications</h2>
            <p className="text-gray-400">Manage your notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-gray-200">Email Notifications</p>
              <p className="text-gray-400">Receive notifications via email</p>
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
              <p className="text-gray-200">Project Updates</p>
              <p className="text-gray-400">Get notified about project progress updates</p>
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
              <p className="text-gray-200">Status Changes</p>
              <p className="text-gray-400">Alerts when project status changes</p>
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
              <p className="text-gray-200">Budget Alerts</p>
              <p className="text-gray-400">Notifications when budget thresholds are reached</p>
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
              <p className="text-gray-200">Weekly Reports</p>
              <p className="text-gray-400">Receive weekly project summary reports</p>
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
            <Button onClick={handleNotificationUpdate} variant="default">Save Notification Settings</Button>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="p-6 bg-gray-800 rounded-md shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gray-100 rounded-lg">
            <Shield className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-gray-200">Account Information</h2>
            <p className="text-gray-400">View your account details</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-400">Account ID</span>
            <span className="text-gray-200">CLIENT-{profileData?.client_id?.toString().padStart(3, '0') || '---'}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-400">Status</span>
            <span className="text-gray-200">{profileData?.status || '---'}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-400">KYC Verified</span>
            <span className="text-gray-200">{profileData?.kyc_verified ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-400">Projects Count</span>
            <span className="text-gray-200">{profileData?.projects_count ?? 0} Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}