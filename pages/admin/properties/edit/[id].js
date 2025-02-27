import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import Link from 'next/link';
import mongoose from 'mongoose';

export default function EditProperty() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [invalidId, setInvalidId] = useState(false);
  
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
    aaContacts: '',
    alumniContacts: '',
    campusContacts: '',
    mmrContacts: '',
    athleticsContacts: '',
    teReimbursements: '',
    contract: '',
    projectedAnnualDeal: 0,
    dealTermLength: 1,
    actualAnnualDeal: 0,
    contacts: [],
    newContact: { name: '', category: 'alumni' }
  });

  useEffect(() => {
    if (!id) return;
    
    // Validate MongoDB ObjectId format
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid MongoDB ObjectId format: ${id}`);
      setInvalidId(true);
      setLoading(false);
      return;
    }
    
    const fetchPropertyDetails = async () => {
      try {
        console.log('Fetching property with ID:', id);
        const response = await fetch(`/api/properties/${id}`);
        
        if (response.status === 404) {
          console.log('Property not found');
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          // Handle HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Format dates for input fields
          const property = data.data;
          
          console.log('Fetched property data:', property); // Debug log
          
          setFormData({
            ...property,
            sunsetName: property.sunsetName || '',
            coverPhoto: property.coverPhoto || '',
            contractExpiration: property.contractExpiration ? new Date(property.contractExpiration).toISOString().split('T')[0] : '',
            contractStartDate: property.contractStartDate ? new Date(property.contractStartDate).toISOString().split('T')[0] : '',
            prohibitedCategories: property.prohibitedCategories?.join(', ') || '',
            alumniContacts: property.alumniContacts?.join('\n') || '',
            campusContacts: property.campusContacts?.join('\n') || '',
            mmrContacts: property.mmrContacts?.join('\n') || '',
            athleticsContacts: property.athleticsContacts?.join('\n') || '',
            contacts: property.contacts || [],
            newContact: { name: '', category: 'alumni' },
            projectedAnnualDeal: property.projectedAnnualDeal || 0,
            dealTermLength: property.dealTermLength || 1,
            actualAnnualDeal: property.actualAnnualDeal || 0
          });
        } else {
          setError(data.error || 'Failed to fetch property details');
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for financial fields
    if (name === 'projectedAnnualDeal' || name === 'dealTermLength' || name === 'actualAnnualDeal') {
      // Convert to number, default to 0 if NaN
      const numValue = Number(value);
      setFormData({
        ...formData,
        [name]: isNaN(numValue) ? 0 : numValue
      });
    } else if (name === 'newContact.name' || name === 'newContact.category') {
      // Handle nested newContact object
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        newContact: {
          ...formData.newContact,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!formData.newContact.name.trim()) return;
    
    // Add the new contact to the contacts array
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        { ...formData.newContact }
      ],
      // Reset the newContact field
      newContact: { name: '', category: formData.newContact.category }
    });
  };
  
  const handleRemoveContact = (index) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    
    try {
      // Format the data
      const formattedData = {
        ...formData,
        sunsetName: formData.sunsetName,
        coverPhoto: formData.coverPhoto,
        prohibitedCategories: formData.prohibitedCategories.split(',').map(item => item.trim()).filter(Boolean),
        // Include only the unified contacts array
        contacts: formData.contacts,
        // Ensure numeric fields are properly converted to numbers
        projectedAnnualDeal: Number(formData.projectedAnnualDeal) || 0,
        dealTermLength: Number(formData.dealTermLength) || 1,
        actualAnnualDeal: Number(formData.actualAnnualDeal) || 0
      };
      
      // Remove form-only fields
      delete formattedData.newContact;

      // Debug logs for financial fields
      console.log('Submitting data:', formattedData); 
      console.log('Financial fields debug:');
      console.log('- projectedAnnualDeal:', formattedData.projectedAnnualDeal, typeof formattedData.projectedAnnualDeal);
      console.log('- dealTermLength:', formattedData.dealTermLength, typeof formattedData.dealTermLength);
      console.log('- actualAnnualDeal:', formattedData.actualAnnualDeal, typeof formattedData.actualAnnualDeal);
      console.log('Contract field value:', formattedData.contract);
      
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSaveSuccess(true);
        // Scroll to top to see success message
        window.scrollTo(0, 0);
      } else {
        setError(data.error || 'Failed to update property');
      }
    } catch (err) {
      setError('An error occurred while saving property details');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <Layout title="Loading | ISE Sports Agency">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ea8d8] border-l-2 border-r-2 border-black"></div>
        </div>
      </Layout>
    );
  }

  // Handle not found
  if (notFound) {
    return (
      <Layout title="Property Not Found | ISE Sports Agency">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black">
              Return to Homepage
            </span>
          </Link>
        </div>
      </Layout>
    );
  }

  // Handle invalid ID format
  if (invalidId) {
    return (
      <Layout title="Invalid Property ID | ISE Sports Agency">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid Property ID</h1>
          <p className="text-gray-600 mb-2">The property ID format is invalid:</p>
          <p className="font-mono bg-gray-100 p-2 rounded mb-6 inline-block">{id}</p>
          <p className="text-gray-600 mb-6">Please check the URL and try again.</p>
          <Link href="/">
            <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black">
              Return to Homepage
            </span>
          </Link>
        </div>
      </Layout>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <Layout title="Loading Property | ISE Sports Agency">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ea8d8] border-l-2 border-r-2 border-black"></div>
        </div>
      </Layout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Layout title="Error | ISE Sports Agency">
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => router.push('/')} 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black"
          >
            Return to Homepage
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Property | ISE Sports Agency">
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
          <div className="flex space-x-3">
            <Link href="/">
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Properties
              </span>
            </Link>
            <Link href={`/properties/${id}`}>
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] transition-colors border-2 border-black">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Property
              </span>
            </Link>
          </div>
        </div>

        {saveSuccess && (
          <div className="rounded-md bg-green-50 p-4 border border-green-200 animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Property updated successfully</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setSaveSuccess(false)}
                    className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003594]"></div>
          </div>
        ) : (
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <svg className="mr-2 h-5 w-5 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Contract Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Information about the contract and financial terms
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Link to the contract document</p>
                  </div>

                  <div className="sm:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Deal Financial Information
                  </h4>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2 bg-green-50 p-4 rounded-lg border border-green-200">
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
                          className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 bg-green-50 p-4 rounded-lg border border-green-200">
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
                          className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">For active contracts</p>
                    </div>

                    <div className="sm:col-span-2 bg-green-50 p-4 rounded-lg border border-green-200">
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
                          className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">For completed contracts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Restrictions & Contacts</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Carve outs, prohibited categories, and contact information
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="prohibitedCategories" className="block text-sm font-medium text-gray-700">
                      Prohibited Categories (comma separated)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="prohibitedCategories"
                        name="prohibitedCategories"
                        rows={3}
                        value={formData.prohibitedCategories}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* New Contact Interface */}
                  <div className="sm:col-span-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                        <svg className="mr-2 h-5 w-5 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Contacts
                      </h4>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">
                          Add contacts for this property by category. Each contact will be displayed in the appropriate section.
                        </p>
                        
                        <div className="flex gap-4 mt-3">
                          <div className="flex-1">
                            <label htmlFor="newContactName" className="block text-sm font-medium text-gray-700">
                              Contact Name
                            </label>
                            <input
                              type="text"
                              id="newContactName"
                              name="newContact.name"
                              value={formData.newContact.name}
                              onChange={handleInputChange}
                              className="mt-1 shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter contact name"
                            />
                          </div>
                          
                          <div className="w-1/3">
                            <label htmlFor="newContactCategory" className="block text-sm font-medium text-gray-700">
                              Category
                            </label>
                            <select
                              id="newContactCategory"
                              name="newContact.category"
                              value={formData.newContact.category}
                              onChange={handleInputChange}
                              className="mt-1 shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="alumni">Alumni</option>
                              <option value="campus">Campus</option>
                              <option value="mmr">MMR</option>
                              <option value="athletics">Athletics</option>
                            </select>
                          </div>
                          
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={handleAddContact}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a89b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6ea8d8]"
                            >
                              Add Contact
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Display existing contacts */}
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Existing Contacts</h5>
                        
                        {formData.contacts.length === 0 ? (
                          <p className="text-sm text-gray-500 italic">No contacts added yet</p>
                        ) : (
                          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                  </th>
                                  <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {formData.contacts.map((contact, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {contact.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveContact(index)}
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="teReimbursements" className="block text-sm font-medium text-gray-700">
                      T&E Reimbursements
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="teReimbursements"
                        name="teReimbursements"
                        rows={3}
                        value={formData.teReimbursements}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <svg className="mr-2 h-5 w-5 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label htmlFor="charitableContribution" className="block text-sm font-medium text-gray-700">
                      Charitable Contribution
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="charitableContribution"
                        name="charitableContribution"
                        rows={3}
                        value={formData.charitableContribution}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label htmlFor="financialTerms" className="block text-sm font-medium text-gray-700">
                      Financial Terms
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="financialTerms"
                        name="financialTerms"
                        rows={3}
                        value={formData.financialTerms}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label htmlFor="carveOuts" className="block text-sm font-medium text-gray-700">
                      Carve Outs
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="carveOuts"
                        name="carveOuts"
                        rows={3}
                        value={formData.carveOuts}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-[#6ea8d8] focus:border-[#6ea8d8] block w-full sm:text-sm border-gray-300 rounded-md"
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
                  className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#003594] hover:bg-[#002a7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003594] ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
} 