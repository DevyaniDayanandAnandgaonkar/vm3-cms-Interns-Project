"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, approveLeave, rejectLeave } from "@/redux/features/leaveSlice";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function LeavesPage() {
    const dispatch = useDispatch();
    const { leaves, loading, error } = useSelector((state) => state.leaves);

    useEffect(() => {
        dispatch(fetchLeaves());
    }, [dispatch]);

    const handleApprove = async (id) => {
        if (window.confirm("Are you sure you want to approve this leave?")) {
            await dispatch(approveLeave(id));
            dispatch(fetchLeaves());
        }
    };

    const handleReject = async (id) => {
        if (window.confirm("Are you sure you want to reject this leave?")) {
            await dispatch(rejectLeave(id));
            dispatch(fetchLeaves());
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-600/20 text-green-400";
            case "rejected":
                return "bg-red-600/20 text-red-400";
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
                <Sidebar currentPage="Leaves" />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 ml-0 md:ml-64">
                <Topbar title="Leave Approval" />

                {/* MAIN CONTENT */}
                <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Leave Requests</h1>
                            <p className="text-gray-400 mt-1">
                                Approve or reject employee leave requests
                            </p>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
                        <table className="w-full text-left">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-4 text-sm font-semibold">Employee</th>
                                    <th className="p-4 text-sm font-semibold">Leave Type</th>
                                    <th className="p-4 text-sm font-semibold">Start Date</th>
                                    <th className="p-4 text-sm font-semibold">End Date</th>
                                    <th className="p-4 text-sm font-semibold">Days</th>
                                    <th className="p-4 text-sm font-semibold">Reason</th>
                                    <th className="p-4 text-sm font-semibold">Status</th>
                                    <th className="p-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-gray-400">
                                            Loading leave requests...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-red-400">
                                            Error: {error}
                                        </td>
                                    </tr>
                                ) : leaves.length > 0 ? (
                                    leaves.map((leave) => (
                                        <tr
                                            key={leave.id}
                                            className="border-b border-gray-700 hover:bg-gray-700/50"
                                        >
                                            <td className="p-4 font-medium text-white">
                                                {leave.employee_name}
                                                {leave.employee_code && (
                                                    <span className="text-gray-400 text-xs ml-2">
                                                        ({leave.employee_code})
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-gray-300 capitalize">
                                                {leave.leave_type}
                                            </td>
                                            <td className="p-4 text-gray-300">
                                                {formatDate(leave.start_date)}
                                            </td>
                                            <td className="p-4 text-gray-300">
                                                {formatDate(leave.end_date)}
                                            </td>
                                            <td className="p-4 text-gray-300">{leave.days}</td>
                                            <td className="p-4 text-gray-400 max-w-[200px] truncate">
                                                {leave.reason}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadge(leave.status)}`}
                                                >
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {leave.status === "pending" ? (
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => handleApprove(leave.id)}
                                                            className="bg-green-600/20 text-green-400 hover:bg-green-600/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors"
                                                        >
                                                            <FaCheck className="text-xs" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(leave.id)}
                                                            className="bg-red-600/20 text-red-400 hover:bg-red-600/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors"
                                                        >
                                                            <FaTimes className="text-xs" /> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-500 text-sm">
                                                        —
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-5 text-gray-400">
                                            No leave requests found
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
