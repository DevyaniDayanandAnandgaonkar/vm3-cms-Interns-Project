"use client";
import { useState } from "react";

import {
  Download, ChevronDown, FileText, TrendingUp, 
  DollarSign, Clock 
} from "lucide-react";
import { Button } from '@/components/ui/button';

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const FilterSection = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState("Project Overview");
  const reportOptions = ["Project Overview", "User Activity", "Sales Report", "System Status"];

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last Month");
  const dateOptions = ["Last Month", "Last 7 Days", "Last 24 Hours", "This Year"];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">Report Type</label>
          <Button
            variant="outline"
            type="button"
            onClick={() => { setIsReportOpen(!isReportOpen); setIsDateOpen(false); }}
            className="flex w-full items-center justify-between px-3 py-2 text-sm"
          >
            <span>{reportType}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
          {isReportOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              {reportOptions.map((option) => (
                <div key={option} onClick={() => { setReportType(option); setIsReportOpen(false); }} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">Date Range</label>
          <Button
            variant="outline"
            type="button"
            onClick={() => { setIsDateOpen(!isDateOpen); setIsReportOpen(false); }}
            className="flex w-full items-center justify-between px-3 py-2 text-sm"
          >
            <span>{dateRange}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
          {isDateOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              {dateOptions.map((option) => (
                <div key={option} onClick={() => { setDateRange(option); setIsDateOpen(false); }} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const StatCard = ({ title, value, icon, bgClass, iconClass, footer }) => {
  return (
    <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
      
  
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgClass}`}>
          
          {icon} 
        </div>
      </div>

      
      <div className="space-y-1">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        
        
        <div className="text-sm font-medium">
          {footer}
        </div>
      </div>
    </div>
  );
};

const ChartsSection = () => {
  // --- DATA FOR PIE CHART ---
  const pieData = [
    { name: "Completed", value: 1 },
    { name: "In Progress", value: 2 },
  ];
  const COLORS = ["#10b981", "#3b82f6"]; // Green and Blue

 
  const lineData = [
    { name: "Jan", completed: 0, inProgress: 2 },
    { name: "Feb", completed: 1, inProgress: 2 },
    { name: "Mar", completed: 1, inProgress: 2 },
    { name: "Apr", completed: 1, inProgress: 2 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      
     
      <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-gray-900 font-semibold mb-4">Project Status Distribution</h2>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`} // Custom Label
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-gray-900 font-semibold mb-4">Monthly Project Progress</h2>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              
              
              <Line 
                type="monotone" 
                dataKey="completed" 
                name="Completed"
                stroke="#10b981" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              
              
              <Line 
                type="monotone" 
                dataKey="inProgress" 
                name="In Progress"
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

const BudgetChart = () => {
  
  const data = [
    {
      name: "Website Redesign",
      Budget: 50000,
      Spent: 37500,
    },
    {
      name: "E-commerce",
      Budget: 120000,
      Spent: 36000,
    },
    {
      name: "SEO Optimization",
      Budget: 15000,
      Spent: 15000,
    },
  ];

  return (
    <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
      <h2 className="text-gray-900 font-semibold mb-4 text-lg">Budget vs Spent Analysis</h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
           
            <Bar 
              dataKey="Budget" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={50}
            />
            
       
            <Bar 
              dataKey="Spent" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ProjectDetailsTable = () => {

  const projects = [
    {
      name: "Website Redesign",
      status: "In Progress",
      budget: "$50,000",
      spent: "$37,500",
      remaining: "$12,500",
      progress: "75%",
    },
    {
      name: "E-commerce",
      status: "In Progress",
      budget: "$120,000",
      spent: "$36,000",
      remaining: "$84,000",
      progress: "30%",
    },
    {
      name: "SEO Optimization",
      status: "Completed", 
      budget: "$15,000",
      spent: "$15,000",
      remaining: "$0",
      progress: "100%",
    },
  ];


  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
      <h2 className="text-gray-900 font-semibold mb-4 text-lg">Project Details</h2>
      
   
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-700 font-medium">Project</th>
              <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-700 font-medium">Budget</th>
              <th className="text-left py-3 px-4 text-gray-700 font-medium">Spent</th>
              <th className="text-left py-3 px-4 text-gray-700 font-medium">Remaining</th>
              <th className="text-left py-3 px-4 text-gray-700 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-900">{project.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{project.budget}</td>
                <td className="py-3 px-4 text-gray-600">{project.spent}</td>
                <td className="py-3 px-4 text-gray-600">{project.remaining}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">{project.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Page() {

  
  const statsData = [
    {
      title: "Total Projects",
      value: "3",
      bgClass: "bg-blue-50",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      footer: (
        <p className="text-green-600 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" /> <span>+2 this month</span>
        </p>
      )
    },
    {
      title: "Total Budget",
      value: "$185,000",
      bgClass: "bg-green-50",
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      footer: <p className="text-gray-500">Spent: $88,500 (47.8%)</p>
    },
    {
      title: "Avg. Completion Time",
      value: "3.5 months",
      bgClass: "bg-purple-50",
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      footer: <p className="text-gray-500">Based on 1 completed</p>
    },
    {
      title: "Success Rate",
      value: "100%",
      bgClass: "bg-yellow-50",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
      footer: <p className="text-green-600">All projects on track</p>
    }
  ];

  return (
    <div className="p-6">
   
      <div className="rounded-lg flex justify-between items-center mb-6">
        <div>
          <h1 className="font-semibold text-2xl">Reports</h1>
          <p className="text-gray-600">Analyze your project data and progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => alert("Exporting PDF...") }>
            <Download className="w-4 h-4" /> Export PDF
          </Button>
          <Button variant="outline" onClick={() => alert("Exporting Excel...") }>
            <Download className="w-4 h-4" /> Export Excel
          </Button>
        </div>
      </div>

      <FilterSection />

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgClass={stat.bgClass}
            footer={stat.footer}
          />
        ))}
      </div>

      <div>
        <ChartsSection />
      </div>

      <div>
        <BudgetChart />
      </div>

      <div>
        <ProjectDetailsTable />
      </div>
    </div>
  );
}