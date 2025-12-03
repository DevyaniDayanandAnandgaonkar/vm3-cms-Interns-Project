// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { fetchClients, deleteClient } from "@/redux/features/clientSlice";
// import { Plus, Pencil, Trash2, Mail, Building2 } from "lucide-react";
// import AddClientDialog from "@/components/dialogs/AddClientDialog";
// import {Sidebar} from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";

// export default function ClientsPage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const clients = useAppSelector((state) => state.clients.clients);
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(null);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/admin/login");
//       return;
//     }
//     dispatch(fetchClients());
//   }, [isAuthenticated]);

//   if (!isAuthenticated) return null;

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar />

//       <main className="flex-1 ml-64">
//         <Topbar title="Clients" />

//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">Clients</h1>
//             <button
//               className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
//               onClick={() => setIsAddDialogOpen(true)}
//             >
//               <Plus className="w-4 h-4" /> Add Client
//             </button>
//           </div>

//           <div className="bg-white rounded shadow overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Company</th>
//                   <th className="px-4 py-3 text-left">Contact</th>
//                   <th className="px-4 py-3 text-left">Email</th>
//                   <th className="px-4 py-3 text-left">Status</th>
//                   <th className="px-4 py-3 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clients.map((client) => (
//                   <tr key={client.id} className="border-t">
//                     <td className="px-4 py-3 flex gap-2 items-center">
//                       <Building2 className="w-4 h-4" />
//                       {client.name}
//                     </td>
//                     <td className="px-4 py-3">{client.contact}</td>
//                     <td className="px-4 py-3 flex gap-2 items-center">
//                       <Mail className="w-4 h-4" />
//                       {client.email}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
//                         {client.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <button
//                         className="p-2"
//                         onClick={() => {
//                           setSelectedClient(client);
//                           setIsEditDialogOpen(true);
//                         }}
//                       >
//                         <Pencil className="w-4 h-4" />
//                       </button>
//                       <button
//                         className="p-2"
//                         onClick={() => dispatch(deleteClient(client.id))}
//                       >
//                         <Trash2 className="w-4 h-4 text-red-500" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <AddClientDialog
//             open={isAddDialogOpen}
//             onOpenChange={setIsAddDialogOpen}
//           />

//           {/* {selectedClient && (
//             <EditClientDialog
//               open={isEditDialogOpen}
//               onOpenChange={setIsEditDialogOpen}
//               client={selectedClient}
//             />
//           )} */}
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClients, deleteClient } from "@/redux/features/clientSlice";
import { FaEdit, FaTrash, FaBuilding, FaEnvelope } from "react-icons/fa";
import AddClientDialog from "@/components/dialogs/AddClientDialog";
// import EditClientDialog from "@/components/dialogs/EditClientDialog";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function ClientsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.clients);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    dispatch(fetchClients());
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-black min-h-screen">

      <div className="hidden md:flex">
        <Sidebar currentPage="Clients" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Clients" />

        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Clients</h1>
              <p className="text-gray-400 mt-1">
                Manage company clients and projects
              </p>
            </div>

            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-red-700"
            >
              <span className="text-lg font-bold">+</span> Add Client
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {clients.length > 0 ? (
                  clients.map((client, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="p-4 flex items-center gap-2">
                        <FaBuilding /> {client.name}
                      </td>
                      <td className="p-4">{client.contact}</td>
                      <td className="p-4 flex items-center gap-2">
                        <FaEnvelope /> {client.email}
                      </td>
                      <td className="p-4">
                        <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          {client.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-center gap-5 text-xl">
                        <button
                          className="hover:text-blue-400"
                          onClick={() => {
                            setSelectedClient(client);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="hover:text-red-500"
                          onClick={() => dispatch(deleteClient(client.id))}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-4 text-gray-400"
                    >
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <AddClientDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />

      {/* {selectedClient && (
        <EditClientDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          client={selectedClient}
        />
      )} */}
    </div>
  );
}
