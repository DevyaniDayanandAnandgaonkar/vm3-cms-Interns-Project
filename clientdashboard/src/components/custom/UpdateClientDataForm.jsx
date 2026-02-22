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
import { updateClientBasicInfo } from "@/store/slices/clientProfileSlice";

export default function UpdateClientDataForm() {
  const dispatch = useDispatch();
  const { profileData, updating } = useSelector((state) => state.clientProfile);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleOpen = () => {
    // Pre-fill with current data when dialog opens
    reset({
      company_name: profileData?.company_name || profileData?.client_name || "",
      contact_person: profileData?.contact_person || profileData?.contact_person_name || "",
      phone: profileData?.contact_no || profileData?.phone || "",
      email: profileData?.email || "",
      address: profileData?.address || "",
    });
    setOpen(true);
  };

  const onSubmit = async (data) => {
    await dispatch(updateClientBasicInfo(data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={handleOpen}
          className="p-2 border-2 rounded-xl flex gap-2 items-center hover:bg-gray-100 cursor-pointer"
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
          <p>Edit</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Basic Information</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Company Name</label>
              <input
                className="p-2 rounded-xl border-2 mb-4"
                type="text"
                {...register("company_name")}
                placeholder="Enter Company Name"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Contact Person</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="text"
                  {...register("contact_person")}
                  placeholder="Enter Contact Person"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Phone Number</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="text"
                  {...register("phone")}
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Email Address</label>
              <input
                className="p-2 rounded-xl border-2 mb-4"
                type="email"
                {...register("email")}
                placeholder="Enter Email Address"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Address</label>
              <textarea
                className="p-2 rounded-xl border-2 mb-4"
                {...register("address")}
                placeholder="Enter Address"
              />
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
