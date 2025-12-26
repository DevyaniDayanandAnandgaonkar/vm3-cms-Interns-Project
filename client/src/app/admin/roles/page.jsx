"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchRoles, deleteRole, addRole, updateRole } from '@/redux/features/roleSlice';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import Topbar from "@/components/dashboard/Topbar";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/Form.jsx';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table.jsx";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog.jsx';

export default function RolesPage() {
  const dispatch = useAppDispatch();
  const { roles, loading, error } = useAppSelector((state) => state.roles);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('add');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const router = useRouter();

  const methods = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      dispatch(fetchRoles());
    }
  }, [isAuthenticated, dispatch, router]);

  const handleDeleteClick = (roleId) => {
    setRoleToDelete(roleId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete !== null) {
      dispatch(deleteRole(roleToDelete));
      setRoleToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const openDialog = (type, role = null) => {
    setDialogType(type);
    setSelectedRole(role);
    methods.reset(role || {});
    setIsDialogOpen(true);
  };

  const onAddSubmit = async (data) => {
    await dispatch(addRole(data));
    setIsDialogOpen(false);
  };

  const onEditSubmit = async (data) => {
    const id = selectedRole.role_id;
    await dispatch(updateRole({ id, roleData: data }));
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Roles" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Roles" />
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Roles</h1>
              <p className="text-gray-400 mt-1">Manage user roles</p>
            </div>
            <Button onClick={() => openDialog('add')} className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-red-700">
              <Plus className="w-4 h-4" />
              Add Role
            </Button>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            {loading ? (
              <div className="p-6 text-center text-gray-400">Loading roles...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Role Name</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.role_id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>
                        <span className="font-medium">{role.role_name}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openDialog('edit', role)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(role.role_id)}>
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
                <DialogTitle>{dialogType === 'add' ? 'Add New Role' : 'Edit Role'}</DialogTitle>
                <DialogDescription>{dialogType === 'add' ? 'Fill in the details to add a new role.' : 'Update the role information below.'}</DialogDescription>
              </DialogHeader>
              <Form {...methods}>
                <form onSubmit={methods.handleSubmit(dialogType === 'add' ? onAddSubmit : onEditSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={methods.control}
                      name="role_name"
                      rules={{ required: 'Role name is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Role Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{dialogType === 'add' ? 'Add Role' : 'Save Changes'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the role
                  record from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </main>
      </div>
    </div>
  );
}
