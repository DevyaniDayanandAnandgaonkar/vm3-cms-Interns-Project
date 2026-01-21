"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import { fetchProjects } from "@/redux/features/projectSlice";
import { fetchClients } from "@/redux/features/clientSlice";
import { fetchDepartments } from "@/redux/features/departmentSlice";
import { fetchEmployees } from "@/redux/features/employeeSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { clients, loading: clientsLoading } = useSelector((state) => state.clients);
  const { departments, loading: departmentsLoading } = useSelector((state) => state.departments);
  const { employees, loading: employeesLoading } = useSelector((state) => state.employees);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      dispatch(fetchProjects());
      dispatch(fetchClients());
      dispatch(fetchDepartments());
      dispatch(fetchEmployees());
    }
  }, [isAuthenticated, router, dispatch]);

  const {
    totalEmployees,
    totalClients,
    totalProjects,
    completedProjects,
    departmentData,
    projectStatusData,
  } = useMemo(() => {
    const totalEmployees = employees.length;
    const totalClients = clients.length;
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;

    const departmentData = departments.map(dept => ({
      name: dept.department_name,
      value: employees.filter(emp => emp.department_id === dept.department_id).length
    })).filter(d => d.value > 0);

    const projectStatusData = [
      { name: 'New Project', value: projects.filter(p => p.status === 'New Project').length },
      { name: 'Working', value: projects.filter(p => p.status === 'Working').length },
      { name: 'On Hold', value: projects.filter(p => p.status === 'On Hold').length },
      { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
    ].filter(d => d.value > 0);

    return {
      totalEmployees,
      totalClients,
      totalProjects,
      completedProjects,
      departmentData,
      projectStatusData,
    };
  }, [projects, clients, departments, employees]);

  const isLoading = projectsLoading || clientsLoading || departmentsLoading || employeesLoading;

  const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

  const [currentPage, setCurrentPage] = useState("Dashboard");

  function handleNavigate(page) {
    setCurrentPage(page);

    const routeMap = {
      Dashboard: "/admin/dashboard",
      Departments: "/admin/departments",
      Employees: "/admin/employees",
      Clients: "/admin/clients",
      Partners: "/admin/partners",
      Projects: "/admin/projects",
    };

    router.push(routeMap[page] || "/admin/dashboard");
  }

  return (
    <div className="flex bg-black min-h-screen">

      {/* FIXED SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-0 md:ml-64">

        {/* TOP BAR */}
        <Topbar />

        {/* CONTENT */}
        <main className="p-4 sm:p-6 md:p-10">

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Employees" value={isLoading ? '...' : totalEmployees} />
            <Card title="Total Clients" value={isLoading ? '...' : totalClients} />
            <Card title="Total Projects" value={isLoading ? '...' : totalProjects} />
            <Card title="Completed Projects" value={isLoading ? '...' : completedProjects} />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

            {/* BAR CHART */}
            <div className="bg-gray-50/10 p-6 rounded-xl shadow overflow-x-auto">
              <h2 className="text-lg text-amber-50 font-semibold mb-4">Employees by Department</h2>

              <div className="w-full  flex justify-center">
                <BarChart width={350} height={250} data={departmentData}>
                  <XAxis dataKey="name"
                  stroke="white" 
                  tick={{ fill: "#3b82f6" }} />
                  <YAxis stroke="white" 
                  tick={{ fill: "#3b82f6" }}/>
                  <Tooltip />
                  <Bar dataKey="value"  fill="#3b82f6" />
                </BarChart>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="bg-white/10 p-6 rounded-xl shadow flex flex-col items-center">
              <h2 className="text-lg text-amber-50 font-semibold mb-4">Projects Status Overview</h2>

              <PieChart width={360} height={260}>
                <Pie
                  data={projectStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                >
                  {projectStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mt-12 bg-gray-50/10 rounded-xl shadow p-6">
            <h2 className="text-xl text-green-100 font-semibold mb-4">Summary</h2>
            <p className="text-gray-100">Add your custom summary or reports here…</p>
          </div>

        </main>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value }) {
  return (
    <div className="bg-gray-50/10 p-6 rounded-xl shadow text-center">
      <p className="text-green-100 font-bold">{title}</p>
      <h3 className="text-3xl text-blue-800 font-bold mt-2">{value}</h3>
    </div>
  );
}