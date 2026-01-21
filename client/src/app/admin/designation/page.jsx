"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
} from "@/redux/features/designationSlice";
import { fetchDepartments } from "@/redux/features/departmentSlice";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { toast } from "sonner";

const formSchema = z.object({
  designation_name: z.string().min(1, { message: "Designation name is required" }),
  department_id: z.string().optional().nullable(),
});

export default function DesignationPage() {
  const dispatch = useDispatch();
  const { designations, status, error } = useSelector((state) => state.designations);
  const { departments } = useSelector((state) => state.departments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDesignation, setCurrentDesignation] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designation_name: "",
      department_id: "",
    },
  });

  useEffect(() => {
    dispatch(fetchDesignations());
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (isModalOpen && currentDesignation) {
      form.reset({
        designation_name: currentDesignation.designation_name,
        department_id: currentDesignation.department_id ? String(currentDesignation.department_id) : "",
      });
    } else if (isModalOpen && !currentDesignation) {
      form.reset({
        designation_name: "",
        department_id: "",
      });
    }
  }, [isModalOpen, currentDesignation, form]);

  const onSubmit = async (values) => {
    try {
      const designationData = {
        designation_name: values.designation_name,
        department_id: values.department_id ? parseInt(values.department_id) : null,
      };

      if (isEdit) {
        await dispatch(
          updateDesignation({
            designationId: currentDesignation.designation_id,
            designationData,
          })
        ).unwrap();
        toast.success("Designation updated successfully!");
      } else {
        await dispatch(addDesignation(designationData)).unwrap();
        toast.success("Designation added successfully!");
      }
      setIsModalOpen(false);
      setCurrentDesignation(null);
      form.reset();
      dispatch(fetchDesignations()); // Re-fetch to update table with latest data
    } catch (err) {
      toast.error(err.message || "Failed to save designation.");
    }
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setCurrentDesignation(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (designation) => {
    setIsEdit(true);
    setCurrentDesignation(designation);
    setIsModalOpen(true);
  };

  const handleDelete = async (designationId) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      try {
        await dispatch(deleteDesignation(designationId)).unwrap();
        toast.success("Designation deleted successfully!");
        dispatch(fetchDesignations());
      } catch (err) {
        toast.error(err.message || "Failed to delete designation.");
      }
    }
  };

  const getDepartmentName = (department_id) => {
    const dept = departments.find((d) => d.department_id === department_id);
    return dept ? dept.department_name : "N/A";
  };

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Designation" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Designation" />

        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Designations</h1>
              <p className="text-gray-400">Manage company designations</p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
                  onClick={handleAddClick}
                >
                  <FaPlus /> Add Designation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle>{isEdit ? "Edit Designation" : "Add Designation"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="designation_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Designation Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} className="bg-gray-700 border-gray-600 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="department_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Department</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""} // Ensure controlled component behavior
                          >
                            <FormControl className="bg-gray-700 border-gray-600 text-white">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-700 border-gray-600 text-white w-full">
                              {departments.map((dept) => (
                                <SelectItem key={dept.department_id} value={String(dept.department_id)}>
                                  {dept.department_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                        {isEdit ? "Save Changes" : "Add Designation"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <Table>
              <TableHeader className="bg-gray-700">
                <TableRow>
                  <TableHead className="p-4 text-sm font-semibold text-white">ID</TableHead>
                  <TableHead className="p-4 text-sm font-semibold text-white">Title</TableHead>
                  <TableHead className="p-4 text-sm font-semibold text-white">Department</TableHead>
                  <TableHead className="p-4 text-center text-sm font-semibold text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {status === "loading" ? (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center text-gray-400 py-4">
                      Loading designations...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center text-red-500 py-4">
                      Error: {error}
                    </TableCell>
                  </TableRow>
                ) : designations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center text-gray-400 py-4">
                      No designations found
                    </TableCell>
                  </TableRow>
                ) : (
                  designations.map((designation) => (
                    <TableRow key={designation.designation_id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="p-4 font-medium text-white">{designation.designation_id}</TableCell>
                      <TableCell className="p-4 text-white">{designation.designation_name}</TableCell>
                      <TableCell className="p-4 text-white">{designation.department_name}</TableCell>
                      <TableCell className="p-4 flex justify-center gap-4 text-lg text-gray-400">
                        <Button
                          title="Edit designation"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(designation)}
                          className="hover:text-blue-400"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          title="Delete designation"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(designation.designation_id)}
                          className="hover:text-red-500"
                        >
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}