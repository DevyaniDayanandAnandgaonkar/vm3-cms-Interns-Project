"use client";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import Topbar from "@/components/dashboard/Topbar";
import { Button } from '@/components/ui/button.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table.jsx';
import { Plus, Pencil, Trash2, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog.jsx';
import { fetchPartners, addPartner, updatePartner, deletePartner } from '@/redux/features/partnerSlice';

const statuses = ['Active', 'Inactive'];

export default function PartnersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { partners, loading, error } = useAppSelector((state) => state.partners);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [formData, setFormData] = useState({
    partner_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      dispatch(fetchPartners());
    }
  }, [isAuthenticated, dispatch, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPartner) {
      dispatch(updatePartner({ id: editingPartner.partner_id, partnerData: formData }));
    } else {
      dispatch(addPartner(formData));
    }
    
    setIsDialogOpen(false);
    setEditingPartner(null);
    resetForm();
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      partner_name: partner.partner_name,
      email: partner.email,
      password: '',
      phone: partner.phone,
      address: partner.address,
      status: partner.status
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (partnerId) => {
    setPartnerToDelete(partnerId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (partnerToDelete !== null) {
      dispatch(deletePartner(partnerToDelete));
      setPartnerToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleDialogClose = (open) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingPartner(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      partner_name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      status: 'Active'
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-black min-h-screen">
      <div className="hidden md:flex">
        <Sidebar currentPage="Partners" />
      </div>
      <div className="flex-1 ml-0 md:ml-64">
        <Topbar title="Partners" />
        <main className="p-6 sm:p-10 bg-gray-900 min-h-screen text-white">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Partners</h1>
              <p className="text-gray-400 mt-1">Manage business partners</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow gap-2">
                  <Plus className="w-4 h-4" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle>{editingPartner ? 'Edit Partner' : 'Add New Partner'}</DialogTitle>
                  <DialogDescription>
                    {editingPartner 
                      ? 'Update the partner information below.' 
                      : 'Fill in the partner details. All fields are required.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="partner-name">Partner Name *</Label>
                        <Input
                          id="partner-name"
                          placeholder="e.g., Tech Solutions Inc."
                          value={formData.partner_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, partner_name: e.target.value }))}
                          required
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="partner-email">Email Address *</Label>
                        <Input
                          id="partner-email"
                          type="email"
                          placeholder="partner@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {!editingPartner && (
                        <div className="space-y-2">
                          <Label htmlFor="partner-password">Password *</Label>
                          <Input
                            id="partner-password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required={!editingPartner}
                            className="bg-gray-700 border-gray-600"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="partner-phone">Phone Number *</Label>
                        <Input
                          id="partner-phone"
                          type="tel"
                          placeholder="+1 234 567 890"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partner-address">Address *</Label>
                      <Textarea
                        id="partner-address"
                        placeholder="Enter full address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        rows={3}
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partner-status">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger id="partner-status" className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white">
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDialogClose(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">{editingPartner ? 'Update Partner' : 'Save Partner'}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            {loading ? (
                <div className="p-6 text-center text-gray-400">Loading partners...</div>
            ) : error ? (
                <div className="p-6 text-center text-red-500">{error}</div>
            ) : (
                <Table>
                    <TableHeader>
                    <TableRow className="border-gray-700">
                        <TableHead className="text-white">Partner Name</TableHead>
                        <TableHead className="text-white">Contact</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-right text-white">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {partners.map((partner) => (
                        <TableRow key={partner.partner_id} className="border-gray-700 hover:bg-gray-700/50">
                        <TableCell>{partner.partner_name}</TableCell>
                        <TableCell>
                            <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail className="w-3 h-3" />
                                <span className="text-sm">{partner.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Phone className="w-3 h-3" />
                                <span className="text-sm">{partner.phone}</span>
                            </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                partner.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                            }`}>{partner.status}</span>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(partner)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(partner.partner_id)}>
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

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the partner
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