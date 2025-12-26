"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchEmployees, deleteEmployee, addEmployeeAsync, updateEmployeeAsync } from '@/redux/features/employeeSlice';
import { fetchDepartments } from '@/redux/features/departmentSlice';
import { fetchDesignations } from '@/redux/features/designationSlice';
import { fetchRoles } from '@/redux/features/roleSlice';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import Topbar from "@/components/dashboard/Topbar";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
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
} from "@/components/ui/Table";

export default function EmployeesPage() {
  const dispatch = useAppDispatch();
  const { employees, loading, error } = useAppSelector((state) => state.employees);
  const { departments } = useAppSelector((state) => state.departments);
  const { designations } = useAppSelector((state) => state.designations);
  const { roles } = useAppSelector((state) => state.roles);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const router = useRouter();

  const defaultEmployeeValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    department_id: '',
    role_id: '',
    designation_id: '',
    joining_date: '',
    dob: '',
    status: 'Active',
    pf_number: '',
    document_type: '',
    document_file: '',
  };

  const methods = useForm({
    defaultValues: defaultEmployeeValues,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      dispatch(fetchEmployees());
      dispatch(fetchDepartments());
      dispatch(fetchDesignations());
      dispatch(fetchRoles());
    }
  }, [isAuthenticated, dispatch, router]);

  const handleDeleteEmployee = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const openDialog = (type, employee = null) => {
    setDialogType(type);
    setSelectedEmployee(employee);
    if (type === 'add') {
      const employeeRole = roles.find(role => role.role_name.toLowerCase() === 'employee');
      const defaultValues = {
        ...defaultEmployeeValues,
        role_id: employeeRole ? employeeRole.role_id.toString() : '',
      };
      methods.reset(defaultValues);
    } else {
      methods.reset({
        ...defaultEmployeeValues,
        ...employee,
        password: '',
        joining_date: employee.joining_date ? new Date(employee.joining_date).toISOString().split('T')[0] : '',
        dob: employee.dob ? new Date(employee.dob).toISOString().split('T')[0] : '',
      });
    }
    setIsDialogOpen(true);
  };

  const onAddSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'document_file') {
        if (data.document_file && data.document_file[0]) {
          formData.append(key, data.document_file[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    await dispatch(addEmployeeAsync(formData));
    setIsDialogOpen(false);
  };

  const onEditSubmit = async (data) => {
    const id = selectedEmployee.emp_id || selectedEmployee.id;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'document_file') {
        if (data.document_file && data.document_file[0]) {
          formData.append(key, data.document_file[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    await dispatch(updateEmployeeAsync({ ...data, id, body: formData }));
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Employees" />
      </div>

      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Employees" />
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Employees</h1>
              <p className="text-gray-400 mt-1">
                Manage employees in your organization
              </p>
            </div>
            <Button onClick={() => openDialog('add')} className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-red-700">
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            {loading ? (
              <div className="p-6 text-center text-gray-400">Loading employees...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Phone</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.emp_id || emp.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{emp.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.phone}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          emp.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                        }`}>{emp.status}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openDialog('edit', emp)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteEmployee(emp.emp_id || emp.id)}>
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
                <DialogTitle>{dialogType === 'add' ? 'Add New Employee' : 'Edit Employee'}</DialogTitle>
                <DialogDescription>{dialogType === 'add' ? 'Fill in the details to add a new employee.' : 'Update the employee information below.'}</DialogDescription>
              </DialogHeader>
              <Form {...methods}>
                <form onSubmit={methods.handleSubmit(dialogType === 'add' ? onAddSubmit : onEditSubmit)} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">

                    <FormField
                      control={methods.control}
                      name="name"
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name *</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ''} className="bg-gray-700 border-gray-600" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={methods.control}
                        name="email"
                        rules={{ required: 'Email is required' }}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Email *</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} value={field.value || ''} className="bg-gray-700 border-gray-600" />
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
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={methods.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Phone</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ''} className="bg-gray-700 border-gray-600" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                          control={methods.control}
                          name="department_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Department</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 text-white">
                                    {departments.map((dept) => (
                                      <SelectItem key={dept.department_id} value={dept.department_id.toString()}>
                                        {dept.department_name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <FormField
                          control={methods.control}
                          name="designation_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Designation</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue placeholder="Select designation" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 text-white">
                                    {designations.map((des) => (
                                      <SelectItem key={des.designation_id} value={des.designation_id.toString()}>
                                        {des.designation_name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={methods.control}
                          name="role_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Role</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 text-white">
                                    {roles.map((role) => (
                                      <SelectItem key={role.role_id} value={role.role_id.toString()}>
                                        {role.role_name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={methods.control}
                        name="joining_date"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Joining Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} value={field.value || ''} className="bg-gray-700 border-gray-600" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={methods.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">DOB</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} value={field.value || ''} className="bg-gray-700 border-gray-600" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                                    <SelectItem value="Resigned">Resigned</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={methods.control}
                        name="pf_number"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">PF Number</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ''} className="bg-gray-700 border-gray-600" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={methods.control}
                        name="document_type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Document Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 text-white">
                                    <SelectItem value="Aadhar">Aadhar</SelectItem>
                                    <SelectItem value="PAN">PAN</SelectItem>
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
                                  type="file" 
                                  className="bg-gray-700 border-gray-600"
                                  onChange={(e) => field.onChange(e.target.files)}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{dialogType === 'add' ? 'Add Employee' : 'Save Changes'}</Button>
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