"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([
    {
      id: "1",
      type: "vacation",
      startDate: "2025-12-20",
      endDate: "2025-12-27",
      reason: "Holiday vacation",
      status: "approved",
      submittedDate: "2025-11-15",
    },
    {
      id: "2",
      type: "sick",
      startDate: "2025-12-12",
      endDate: "2025-12-12",
      reason: "Medical appointment",
      status: "pending",
      submittedDate: "2025-12-09",
    },
  ]);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: "vacation",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmitRequest = () => {
    if (!newRequest.startDate || !newRequest.endDate || !newRequest.reason)
      return;

    const request = {
      id: Date.now().toString(),
      ...newRequest,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
    };

    setLeaves([request, ...leaves]);
    setNewRequest({
      type: "vacation",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setShowRequestForm(false);
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

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return (
      Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1
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
              <option value="vacation">Vacation</option>
              <option value="sick">Sick</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
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
              className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
            />

            <button
              onClick={handleSubmitRequest}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Submit
            </button>
            <button 
              onClick={() => setShowRequestForm(false)}
              className="ml-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
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
            <div className="flex justify-between mb-3">
              <h3 className="capitalize">
                {leave.type} Leave
              </h3>
              {getStatusBadge(leave.status)}
            </div>

            <p className="text-sm text-gray-400">
              {new Date(leave.startDate).toLocaleDateString()} –{" "}
              {new Date(leave.endDate).toLocaleDateString()} (
              {calculateDays(
                leave.startDate,
                leave.endDate
              )}{" "}
              days)
            </p>

            <p className="mt-2 text-gray-300">
              {leave.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
