"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "@/store/slices/dashboardSlice";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Home() {
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const counts = summary?.projectCounts || {};
  const postCounts = summary?.postCounts || {};
  const projectsByCategory = summary?.projectsByCategory || [];
  const recentProjects = summary?.recentProjects || [];

  const cardData = [
    {
      svg: (
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
          className="lucide lucide-folder-kanban w-6 h-6 text-blue-600"
          aria-hidden="true"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
          <path d="M8 10v4"></path>
          <path d="M12 10v2"></path>
          <path d="M16 10v6"></path>
        </svg>
      ),
      label: "Total Projects",
      bg: "bg-blue-100",
      count: counts.total_projects ?? 0,
    },
    {
      svg: (
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
          className="lucide lucide-clock w-6 h-6 text-yellow-600"
          aria-hidden="true"
        >
          <path d="M12 6v6l4 2"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
      label: "Pending Tasks",
      bg: "bg-yellow-100",
      count: counts.pending_tasks ?? 0,
    },
    {
      svg: (
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
          className="lucide lucide-circle-check-big w-6 h-6 text-green-600"
          aria-hidden="true"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
      label: "Completed Tasks",
      bg: "bg-green-100",
      count: counts.completed_tasks ?? 0,
    },
    {
      svg: (
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
          className="lucide lucide-circle-alert w-6 h-6 text-red-600"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
      ),
      label: "On Hold",
      bg: "bg-red-100",
      count: counts.on_hold_tasks ?? 0,
    },
  ];

  const reportData = [
    {
      svg: (
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
          className="lucide lucide-chart-no-axes-column-increasing w-5 h-5 text-gray-700"
          aria-hidden="true"
        >
          <path d="M5 21v-6"></path>
          <path d="M12 21V9"></path>
          <path d="M19 21V3"></path>
        </svg>
      ),
      title: "Baseline Report",
      text: "Initial Performance Metrics and Benchmarks for your project social media presence.",
    },
    {
      svg: (
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
          className="lucide lucide-file-text w-5 h-5 text-gray-700"
          aria-hidden="true"
        >
          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
          <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      ),
      title: "Monthly Report",
      text: "Comprehensive monthly performance report including project progress, social media analytics and engagement metrics.",
    },
  ];

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Button onClick={() => dispatch(fetchDashboardSummary())}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-lg">Client Dashboard</h1>
      <p>Welcome Back! Here's an overview of your Projects</p>

      {/* ============================ CARD ==================== */}
      <div className="flex gap-5">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            svg={card.svg}
            label={card.label}
            bg={card.bg}
            count={card.count}
          />
        ))}
      </div>

      {/* project by type */}
      <div className="h-fit w-full border rounded-xl mt-10 p-5 bg-gray-800">
        <div className="flex gap-2">
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
              className="lucide lucide-folder-kanban w-5 h-5 text-gray-700"
              aria-hidden="true"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
              <path d="M8 10v4"></path>
              <path d="M12 10v2"></path>
              <path d="M16 10v6"></path>
            </svg>
          </div>

          <p className=" text-white mb-2">Project By Type</p>
        </div>

        <div className="flex gap-5 mt-10 flex-wrap">
          {projectsByCategory.length > 0 ? (
            projectsByCategory.map((cat, index) => (
              <div key={index} className="flex gap-45 border p-5 rounded-xl">
                <p>{cat.category_name || "Uncategorized"}</p>
                <p className="bg-gray-700 rounded-2xl p-1">
                  {cat.project_count} Project{cat.project_count !== 1 ? "s" : ""}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No projects yet</p>
          )}
        </div>
      </div>

      {/* report card */}
      <div className="flex gap-2">
        {reportData.map((report, index) => (
          <ReportCard
            key={index}
            svg={report.svg}
            title={report.title}
            text={report.text}
          />
        ))}
      </div>

      {/* progress cards */}
      <Card className="mt-5 w-full">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <ProgressCard
                key={project.project_id}
                project_name={project.project_name}
                status={project.status}
                progress={project.progress}
              />
            ))
          ) : (
            <p className="text-gray-400 py-4">No projects yet</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function DashboardCard({ svg, label, bg, count }) {
  return (
    <Card className="mt-5 w-85 ">
      <CardHeader>
        <CardTitle>{svg}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{label}</p>
      </CardContent>
      <CardFooter>
        <p className="text-2xl font-bold">{count}</p>
      </CardFooter>
    </Card>
  );
}

function ReportCard({ svg, title, text }) {
  return (
    <Card className="mt-5 w-[50%]">
      <CardHeader>
        <CardTitle className="flex gap-2">
          {svg} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{text}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button>Download Report</Button>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}

function ProgressCard({ project_name, status, progress }) {
  return (
    <Card className="mt-5 w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project_name}</CardTitle>
          <CardTitle
            className={`${status === "Completed"
                ? "bg-green-400 p-2 rounded-2xl"
                : status === "On Hold"
                  ? "bg-red-400 p-2 rounded-2xl"
                  : "bg-blue-400 p-2 rounded-2xl"
              }`}
          >
            {status}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p>Progress</p>
          <p>{progress}%</p>
        </div>
        <Progress value={progress} className="w-full mt-2" />
      </CardContent>
    </Card>
  );
}
