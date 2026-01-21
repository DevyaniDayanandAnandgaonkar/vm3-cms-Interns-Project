"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDepartments, deleteDepartment, addDepartment, updateDepartment } from '@/redux/features/departmentSlice';
import { Plus, Pencil, Trash2, Building } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import Topbar from "@/components/dashboard/Topbar";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function DepartmentsPage() {
  const dispatch = useAppDispatch();
  const { departments, loading, error } = useAppSelector((state) => state.departments);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('add');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const router = useRouter();

  const defaultDepartmentValues = {
    department_name: '',
    description: '',
    status: 'Active',
  };

  const methods = useForm({
    defaultValues: defaultDepartmentValues,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      dispatch(fetchDepartments());
    }
  }, [isAuthenticated, dispatch, router]);

  const handleDeleteClick = (departmentId) => {
    setDepartmentToDelete(departmentId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (departmentToDelete !== null) {
      dispatch(deleteDepartment(departmentToDelete));
      setDepartmentToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const openDialog = (type, department = null) => {
    setDialogType(type);
    setSelectedDepartment(department);
    if (type === 'add') {
      methods.reset(defaultDepartmentValues);
    } else {
      methods.reset({ ...defaultDepartmentValues, ...department });
    }
    setIsDialogOpen(true);
  };

  const onAddSubmit = async (data) => {
    await dispatch(addDepartment(data));
    setIsDialogOpen(false);
  };

  const onEditSubmit = async (data) => {
    const id = selectedDepartment.department_id;
    await dispatch(updateDepartment({ id, departmentData: data }));
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Departments" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Departments" />
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Departments</h1>
              <p className="text-gray-400 mt-1">Manage company departments and teams</p>
            </div>
            <Button onClick={() => openDialog('add')} className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-red-700">
              <Plus className="w-4 h-4" />
              Add Department
            </Button>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            {loading ? (
              <div className="p-6 text-center text-gray-400">Loading departments...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Department Name</TableHead>
                    <TableHead className="text-white">Description</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.department_id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{dept.department_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{dept.description}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          dept.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                        }`}>{dept.status}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openDialog('edit', dept)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(dept.department_id)}>
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
                <DialogTitle>{dialogType === 'add' ? 'Add New Department' : 'Edit Department'}</DialogTitle>
                <DialogDescription>{dialogType === 'add' ? 'Fill in the details to add a new department.' : 'Update the department information below.'}</DialogDescription>
              </DialogHeader>
              <Form {...methods}>
                <form onSubmit={methods.handleSubmit(dialogType === 'add' ? onAddSubmit : onEditSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={methods.control}
                      name="department_name"
                      rules={{ required: 'Department name is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Department Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} value={field.value ?? ''} className="bg-gray-700 border-gray-600" />
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
                          <FormLabel className="text-white">Status</FormLabel>
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
                    <Button type="submit">{dialogType === 'add' ? 'Add Department' : 'Save Changes'}</Button>
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
                  This action cannot be undone. This will permanently delete the department
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