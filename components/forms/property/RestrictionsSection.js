import React, { useState, useEffect } from 'react';
import ContactsSection from './ContactsSection';

const RestrictionsSection = ({ 
  formData, 
  handleInputChange, 
  handleAddContact, 
  handleRemoveContact 
}) => {
  // State for managing tag input
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  
  // Update tags when formData changes
  useEffect(() => {
    if (formData.prohibitedCategories) {
      const categoryArray = formData.prohibitedCategories
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
      
      setTags(categoryArray);
    }
  }, [formData.prohibitedCategories]);
  
  // Handle adding a new tag
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = tagInput.trim();
    const newTags = [...tags, newTag];
    setTags(newTags);
    
    // Update the form data with comma-separated string
    const event = {
      target: {
        name: 'prohibitedCategories',
        value: newTags.join(', ')
      }
    };
    handleInputChange(event);
    
    // Clear the input
    setTagInput('');
  };
  
  // Handle removing a tag
  const handleRemoveTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    
    // Update the form data with comma-separated string
    const event = {
      target: {
        name: 'prohibitedCategories',
        value: newTags.join(', ')
      }
    };
    handleInputChange(event);
  };
  
  // Handle keydown on tag input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === ',' || e.key === ';') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Restrictions & Contacts</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500 max-w-2xl">
        Manage prohibited categories, carve outs, and property contacts
      </p>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* Prohibited Categories Section */}
        <div className="sm:col-span-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-red-300 transition-colors">
            <label htmlFor="tagInput" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              Prohibited Categories
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-60 shadow-lg z-10">
                  Categories that are prohibited from being associated with this property. Enter each category separated by comma or press Enter.
                </div>
              </div>
            </label>
            
            <div className="flex items-center mt-1">
              <input
                type="text"
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Type a category and press Enter or comma"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add
              </button>
            </div>
            
            <div className="mt-3">
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-400 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                      >
                        <span className="sr-only">Remove {tag}</span>
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No prohibited categories added yet</p>
              )}
            </div>
            
            <input
              type="hidden"
              name="prohibitedCategories"
              value={tags.join(', ')}
            />
          </div>
        </div>

        {/* Contacts Section */}
        <ContactsSection 
          formData={formData} 
          handleInputChange={handleInputChange}
          handleAddContact={handleAddContact}
          handleRemoveContact={handleRemoveContact}
        />
        
        {/* T&E Reimbursements */}
        <div className="sm:col-span-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-indigo-300 transition-colors">
            <label htmlFor="teReimbursements" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              T&E Reimbursements
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  Travel and expense reimbursement terms for this property.
                </div>
              </div>
            </label>
            <div className="mt-1">
              <textarea
                id="teReimbursements"
                name="teReimbursements"
                rows={4}
                value={formData.teReimbursements}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe the travel and expense reimbursement terms"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Include specific details about travel, accommodation, meal allowances, and other reimbursable expenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictionsSection; 