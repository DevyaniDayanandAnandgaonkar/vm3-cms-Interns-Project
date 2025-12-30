import ProjectHistoryDataTable from "@/components/custom/ProjectHistoryDataTable";

export default function Page() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">History</h2>
        <p className="text-muted-foreground">View your activity history</p>
      </div>
      <ProjectHistoryDataTable />
    </>
  );
}
