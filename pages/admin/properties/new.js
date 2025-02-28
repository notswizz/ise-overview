import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Link from 'next/link';

export default function NewProperty() {
  const router = useRouter();
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    sunsetName: '',
    logo: '',
    coverPhoto: '',
    contractExpiration: '',
    commission: '',
    charitableContribution: '',
    carveOuts: '',
    contractStartDate: '',
    mmrHolder: '',
    financialTerms: '',
    prohibitedCategories: '',
    teReimbursements: '',
    contract: '',
    projectedAnnualDeal: 0,
    dealTermLength: 1,
    actualAnnualDeal: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to: ${value}`);
    
    // Handle numeric fields
    if (name === 'projectedAnnualDeal' || name === 'dealTermLength' || name === 'actualAnnualDeal') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Format the data
      const formattedData = {
        ...formData,
        sunsetName: formData.sunsetName,
        coverPhoto: formData.coverPhoto,
        prohibitedCategories: formData.prohibitedCategories.split(',').map(item => item.trim()).filter(Boolean),
        // Remove aaContacts processing
        // Ensure numeric fields are properly converted to numbers
        projectedAnnualDeal: Number(formData.projectedAnnualDeal) || 0,
        dealTermLength: Number(formData.dealTermLength) || 1,
        actualAnnualDeal: Number(formData.actualAnnualDeal) || 0
      };

      console.log('Submitting new property data:', formattedData);
      
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Navigate to the admin dashboard
        router.push('/admin');
      } else {
        setError(data.error || 'Failed to create property');
      }
    } catch (err) {
      setError('An error occurred while creating property');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Add New Property | ISE Properties">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
          <Link href="/admin">
            <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Back to Admin
            </span>
          </Link>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {saving ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003594]"></div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Name and visual identity for the property
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Property Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="sunsetName" className="block text-sm font-medium text-gray-700">
                    Sunset Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="sunsetName"
                      id="sunsetName"
                      value={formData.sunsetName}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="logo"
                      id="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">URL to the property logo image</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">
                    Cover Photo URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="coverPhoto"
                      id="coverPhoto"
                      value={formData.coverPhoto}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">URL to the property cover photo image</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Contract Details</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Information about the contract and financial terms
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="contractExpiration" className="block text-sm font-medium text-gray-700">
                    Contract Expiration
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="contractExpiration"
                      id="contractExpiration"
                      value={formData.contractExpiration}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="contract" className="block text-sm font-medium text-gray-700">
                    Contract Document URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="contract"
                      id="contract"
                      value={formData.contract}
                      onChange={handleInputChange}
                      placeholder="https://example.com/contract.pdf"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Link to the contract document</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="contractStartDate" className="block text-sm font-medium text-gray-700">
                    Contract Start Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="contractStartDate"
                      id="contractStartDate"
                      value={formData.contractStartDate}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="commission" className="block text-sm font-medium text-gray-700">
                    Commission
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="commission"
                      id="commission"
                      value={formData.commission}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dealTermLength" className="block text-sm font-medium text-gray-700">
                    Deal Term Length (years)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="dealTermLength"
                      id="dealTermLength"
                      min="1"
                      value={formData.dealTermLength}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="projectedAnnualDeal" className="block text-sm font-medium text-gray-700">
                    Projected Annual Deal ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="projectedAnnualDeal"
                      id="projectedAnnualDeal"
                      min="0"
                      step="0.01"
                      value={formData.projectedAnnualDeal}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For active contracts</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="actualAnnualDeal" className="block text-sm font-medium text-gray-700">
                    Actual Annual Deal ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="actualAnnualDeal"
                      id="actualAnnualDeal"
                      min="0"
                      step="0.01"
                      value={formData.actualAnnualDeal}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For completed contracts</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="mmrHolder" className="block text-sm font-medium text-gray-700">
                    MMR Holder
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="mmrHolder"
                      id="mmrHolder"
                      value={formData.mmrHolder}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="charitableContribution" className="block text-sm font-medium text-gray-700">
                    Charitable Contribution
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="charitableContribution"
                      id="charitableContribution"
                      value={formData.charitableContribution}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="financialTerms" className="block text-sm font-medium text-gray-700">
                    Financial Terms
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="financialTerms"
                      id="financialTerms"
                      value={formData.financialTerms}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="carveOuts" className="block text-sm font-medium text-gray-700">
                    Carve Outs
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="carveOuts"
                      id="carveOuts"
                      value={formData.carveOuts}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Details</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Other important information about the property
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="prohibitedCategories" className="block text-sm font-medium text-gray-700">
                    Prohibited Categories
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="prohibitedCategories"
                      id="prohibitedCategories"
                      value={formData.prohibitedCategories}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter prohibited categories separated by commas (e.g. Tobacco, Alcohol, Gambling)
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="teReimbursements" className="block text-sm font-medium text-gray-700">
                    T&E Reimbursements
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="teReimbursements"
                      id="teReimbursements"
                      rows={3}
                      value={formData.teReimbursements}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link href="/admin">
                <span className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </span>
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#003594] hover:bg-[#002a7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003594]"
              >
                {saving ? 'Creating...' : 'Create Property'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
} 