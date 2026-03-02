"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTaskAsync, deleteTaskAsync } from "@/redux/features/taskSlice";
import { fetchEmployees } from "@/redux/features/employeeSlice";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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

export default function TasksPage() {
    const dispatch = useDispatch();
    const { tasks, loading: tasksLoading, error: tasksError } = useSelector((state) => state.tasks);
    const { employees, loading: employeesLoading } = useSelector((state) => state.employees);
    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
    const [selectedAssignees, setSelectedAssignees] = useState([]);

    const isLoading = tasksLoading || employeesLoading;

    const addForm = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: "Low",
            due_date: "",
        },
    });

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchEmployees());
    }, [dispatch]);

    useEffect(() => {
        if (!isAddTaskDialogOpen) {
            addForm.reset();
            setSelectedAssignees([]);
        }
    }, [isAddTaskDialogOpen, addForm]);

    const handleDeleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTaskAsync(id)).then(() => dispatch(fetchTasks()));
        }
    };

    const toggleAssignee = (empId) => {
        setSelectedAssignees((prev) =>
            prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]
        );
    };

    const onAddSubmit = async (values) => {
        const taskData = {
            title: values.title,
            description: values.description,
            priority: values.priority,
            due_date: values.due_date || null,
            assigned_to: selectedAssignees,
        };
        await dispatch(createTaskAsync(taskData));
        setIsAddTaskDialogOpen(false);
        dispatch(fetchTasks());
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-600/20 text-red-400";
            case "Medium":
                return "bg-yellow-600/20 text-yellow-400";
            case "Low":
            default:
                return "bg-blue-600/20 text-blue-400";
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-600/20 text-green-400";
            case "inprogress":
                return "bg-blue-600/20 text-blue-400";
            case "pending":
            default:
                return "bg-yellow-600/20 text-yellow-400";
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="flex bg-black min-h-screen">
            {/* SIDEBAR */}
            <div className="hidden md:flex">
                <Sidebar currentPage="Tasks" />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 ml-0 md:ml-64">
                <Topbar title="Tasks" />

                {/* MAIN CONTENT */}
                <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Tasks</h1>
                            <p className="text-gray-400 mt-1">
                                Assign and manage employee tasks
                            </p>
                        </div>

                        {/* Add Task Button */}
                        <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
                            <DialogTrigger asChild>
                                <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow">
                                    <FaPlus className="inline-block mr-2" />
                                    Create Task
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] bg-gray-800 text-white border-gray-700">
                                <DialogHeader>
                                    <DialogTitle>Create New Task</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details for the new task.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
                                    <Form {...addForm}>
                                        <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                                            <FormField
                                                control={addForm.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Task Title" {...field} />
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
                                                            <Textarea placeholder="Task Description" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={addForm.control}
                                                name="priority"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Priority</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                                                    <SelectValue placeholder="Select priority" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                                <SelectItem value="Low">Low</SelectItem>
                                                                <SelectItem value="Medium">Medium</SelectItem>
                                                                <SelectItem value="High">High</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={addForm.control}
                                                name="due_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Due Date</FormLabel>
                                                        <FormControl>
                                                            <Input type="date" {...field} className="bg-gray-700 border-gray-600" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Multi-select Assignees */}
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">
                                                    Assign To
                                                </label>
                                                <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                                                    {employees.map((emp) => (
                                                        <label
                                                            key={emp.emp_id}
                                                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-600/50 p-1.5 rounded"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedAssignees.includes(emp.emp_id)}
                                                                onChange={() => toggleAssignee(emp.emp_id)}
                                                                className="rounded border-gray-500 text-red-500 focus:ring-red-500"
                                                            />
                                                            <span className="text-sm text-gray-200">
                                                                {emp.name}
                                                                {emp.employee_id && (
                                                                    <span className="text-gray-400 ml-1">({emp.employee_id})</span>
                                                                )}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {selectedAssignees.length > 0 && (
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {selectedAssignees.length} employee(s) selected
                                                    </p>
                                                )}
                                            </div>

                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                {isLoading ? "Creating..." : "Create Task"}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* TABLE */}
                    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
                        <table className="w-full text-left">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-4 text-sm font-semibold">Title</th>
                                    <th className="p-4 text-sm font-semibold">Description</th>
                                    <th className="p-4 text-sm font-semibold">Priority</th>
                                    <th className="p-4 text-sm font-semibold">Status</th>
                                    <th className="p-4 text-sm font-semibold">Due Date</th>
                                    <th className="p-4 text-sm font-semibold">Assigned To</th>
                                    <th className="p-4 text-sm font-semibold">Progress</th>
                                    <th className="p-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tasksLoading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-gray-400">
                                            Loading tasks...
                                        </td>
                                    </tr>
                                ) : tasksError ? (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-red-400">
                                            Error: {tasksError}
                                        </td>
                                    </tr>
                                ) : tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <tr
                                            key={task.id}
                                            className="border-b border-gray-700 hover:bg-gray-700/50"
                                        >
                                            <td className="p-4 font-medium text-white">
                                                {task.title}
                                            </td>
                                            <td className="p-4 text-gray-400 max-w-[200px] truncate">
                                                {task.description || "-"}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm ${getPriorityBadge(task.priority)}`}
                                                >
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadge(task.status)}`}
                                                >
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-300">
                                                {formatDate(task.due_date)}
                                            </td>
                                            <td className="p-4 text-gray-300">
                                                {task.assignees && task.assignees.length > 0
                                                    ? task.assignees.map((a) => a.name).join(", ")
                                                    : "-"}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 bg-gray-600 rounded-full h-2">
                                                        <div
                                                            className="bg-red-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${task.progress || 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-300">
                                                        {task.progress || 0}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 flex justify-center">
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className="hover:text-red-500 text-xl"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-gray-400">
                                            No tasks found
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
