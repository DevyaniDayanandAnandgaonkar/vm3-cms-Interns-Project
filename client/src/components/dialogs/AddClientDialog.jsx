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
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        {/* Dialog Panel */}
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
            <Dialog.Panel className="mx-auto max-w-3xl w-full bg-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-y-auto max-h-[90vh]">
              
              {/* Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <div>
                  <Dialog.Title className="text-xl font-bold text-white">Add New Client</Dialog.Title>
                  <Dialog.Description className="text-gray-400 text-sm mt-1">Fill in the details to add a new client.</Dialog.Description>
                </div>
                <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Company Name *</label>
                    <input {...register('company', { required: 'Company name is required' })} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700" />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Industry *</label>
                    <select {...register('industry', { required: 'Industry is required' })} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700">
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
                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Contact Person *</label>
                    <input {...register('contact', { required: 'Contact person is required' })} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700" />
                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email *</label>
                    <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Phone Number *</label>
                    <input {...register('phone', { required: 'Phone number is required' })} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Website</label>
                    <input {...register('website')} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Address *</label>
                  <textarea {...register('address', { required: 'Address is required' })} rows={3} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700" />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">Status *</label>
                  <select {...register('status')} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-700">
                  <button type="button" className="px-4 py-2 border rounded border-gray-700 hover:bg-gray-800" onClick={() => onOpenChange(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">Add Client</button>
                </div>
              </form>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
