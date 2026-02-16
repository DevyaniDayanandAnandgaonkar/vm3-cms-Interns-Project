"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProjects } from "@/store/slices/projectSlice";
import AddProjectForm from "@/components/custom/AddProjectForm";
import DataTable from "@/components/custom/DataTable";
import { Card } from "@/components/ui/card";

export default function Page() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchClientProjects());
  }, [dispatch]);

  const columnName = [
    "Project Name",
    "Start Date",
    "Description",
    "Progress",
    "Status",
    "Actions",
  ];

  // Map API data to the format DataTable expects
  const tableData = projects.map((p) => ({
    projectName: p.project_name,
    startDate: p.created_at ? new Date(p.created_at).toLocaleDateString() : "—",
    endDate: p.description || "—",
    budget: "—",
    progress: p.Progress || 0,
    status: p.status,
  }));

  return (
    <>
      <div className="flex justify-between">
        <div>
          <div className="text-2xl">Projects</div>
          <p className="my-3">View and Manage Your Project</p>
        </div>
        <AddProjectForm />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-400">Loading projects...</div>
      )}

      {/* No projects */}
      {!loading && !error && projects.length === 0 && (
        <div className="text-center py-10 text-gray-400">No projects found for your account.</div>
      )}

      {/* Data table */}
      {!loading && projects.length > 0 && (
        <Card className="p-2">
          <DataTable columnName={columnName} data={tableData} />
        </Card>
      )}
    </>
  );
}
