import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { addClientAsync } from '@/redux/features/clientSlice';

export default function AddClientDialog({ open, onOpenChange }) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { status: 'Active' } });

  const onSubmit = async (data) => {
    await dispatch(addClientAsync(data));
    reset();
    onOpenChange(false);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => onOpenChange(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-black-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-black">Add New Client</Dialog.Title>
                  <Dialog.Description className="text-sm text-black mt-1">Fill in the details to add a new client to your system.</Dialog.Description>
                </div>
                <button onClick={() => onOpenChange(false)} className="text-black hover:text-black transition-colors">✕</button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black">Company Name *</label>
                      <input {...register('company', { required: 'Company name is required' })} className="w-full px-3 py-2 border rounded" />
                      {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black">Industry *</label>
                      <select {...register('industry', { required: 'Industry is required' })} className="w-full px-3 py-2 border rounded">
                        <option value="">Select industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.industry && <p className="text-sm text-red-600">{errors.industry.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black">Contact Person *</label>
                      <input {...register('contact', { required: 'Contact person is required' })} className="w-full px-3 py-2 border rounded" />
                      {errors.contact && <p className="text-sm text-red-600">{errors.contact.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black">Email *</label>
                      <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })} className="w-full px-3 py-2 border rounded" />
                      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black">Phone Number *</label>
                      <input {...register('phone', { required: 'Phone number is required' })} className="w-full px-3 py-2 border rounded" />
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black">Website</label>
                      <input {...register('website')} className="w-full px-3 py-2 border rounded" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Address *</label>
                    <textarea {...register('address', { required: 'Address is required' })} className="w-full px-3 py-2 border rounded" rows={3} />
                    {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Status *</label>
                    <select {...register('status')} className="w-full px-3 py-2 border rounded">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-black-200">
                  <button type="button" className="px-4 py-2 border rounded" onClick={() => onOpenChange(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Client</button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
