"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaves,
  applyLeave,
  fetchLeaveSummary,
} from "@/redux/features/leaveSlice";
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function LeavesPage() {
  const dispatch = useDispatch();
  const { leaves, leaveSummary, loading } = useSelector(
    (state) => state.leaves
  );

  useEffect(() => {
    dispatch(fetchLeaves());
    dispatch(fetchLeaveSummary());
  }, [dispatch]);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formError, setFormError] = useState("");

  const [newRequest, setNewRequest] = useState({
    type: "general",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmitRequest = async () => {
    if (!newRequest.startDate || !newRequest.endDate) {
      setFormError("Please select start and end date.");
      return;
    }

    if (!newRequest.reason.trim()) {
      setFormError("Please write the reason for your leave.");
      return;
    }

    setFormError("");

    try {
      await dispatch(
        applyLeave({
          leave_type: newRequest.type,
          start_date: newRequest.startDate,
          end_date: newRequest.endDate,
          reason: newRequest.reason,
        })
      ).unwrap();

      dispatch(fetchLeaves());
      dispatch(fetchLeaveSummary());

      setNewRequest({
        type: "general",
        startDate: "",
        endDate: "",
        reason: "",
      });

      setShowRequestForm(false);
    } catch (error) {
      setFormError("Failed to submit leave. Try again.");
    }
  };

  const getStatusBadge = (status) => {
    const base =
      "flex items-center gap-1 px-3 py-1 rounded-full text-sm";

    if (status === "approved")
      return (
        <span className={`${base} bg-green-900 text-green-300`}>
          <CheckCircle className="w-4 h-4" />
          Approved
        </span>
      );

    if (status === "rejected")
      return (
        <span className={`${base} bg-red-900 text-red-300`}>
          <XCircle className="w-4 h-4" />
          Rejected
        </span>
      );

    return (
      <span className={`${base} bg-yellow-900 text-yellow-300`}>
        <Clock className="w-4 h-4" />
        Pending
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            Leave Requests
          </h2>
          <p className="text-gray-400">
            Submit and track your leave applications
          </p>
        </div>
        <button
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <Plus className="w-5 h-5" />
          Request Leave
        </button>
      </div>

      {/* Request Form */}
      {showRequestForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg mb-4">New Leave Request</h3>

          <div className="space-y-4">
            <select
              value={newRequest.type}
              onChange={(e) =>
                setNewRequest({
                  ...newRequest,
                  type: e.target.value,
                })
              }
              className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
            >
              <option value="general">General</option>
              <option value="maternity">Maternity</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newRequest.startDate}
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    startDate: e.target.value,
                  })
                }
                className="bg-gray-800 border border-gray-700 p-2 rounded"
              />
              <input
                type="date"
                value={newRequest.endDate}
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    endDate: e.target.value,
                  })
                }
                className="bg-gray-800 border border-gray-700 p-2 rounded"
              />
            </div>

            <textarea
              rows={3}
              placeholder="Reason"
              value={newRequest.reason}
              onChange={(e) =>
                setNewRequest({
                  ...newRequest,
                  reason: e.target.value,
                })
              }
              className={`w-full bg-gray-800 border ${
                formError ? "border-red-500" : "border-gray-700"
              } p-2 rounded`}
            />

            {formError && (
              <p className="text-red-400 text-sm mt-1">
                {formError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSubmitRequest}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowRequestForm(false);
                  setFormError("");
                }}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <p className="text-gray-400">Loading...</p>}

      {/* Leave Balance */}
      {leaveSummary && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg mb-4">Leave Balance</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-900/40 p-5 rounded-lg">
              <p className="text-3xl font-bold text-blue-400">
                {leaveSummary.general.remaining}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                General Days
              </p>
            </div>

            <div className="bg-yellow-900/40 p-5 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">
                {leaveSummary.general.used}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Used Days
              </p>
            </div>

            <div className="bg-pink-900/40 p-5 rounded-lg">
              <p className="text-3xl font-bold text-pink-400">
                {leaveSummary.maternity.remaining}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Maternity Days
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leave List */}
      <div className="space-y-4">
        {leaves.map((leave) => (
          <div
            key={leave.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold capitalize">
                  {leave.leave_type} Leave
                </h3>
              </div>

              {getStatusBadge(leave.status)}
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <p className="text-gray-500">Start Date</p>
                <p>
                  {new Date(
                    leave.start_date
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500">End Date</p>
                <p>
                  {new Date(
                    leave.end_date
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Duration</p>
                <p>{leave.days} day(s)</p>
              </div>

              <div>
                <p className="text-gray-500">Reason</p>
                <p>{leave.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}