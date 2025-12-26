"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteClient, fetchClients, addClientAsync, updateClientAsync } from '@/redux/features/clientSlice';
import { Plus, Pencil, Trash2, Mail, Building2 } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import Topbar from "@/components/dashboard/Topbar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/Form';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

export default function ClientsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.clients || []);
  const loading = useAppSelector((state) => state.clients.loading);
  const error = useAppSelector((state) => state.clients.error);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('add'); // 'add' or 'edit'
  const [selectedClient, setSelectedClient] = useState(null);

  const methods = useForm();

  const handleDeleteClient = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteClient(id));
    }
  };

  const openDialog = (type, client = null) => {
    setDialogType(type);
    setSelectedClient(client);
    if (client) {
      methods.reset({ ...client, company: client.client_name });
    } else {
      methods.reset({ status: 'Active' });
    }
    setIsDialogOpen(true);
  };

  const onAddSubmit = async (data) => {
    await dispatch(addClientAsync(data));
    setIsDialogOpen(false);
  };

  const onEditSubmit = async (data) => {
    const id = selectedClient.client_id || selectedClient.id;
    await dispatch(updateClientAsync({ ...data, id: id }));
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      dispatch(fetchClients());
    }
  }, [isAuthenticated, dispatch, router]);

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
            <Button onClick={() => openDialog('add')} className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-red-700">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            {loading ? (
              <div className="p-6 text-center text-gray-400">Loading clients...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Company</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Phone</TableHead>
                    <TableHead className="text-white">Address</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.client_id || client.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{client.client_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{client.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.address}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                        }`}>{client.status}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openDialog('edit', client)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteClient(client.client_id || client.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[625px] bg-gray-800 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>{dialogType === 'add' ? 'Add New Client' : 'Edit Client'}</DialogTitle>
                <DialogDescription>{dialogType === 'add' ? 'Fill in the details to add a new client to your system.' : 'Update the client information below.'}</DialogDescription>
              </DialogHeader>
              <Form {...methods}>
                <form onSubmit={methods.handleSubmit(dialogType === 'add' ? onAddSubmit : onEditSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={methods.control}
                      name="company"
                      rules={{ required: 'Company name is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Company Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {dialogType === 'add' && (
                      <FormField
                        control={methods.control}
                        name="password"
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Password *</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} className="bg-gray-700 border-gray-600" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={methods.control}
                      name="email"
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="phone"
                      rules={{ required: 'Phone number is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone Number *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="address"
                      rules={{ required: 'Address is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Address *</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="document_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Document Type</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Select document type" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 text-white">
                                <SelectItem value="Passport">Passport</SelectItem>
                                <SelectItem value="ID Card">ID Card</SelectItem>
                                <SelectItem value="Driving License">Driving License</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="document_file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Document File</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-700 border-gray-600"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Status *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 text-white">
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{dialogType === 'add' ? 'Add Client' : 'Save Changes'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
