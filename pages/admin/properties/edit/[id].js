import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import Link from 'next/link';
import mongoose from 'mongoose';

// Import form section components
import { 
  BasicInfoSection,
  ContractDetailsSection,
  FinancialInfoSection,
  RestrictionsSection,
  AdditionalInfoSection
} from '../../../../components/forms/property';

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

  const renderStatusPages = () => {
    if (!id || loading) {
      return (
        <Layout title="Loading | ISE Properties">
          <LoadingState />
        </Layout>
      );
    }

    // Handle not found
    if (notFound) {
      return (
        <Layout title="Property Not Found | ISE Properties">
          <NotFoundState />
        </Layout>
      );
    }

    // Handle invalid ID format
    if (invalidId) {
      return (
        <Layout title="Invalid Property ID | ISE Properties">
          <InvalidIdState id={id} />
        </Layout>
      );
    }

    // Handle loading state after submit
    if (saving) {
      return (
        <Layout title="Loading Property | ISE Properties">
          <SubmittingState />
        </Layout>
      );
    }

    // Handle error state
    if (error) {
      return (
        <Layout title="Error | ISE Properties">
          <ErrorState error={error} router={router} />
        </Layout>
      );
    }

    return null;
  };

  // Render the status pages first
  const statusPage = renderStatusPages();
  if (statusPage) return statusPage;

  return (
    <Layout title="Edit Property | ISE Properties">
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header with sticky navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <svg className="mr-3 h-8 w-8 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Property
            </h1>
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
                <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] transition-colors">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Property
                </span>
              </Link>
            </div>
          </div>
          
          {/* Form navigation tabs */}
          <div className="flex border-t border-gray-200 overflow-x-auto">
            <button
              type="button"
              onClick={() => document.getElementById('basic-info-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#6ea8d8] hover:bg-gray-50 border-b-2 border-transparent hover:border-[#6ea8d8] flex items-center"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Info
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('contract-details-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#6ea8d8] hover:bg-gray-50 border-b-2 border-transparent hover:border-[#6ea8d8] flex items-center"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Contract
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('financial-info-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#6ea8d8] hover:bg-gray-50 border-b-2 border-transparent hover:border-[#6ea8d8] flex items-center"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financial
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('restrictions-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#6ea8d8] hover:bg-gray-50 border-b-2 border-transparent hover:border-[#6ea8d8] flex items-center"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Restrictions
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('additional-info-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#6ea8d8] hover:bg-gray-50 border-b-2 border-transparent hover:border-[#6ea8d8] flex items-center"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Additional Info
            </button>
          </div>
        </div>

        {/* Notifications */}
        {saveSuccess && (
          <div className="rounded-md bg-green-50 p-4 border border-green-200 shadow-sm animate-pulse">
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
          <div className="rounded-md bg-red-50 p-4 border border-red-200 shadow-sm">
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

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-8">
            {/* Basic Information Section */}
            <div id="basic-info-section">
              <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />
            </div>

            {/* Contract Details Section */}
            <div id="contract-details-section" className="border-t border-gray-200 pt-8">
              <ContractDetailsSection formData={formData} handleInputChange={handleInputChange} />
            </div>
            
            {/* Financial Information Section */}
            <div id="financial-info-section" className="border-t border-gray-200 pt-8">
              <FinancialInfoSection formData={formData} handleInputChange={handleInputChange} />
            </div>

            {/* Restrictions & Contacts Section */}
            <div id="restrictions-section" className="border-t border-gray-200 pt-8">
              <RestrictionsSection 
                formData={formData} 
                handleInputChange={handleInputChange}
                handleAddContact={handleAddContact}
                handleRemoveContact={handleRemoveContact}
              />
            </div>

            {/* Additional Information Section */}
            <div id="additional-info-section" className="border-t border-gray-200 pt-8">
              <AdditionalInfoSection formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {/* Sticky footer with form controls */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500 italic">
              All changes are saved when you click the Save button
            </div>
            <div className="flex space-x-3">
              <Link href="/admin">
                <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </span>
              </Link>
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#003594] hover:bg-[#002a7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003594] ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
} 