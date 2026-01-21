import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

export default function Home() {
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
      label: "Pending Tasks",
      bg: "bg-red-100",
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
      text: "comprehensive monthly performance report including project progress,social media analytics and engagement metrics.",
    },
  ];

  const projectProgressData = [
    {
      project_name: "Website Redesign",
      status: "In Progress",
      date: "2024-08-15 to 2024-10-15",
      progress: "75",
    },
    {
      project_name: "SEO Optimization",
      status: "Completed",
      date: "2024-05-01 to 2024-07-31",
      progress: "100",
    },
    {
      project_name: "E-Commerce Platform",
      status: "In Progress",
      date: "2024-09-01 to 2024-12-01",
      progress: "30",
    },
  ];
  return (
    <>
      <h1 className="text-lg">Client Dashboard</h1>
      <p>Welcome Back, Tech Corp Inc..! Here's an overview of your Project</p>

      {/* ============================ CARD ==================== */}
      <div className="flex gap-5">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            svg={card.svg}
            label={card.label}
            bg={card.bg}
          />
        ))}
      </div>

      {/* project by type */}

      <div className="h-fit w-full border rounded-xl mt-10 p-5 bg-white">
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

          <p className=" text-gray-600 mb-2">Project By Type</p>
        </div>

        <div className="flex gap-5 mt-10 ">
          <div className="flex gap-45 border p-5 rounded-xl">
            <p>Development</p>
            <p className="bg-gray-200 rounded-2xl  p-1">2 Projects</p>
          </div>
          <div className="flex gap-45 border p-5 rounded-xl">
            <p>Degital Marketing</p>
            <p className="bg-gray-200 rounded-2xl  p-1">1 Project</p>
          </div>
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
          {projectProgressData.map((project, index) => (
            <ProgressCard
              key={index}
              project_name={project.project_name}
              status={project.status}
              date={project.date}
              progress={project.progress}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function DashboardCard({ svg, label, bg }) {
  return (
    <Card className="mt-5 w-85 ">
      <CardHeader>
        <CardTitle>{svg}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{label}</p>
      </CardContent>
      <CardFooter>
        <p>{4}</p>
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
        <button className="bg-black text-white p-2 border rounded-xl">
          Download Report
        </button>
        <button className="border hover:bg-gray-100 p-2 rounded-xl">
          View Details
        </button>
      </CardFooter>
    </Card>
  );
}

function ProgressCard({ project_name, status, date, progress }) {
  return (
    <Card className="mt-5 w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project_name}</CardTitle>
          <CardTitle
            className={`${
              status === "In Progress"
                ? " bg-blue-400 p-2 rounded-2xl"
                : "bg-green-400  p-2 rounded-2xl"
            }`}
          >
            {status}
          </CardTitle>
        </div>
        <CardTitle>{date}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p>progress</p>
          <p>{progress}%</p>
        </div>
        <Progress value={progress} className="w-full mt-2" />
      </CardContent>
    </Card>
  );
}
