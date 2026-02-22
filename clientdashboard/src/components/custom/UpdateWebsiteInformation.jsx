"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { updateClientWebsiteInfo } from "@/store/slices/clientProfileSlice";

export default function UpdateWebsiteInformation() {
  const dispatch = useDispatch();
  const { profileData, updating } = useSelector((state) => state.clientProfile);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleOpen = () => {
    reset({
      website_url: profileData?.website_url || "",
      domain_provider: profileData?.domain_provider || "",
      website_username: profileData?.website_username || "",
      website_password: profileData?.website_password || "",
      website_email: profileData?.website_email || "",
      otp_enabled: profileData?.otp_enabled ? true : false,
    });
    setOpen(true);
  };

  const onSubmit = async (data) => {
    // Convert otp_enabled checkbox to 1/0
    const payload = {
      ...data,
      otp_enabled: data.otp_enabled ? 1 : 0,
    };
    await dispatch(updateClientWebsiteInfo(payload));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          className="p-2 border-2 rounded-xl flex gap-2 items-center hover:bg-gray-200 cursor-pointer"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pen w-4 h-4 mr-2"
              aria-hidden="true"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            </svg>
          </div>
          <span>Edit</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Website Information</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Website URL</label>
              <input
                className="p-2 rounded-xl border-2 mb-4"
                type="text"
                {...register("website_url")}
                placeholder="Enter website url"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Domain Provider</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="text"
                  {...register("domain_provider")}
                  placeholder="Enter Domain Provider"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">User Id</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="text"
                  {...register("website_username")}
                  placeholder="Enter User Id"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Password</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="password"
                  {...register("website_password")}
                  placeholder="Enter password"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Email</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="email"
                  {...register("website_email")}
                  placeholder="Enter User email"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="otp_enabled"
                {...register("otp_enabled")}
                className="w-4 h-4"
              />
              <label htmlFor="otp_enabled" className="font-semibold">
                OTP Enabled
              </label>
            </div>

            <div className="flex gap-5">
              <input
                type="button"
                defaultValue="Cancel"
                className="p-2 rounded-xl border-2 cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <input
                type="submit"
                className="p-2 rounded-xl border-2 text-white bg-red-400 cursor-pointer disabled:opacity-50"
                defaultValue={updating ? "Saving..." : "Save Changes"}
                disabled={updating}
              />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
