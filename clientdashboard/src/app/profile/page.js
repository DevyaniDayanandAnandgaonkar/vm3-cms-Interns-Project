"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProfileData } from "@/store/slices/clientProfileSlice";
import ClientBrandingAssets from "@/components/custom/ClientBrandingAssets";
import ClientInfo from "@/components/custom/ClientInfo";
import ClientKYC from "@/components/custom/ClientKYC";
import ClientWebsiteInformation from "@/components/custom/ClientWebsiteInformation";

export default function Page() {
  const dispatch = useDispatch();
  const { profileData, loading, error } = useSelector(
    (state) => state.clientProfile
  );

  useEffect(() => {
    dispatch(fetchClientProfileData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl">Client Profile</h1>
      <p>Manage your company information and branding assets</p>
      <ClientInfo data={profileData} />
      <ClientKYC data={profileData} />
      <ClientBrandingAssets data={profileData} />
      <ClientWebsiteInformation data={profileData} />
    </div>
  );
}
