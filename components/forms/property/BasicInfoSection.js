import React from 'react';

const BasicInfoSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <div className="flex items-center">
        <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500 max-w-2xl">
        Property name and visual identity information. The property name is required.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-blue-300 transition-colors">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Property Name
              <span className="ml-1 text-red-500">*</span>
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  This is the official name of the property as it appears in the system.
                </div>
              </div>
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
                placeholder="Enter property name"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-blue-300 transition-colors">
            <label htmlFor="sunsetName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Sunset Name
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  An alternative or informal name for the property, if applicable.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="sunsetName"
                id="sunsetName"
                value={formData.sunsetName}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Alternative name (if applicable)"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="p-5 bg-blue-50 rounded-lg border border-blue-100 mb-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
              <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Visual Assets
            </h4>
            <p className="text-xs text-blue-700 mb-2">
              Add URLs to the property's visual assets. These will be displayed on the property page.
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-blue-300 transition-colors">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
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
                placeholder="https://example.com/logo.png"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">URL to the property logo image (PNG or JPG)</p>
            {formData.logo && (
              <div className="mt-2 p-2 border border-gray-200 rounded bg-gray-50">
                <div className="text-xs text-gray-500 mb-1">Preview:</div>
                <img 
                  src={formData.logo} 
                  alt="Logo preview" 
                  className="h-10 object-contain" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30 50 L70 50 M50 30 L50 70' stroke='%23cccccc' stroke-width='5'/%3E%3C/svg%3E";
                    e.target.alt = "Invalid image URL";
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-blue-300 transition-colors">
            <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700 mb-1">
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
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">URL to the property cover photo image (landscape orientation recommended)</p>
            {formData.coverPhoto && (
              <div className="mt-2 p-2 border border-gray-200 rounded bg-gray-50">
                <div className="text-xs text-gray-500 mb-1">Preview:</div>
                <img 
                  src={formData.coverPhoto} 
                  alt="Cover photo preview" 
                  className="h-20 w-full object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Crect width='200' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M80 50 L120 50 M100 30 L100 70' stroke='%23cccccc' stroke-width='5'/%3E%3C/svg%3E";
                    e.target.alt = "Invalid image URL";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection; 