import React from 'react';

const ContractDetailsSection = ({ formData, handleInputChange }) => {
  // Calculate days until contract expiration
  const calculateDaysRemaining = () => {
    if (!formData.contractExpiration) return null;
    
    const today = new Date();
    const expirationDate = new Date(formData.contractExpiration);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysRemaining = calculateDaysRemaining();
  
  return (
    <div>
      <div className="flex items-center">
        <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Contract Details</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500 max-w-2xl">
        Information about the contract terms, dates, and key documentation
      </p>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
        {/* Contract date timeline visualization */}
        {formData.contractStartDate && formData.contractExpiration && (
          <div className="sm:col-span-12 mb-2">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Contract Timeline</h4>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full ${
                      daysRemaining < 0 ? 'bg-red-500' : 
                      daysRemaining < 30 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ 
                      width: '100%',
                      transformOrigin: 'left',
                      transform: formData.contractStartDate && formData.contractExpiration ? 
                        `scaleX(${
                          Math.max(0, 
                            new Date(formData.contractExpiration) - new Date() < 0 ? 
                            0 : 
                            (new Date(formData.contractExpiration) - new Date()) / 
                            (new Date(formData.contractExpiration) - new Date(formData.contractStartDate))
                          )
                        })` : 
                        'scaleX(0)'
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <div>
                    <div>Start: {formData.contractStartDate}</div>
                    <div className="text-gray-400">{new Date(formData.contractStartDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div>End: {formData.contractExpiration}</div>
                    <div className={`
                      ${daysRemaining < 0 ? 'text-red-500 font-medium' : 
                        daysRemaining < 30 ? 'text-yellow-600 font-medium' : 
                        'text-gray-400'
                      }
                    `}>
                      {daysRemaining !== null && (
                        daysRemaining < 0 
                          ? `Expired ${Math.abs(daysRemaining)} days ago` 
                          : `${daysRemaining} days remaining`
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Start date */}
        <div className="sm:col-span-6">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-indigo-300 transition-colors">
            <label htmlFor="contractStartDate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Contract Start Date
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  The date when the contract begins.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="contractStartDate"
                id="contractStartDate"
                value={formData.contractStartDate}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {formData.contractStartDate && (
              <p className="mt-2 text-xs text-gray-500">
                {new Date(formData.contractStartDate).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>

        {/* Expiration date */}
        <div className="sm:col-span-6">
          <div className={`rounded-md shadow-sm bg-white p-4 border ${
            daysRemaining !== null && daysRemaining < 0 ? 'border-red-300 bg-red-50' : 
            daysRemaining !== null && daysRemaining < 30 ? 'border-yellow-300 bg-yellow-50' : 
            'border-gray-200'
          } hover:border-indigo-300 transition-colors`}>
            <label htmlFor="contractExpiration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Contract Expiration
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  The date when the contract expires.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="contractExpiration"
                id="contractExpiration"
                value={formData.contractExpiration}
                onChange={handleInputChange}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  daysRemaining !== null && daysRemaining < 0 ? 'border-red-300' : 
                  daysRemaining !== null && daysRemaining < 30 ? 'border-yellow-300' : ''
                }`}
              />
            </div>
            {formData.contractExpiration && (
              <div className="mt-2 text-xs">
                <p className={`${
                  daysRemaining !== null && daysRemaining < 0 ? 'text-red-800 font-medium' : 
                  daysRemaining !== null && daysRemaining < 30 ? 'text-yellow-800 font-medium' : 
                  'text-gray-500'
                }`}>
                  {new Date(formData.contractExpiration).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {daysRemaining !== null && (
                  <p className={`mt-1 ${
                    daysRemaining < 0 ? 'text-red-700 font-medium' : 
                    daysRemaining < 30 ? 'text-yellow-700 font-medium' : 
                    'text-green-700'
                  }`}>
                    {daysRemaining < 0 
                      ? `Contract expired ${Math.abs(daysRemaining)} days ago` 
                      : `${daysRemaining} days remaining on contract`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contract Document URL */}
        <div className="sm:col-span-6">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-indigo-300 transition-colors">
            <label htmlFor="contract" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Contract Document URL
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  URL to the contract document, preferably a PDF file.
                </div>
              </div>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </span>
              <input
                type="url"
                name="contract"
                id="contract"
                value={formData.contract}
                onChange={handleInputChange}
                placeholder="https://example.com/contract.pdf"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              />
            </div>
            {formData.contract && (
              <div className="mt-2 flex items-center space-x-2">
                <a
                  href={formData.contract}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Contract
                </a>
                <span className="text-xs text-gray-500 italic">Opens in a new tab</span>
              </div>
            )}
          </div>
        </div>

        {/* Commission */}
        <div className="sm:col-span-6">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-indigo-300 transition-colors">
            <label htmlFor="commission" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Commission
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  Commission terms for this contract.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="commission"
                id="commission"
                value={formData.commission}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g. 15% of total contract value"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Specify the commission structure for this contract
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsSection; 