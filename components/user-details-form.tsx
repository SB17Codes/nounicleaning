'use client';

import { useActionState } from 'react';
import { createProperty, updateCustomer, getCustomer } from '@/db/fauna';
import { useUser } from '@clerk/nextjs';
import {redirect} from 'next/navigation';

const DetailsForm = () => {
  const { user } = useUser();

  // Server action function
  async function handleDetailsSubmission(previousState: any, formData: FormData) {
    const data = {
      phone: formData.get('phone')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      propertyType: formData.get('propertyType')?.toString() || '',
      notes: formData.get('notes')?.toString() || '',
    };

    console.log('Data:', data);

    const customer = await getCustomer(user?.id);
    console.log('Customer:', customer);

    if (!customer) {
      throw new Error('Customer not found');
    }

    await updateCustomer(data.phone, user?.id);
    await createProperty( data, user?.id);

    redirect(`/redirect`); // Redirect to dashboard after submission
    return data; // Return updated state
  }

  const [details, detailsAction, isPending] = useActionState(handleDetailsSubmission, {
    phone: '',
    address: '',
    propertyType: '',
    notes: '',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>

        <form action={detailsAction} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
            <input
              name="phone"
              type="tel"
              defaultValue={details.phone}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-2">Type</label>
            <select
              name="propertyType"
              defaultValue={details.propertyType}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="T2">T2</option>
              <option value="T3">T3</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-2">Address</label>
            <input
              name="address"
              type="text"
              defaultValue={details.address}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-2">Notes</label>
            <input
              name="notes"
              type="text"
              defaultValue={details.notes}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter instructions or notes about your property"
            />
          </div>

          <button
            type="submit"
            className={`mt-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-sm ${
              isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsForm;
