"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Calendar, Clock, Folder, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* -------------------- DATA -------------------- */

const data = [
  {
    id: "1",
    project: "CRM System",
    department: "Development",
    action: "Project Initiated",
    performedBy: "Rahul Sharma",
    date: "12 Jan 2025",
    time: "10:30 AM",
    description: "Initial project setup completed",
  },
  {
    id: "2",
    project: "Portfolio Website",
    department: "Design",
    action: "Status Updated",
    performedBy: "Anita Verma",
    date: "13 Jan 2025",
    time: "02:15 PM",
    description: "UI wireframes finalized",
  },
  {
    id: "3",
    project: "Marketing Dashboard",
    department: "Marketing",
    action: "Department Transfer",
    performedBy: "Suresh Patil",
    date: "14 Jan 2025",
    time: "11:00 AM",
    description: "Project moved to marketing team",
  },
  {
    id: "4",
    project: "HR Portal",
    department: "Development",
    action: "Status Updated",
    performedBy: "Neha Joshi",
    date: "15 Jan 2025",
    time: "04:45 PM",
    description: "Backend API integration done",
  },
  {
    id: "5",
    project: "E-Commerce App",
    department: "Design",
    action: "Project Initiated",
    performedBy: "Amit Kulkarni",
    date: "16 Jan 2025",
    time: "09:20 AM",
    description: "Design phase started",
  },
  {
    id: "6",
    project: "Lead Tracker",
    department: "Marketing",
    action: "Status Updated",
    performedBy: "Priya Deshmukh",
    date: "17 Jan 2025",
    time: "06:10 PM",
    description: "Campaign analytics updated",
  },
];

/* -------------------- COLUMNS -------------------- */

const columns = [
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <Folder className="h-4 w-4 text-blue-500" />
        {row.getValue("project")}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "performedBy",
    header: "Performed By",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-green-600" />
        {row.getValue("performedBy")}
      </div>
    ),
  },
  {
    id: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => (
      <div className="flex flex-col text-sm">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-purple-500" />
          {row.original.date}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4 text-orange-500" />
          {row.original.time}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

/* -------------------- TABLE -------------------- */

export default function ProjectHistoryDataTable() {
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
          placeholder="Filter by project..."
          value={table.getColumn("project")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("project")?.setFilterValue(e.target.value)
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* -------------------- PAGE -------------------- */
