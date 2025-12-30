import AddProjectForm from "@/components/custom/AddProjectForm";
import DataTable from "@/components/custom/DataTable";
import { Card } from "@/components/ui/card";

export default function Page() {
  const columnName = [
    "Project Name",
    "Start Date",
    "End Date",
    "Budget",
    "Progress",
    "Status",
    "Actions",
  ];

  const tableData = [
    {
      projectName: "Website Redesign",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      budget: "$15,000",
      progress: "75",
      status: "In Progress",
    },
    {
      projectName: "Mobile App Development",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      budget: "$50,000",
      progress: "40",
      status: "In Progress",
    },
    {
      projectName: "Marketing Campaign",
      startDate: "2024-03-10",
      endDate: "2024-05-20",
      budget: "$10,000",
      progress: "100",
      status: "Completed",
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <div>
          <div className="text-2xl">Projects</div>
          <p className="my-3">View and Manage Your Project</p>
        </div>
        <AddProjectForm />
      </div>

      <Card className="p-2">
        <DataTable columnName={columnName} data={tableData} />
      </Card>
    </>
  );
}
