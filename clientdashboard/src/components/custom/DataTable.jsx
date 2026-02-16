"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Folder, Calendar, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "../ui/progress";
import { Button } from "@/components/ui/button";

/* -------------------- VIEW DIALOG -------------------- */

function ViewDialog({ data }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1">
          <Eye className="h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
          <DialogDescription>Detailed view of the project</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Project Name</h3>
              <p className="font-semibold">{data.projectName}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${data.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : data.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {data.status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <p>{data.startDate}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p>{data.endDate}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Progress</h3>
              <span className="text-sm font-semibold">{data.progress}%</span>
            </div>
            <Progress value={data.progress} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------- COLUMNS -------------------- */

function buildColumns(columnName) {
  return [
    {
      accessorKey: "projectName",
      header: columnName[0] || "Project Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-medium">
          <Folder className="h-4 w-4 text-blue-500" />
          {row.getValue("projectName")}
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: columnName[1] || "Start Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-500" />
          {row.getValue("startDate")}
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: columnName[2] || "Description",
    },
    {
      accessorKey: "progress",
      header: columnName[3] || "Progress",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 min-w-[120px]">
          <Progress value={row.getValue("progress")} className="flex-1" />
          <span className="text-xs font-medium text-muted-foreground w-8 text-right">
            {row.getValue("progress")}%
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: columnName[4] || "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: columnName[5] || "Actions",
      cell: ({ row }) => <ViewDialog data={row.original} />,
    },
  ];
}

/* -------------------- TABLE -------------------- */

export default function DataTable({ columnName, data }) {
  const columns = React.useMemo(() => buildColumns(columnName), [columnName]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="py-4">
        <Input
          placeholder="Filter by project name..."
          value={table.getColumn("projectName")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("projectName")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
