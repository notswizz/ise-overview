import React from 'react';

const AdditionalInfoSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <div className="flex items-center">
        <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Information</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500 max-w-2xl">
        Additional details and terms for the property
      </p>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* Information icon/banner */}
        <div className="sm:col-span-6 bg-purple-50 rounded-lg p-4 border border-purple-100 mb-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-purple-800">Additional Details</h3>
              <div className="mt-2 text-sm text-purple-700">
                <p>
                  Use this section to add any additional information that doesn't fit elsewhere.
                  This could include special terms, unique arrangements, or other important details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MMR Holder */}
        <div className="sm:col-span-3">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-purple-300 transition-colors">
            <label htmlFor="mmrHolder" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              MMR Holder
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  The entity that holds the multimedia rights for this property.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="mmrHolder"
                id="mmrHolder"
                value={formData.mmrHolder}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter MMR holder name"
              />
            </div>
          </div>
        </div>

        {/* Charitable Contribution */}
        <div className="sm:col-span-3">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-purple-300 transition-colors">
            <label htmlFor="charitableContribution" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Charitable Contribution
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  Any charitable contributions associated with this property.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <textarea
                id="charitableContribution"
                name="charitableContribution"
                rows={3}
                value={formData.charitableContribution}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe any charitable contributions"
              />
            </div>
          </div>
        </div>

        {/* Financial Terms */}
        <div className="sm:col-span-6">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-purple-300 transition-colors">
            <label htmlFor="financialTerms" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Financial Terms
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 shadow-lg z-10">
                  Detailed financial terms and arrangements for this property that are not captured elsewhere.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <textarea
                id="financialTerms"
                name="financialTerms"
                rows={4}
                value={formData.financialTerms}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe detailed financial terms and arrangements"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Include payment schedules, special financial considerations, or other monetary terms not captured in other sections.
            </p>
          </div>
        </div>

        {/* Carve Outs */}
        <div className="sm:col-span-6">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-purple-300 transition-colors">
            <label htmlFor="carveOuts" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Carve Outs
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 shadow-lg z-10">
                  Specific exclusions or carve-outs related to this property's contract.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <textarea
                id="carveOuts"
                name="carveOuts"
                rows={4}
                value={formData.carveOuts}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe any specific exclusions or carve-outs"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              List any exclusions, exceptions, or special arrangements that limit the scope of the contract.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection; 