"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
export default function AddProjectForm() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <Dialog className="w-fit">
      <DialogTrigger>
        <div className="bg-red-600 text-white px-4 py-2 rounded-md">
          + Add Project Request
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request New Project</DialogTitle>
          <p>
            Submit a new project request. Our team will review and get back to
            you.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Project Name</label>
              <input
                className="p-2 rounded-xl mb-4"
                type="text"
                {...register("firstName")}
                placeholder="Enter Project Name"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Start Date</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="date"
                  {...register("startDate")}
                  placeholder="Select Start Date"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">End Date</label>
                <input
                  className="p-2 rounded-xl border-2 mb-4"
                  type="date"
                  {...register("endDate")}
                  placeholder="Select End Date"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Budget $</label>
              <input
                className="p-2 rounded-xl border-2 mb-4"
                type="number"
                {...register("budget")}
                placeholder="Enter Budget"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Project Description</label>
              <textarea
                className="p-2 rounded-xl border-2 mb-4"
                {...register("description")}
                placeholder="Enter Project Description"
              />
            </div>
            <div className="flex gap-5">
              <input
                type="button"
                defaultValue="Cancel"
                className="p-2 rounded-xl border-2"
              />
              <input
                type="submit"
                className="p-2 rounded-xl border-2 text-white bg-red-400"
                defaultValue="Submit Requests"
              />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
