"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, deleteProjectAsync, addProjectAsync, updateProjectAsync } from "@/redux/features/projectSlice";
import { fetchClients } from "@/redux/features/clientSlice";
import { fetchCategories } from "@/redux/features/categorySlice";
import { fetchDepartments } from "@/redux/features/departmentSlice";
import { fetchEmployees } from "@/redux/features/employeeSlice";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog.jsx";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { projects, loading: projectsLoading, error: projectsError } = useSelector((state) => state.projects);
  const { clients, loading: clientsLoading } = useSelector((state) => state.clients);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  const { departments, loading: departmentsLoading } = useSelector((state) => state.departments);
  const { employees, loading: employeesLoading } = useSelector((state) => state.employees);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);


  const isLoading = projectsLoading || clientsLoading || categoriesLoading || departmentsLoading || employeesLoading;

  const addForm = useForm({
    defaultValues: {
      project_name: "",
      description: "",
      category_id: "",
      client_id: "",
      department_id: "",
      assigned_to: "",
      status: "New Project",
    },
  });

  const editForm = useForm({
    defaultValues: {
      project_name: "",
      description: "",
      category_id: "",
      client_id: "",
      department_id: "",
      assigned_to: "",
      status: "New Project",
      Progress: "",
    },
  });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
    dispatch(fetchCategories());
    dispatch(fetchDepartments());
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (!isAddProjectDialogOpen) {
      addForm.reset();
    }
  }, [isAddProjectDialogOpen, addForm]);

  useEffect(() => {
    if (!isEditProjectDialogOpen) {
      editForm.reset();
      setCurrentProject(null);
    } else if (currentProject) {
      editForm.reset({
        project_name: currentProject.project_name || "",
        description: currentProject.description || "",
        category_id: String(currentProject.category_id) || "",
        client_id: String(currentProject.client_id) || "",
        department_id: String(currentProject.department_id) || "",
        assigned_to: String(currentProject.assigned_to) || "",
        status: currentProject.status || "New Project",
        Progress: currentProject.Progress || 0,
      });
    }
  }, [isEditProjectDialogOpen, currentProject, editForm]);


  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProjectAsync(id));
    }
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsEditProjectDialogOpen(true);
  };

  const onAddSubmit = async (values) => {
    const projectData = {
      ...values,
      category_id: parseInt(values.category_id) || null,
      client_id: parseInt(values.client_id) || null,
      department_id: parseInt(values.department_id) || null,
      assigned_to: parseInt(values.assigned_to) || null,
      created_by: 1, // Placeholder for now
    };
    await dispatch(addProjectAsync(projectData));
    setIsAddProjectDialogOpen(false);
    dispatch(fetchProjects());
  };

  const onEditSubmit = async (values) => {
    const projectData = {
      project_id: currentProject.project_id,
      ...values,
      category_id: parseInt(values.category_id) || null,
      client_id: parseInt(values.client_id) || null,
      department_id: parseInt(values.department_id) || null,
      assigned_to: parseInt(values.assigned_to) || null,
      Progress: parseInt(values.Progress) || 0,
      created_by: currentProject.created_by,
    };
    await dispatch(updateProjectAsync(projectData));
    setIsEditProjectDialogOpen(false);
    dispatch(fetchProjects());
  };

  return (
    <div className="flex bg-black min-h-screen">

      {/* SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar currentPage="Projects" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Projects" />

        {/* MAIN CONTENT */}
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-gray-400 mt-1">
                Manage all company projects
              </p>
            </div>

            {/* RED BUTTON (same style as Employees page) */}
            <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow">
                  <FaPlus className="inline-block mr-2" />
                  Add Project
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Form {...addForm}>
                    <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                      <FormField
                        control={addForm.control}
                        name="project_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Project Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Project Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="category_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="__placeholder_category" disabled>Select a category</SelectItem>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={String(category.id)}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="client_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="__placeholder_client" disabled>Select a client</SelectItem>
                                {clients.map((client) => (
                                  <SelectItem key={client.client_id} value={String(client.client_id)}>
                                    {client.client_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="department_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="__placeholder_department" disabled>Select a department</SelectItem>
                                {departments.map((department) => (
                                  <SelectItem key={department.department_id} value={String(department.department_id)}>
                                    {department.department_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="assigned_to"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assigned To</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select an employee" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="__placeholder_employee" disabled>Select an employee</SelectItem>
                                {employees.map((employee) => (
                                  <SelectItem key={employee.emp_id} value={String(employee.emp_id)}>
                                    {employee.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="New Project">New Project</SelectItem>
                                <SelectItem value="Working">Working</SelectItem>
                                <SelectItem value="On Hold">On Hold</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Project"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Project Dialog */}
            {currentProject && (
              <Dialog open={isEditProjectDialogOpen} onOpenChange={setIsEditProjectDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>
                      Edit the details of the project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                        <FormField
                          control={editForm.control}
                          name="project_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Project Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Project Description" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="category_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                                                          <Select onValueChange={field.onChange} value={field.value || ""}>
                                                            <FormControl>
                                                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                                                <SelectValue placeholder="Select a category" />
                                                              </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                              <SelectItem value="__placeholder_category" disabled>Select a category</SelectItem>
                                                              {categories.map((category) => (
                                                                <SelectItem key={category.id} value={String(category.id)}>
                                                                  {category.name}
                                                                </SelectItem>
                                                              ))}
                                                            </SelectContent>
                                                          </Select>                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="client_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client</FormLabel>
                                                          <Select onValueChange={field.onChange} value={field.value || ""}>
                                                            <FormControl>
                                                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                                                <SelectValue placeholder="Select a client" />
                                                              </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                              <SelectItem value="__placeholder_client" disabled>Select a client</SelectItem>
                                                              {clients.map((client) => (
                                                                <SelectItem key={client.client_id} value={String(client.client_id)}>
                                                                  {client.client_name}
                                                                </SelectItem>
                                                              ))}
                                                            </SelectContent>
                                                          </Select>                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="department_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department</FormLabel>
                                                          <Select onValueChange={field.onChange} value={field.value || ""}>
                                                            <FormControl>
                                                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                                                <SelectValue placeholder="Select a department" />
                                                              </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                              <SelectItem value="__placeholder_department" disabled>Select a department</SelectItem>
                                                              {departments.map((department) => (
                                                                <SelectItem key={department.department_id} value={String(department.department_id)}>
                                                                  {department.department_name}
                                                                </SelectItem>
                                                              ))}
                                                            </SelectContent>
                                                          </Select>                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="assigned_to"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assigned To</FormLabel>
                                                          <Select onValueChange={field.onChange} value={field.value || ""}>
                                                            <FormControl>
                                                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                                                <SelectValue placeholder="Select an employee" />
                                                              </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                              <SelectItem value="__placeholder_employee" disabled>Select an employee</SelectItem>
                                                              {employees.map((employee) => (
                                                                <SelectItem key={employee.emp_id} value={String(employee.emp_id)}>
                                                                  {employee.name}
                                                                </SelectItem>
                                                              ))}
                                                            </SelectContent>
                                                          </Select>                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue placeholder="Select a status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-800 text-white border-gray-700">
                                  <SelectItem value="New Project">New Project</SelectItem>
                                  <SelectItem value="Working">Working</SelectItem>
                                  <SelectItem value="On Hold">On Hold</SelectItem>
                                  <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="Progress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Progress</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter progress (0-100)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Updating..." : "Update Project"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* TABLE */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold">Project Name</th>
                  <th className="p-4 text-sm font-semibold">Client</th>
                  <th className="p-4 text-sm font-semibold">Category</th>
                  <th className="p-4 text-sm font-semibold">Assigned To</th>
                  <th className="p-4 text-sm font-semibold">Department</th>
                  <th className="p-4 text-sm font-semibold">Progress</th>
                  <th className="p-4 text-sm font-semibold">Status</th>
                  <th className="p-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center p-5 text-gray-400">
                      Loading projects...
                    </td>
                  </tr>
                ) : projectsError ? (
                  <tr>
                    <td colSpan="8" className="text-center p-5 text-red-400">
                      Error: {projectsError}
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <tr
                      key={project.project_id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      {/* Project Name */}
                      <td className="p-4 font-medium text-white">
                        {project.project_name}
                      </td>

                      {/* Client */}
                      <td className="p-4 text-gray-300">
                        {clients.find(c => c.client_id === project.client_id)?.client_name || project.client_id}
                      </td>

                      {/* Category */}
                      <td className="p-4 text-gray-400">
                        {categories.find(cat => cat.id === project.category_id)?.name || project.category_id}
                      </td>

                      {/* Assigned To */}
                      <td className="p-4 text-gray-300">
                        {employees.find(emp => emp.emp_id === project.assigned_to)?.name || project.assigned_to}
                      </td>

                      {/* Department */}
                      <td className="p-4 text-gray-300">
                        {departments.find(dep => dep.department_id === project.department_id)?.department_name || project.department_id}
                      </td>

                      {/* Progress */}
                      <td className="p-4 w-32">
                        <div className="flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-300">
                            {project.Progress ?? 0}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            project.status === "Completed"
                              ? "bg-green-600/20 text-green-400"
                              : project.status === "Working"
                              ? "bg-blue-600/20 text-blue-400"
                              : project.status === "On Hold"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : "bg-gray-600/20 text-gray-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 flex justify-center gap-5 text-xl">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="hover:text-blue-400"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDeleteProject(project.project_id)}
                          className="hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-5 text-gray-400">
                      No projects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
