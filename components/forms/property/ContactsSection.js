import React, { useState } from 'react';

const ContactsSection = ({ formData, handleInputChange, handleAddContact, handleRemoveContact }) => {
  // Group contacts by category
  const groupedContacts = formData.contacts.reduce((groups, contact) => {
    const category = contact.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(contact);
    return groups;
  }, {});
  
  // State for new contact form validation
  const [validationError, setValidationError] = useState(null);
  
  // Enhanced add contact with validation
  const validateAndAddContact = (e) => {
    e.preventDefault();
    
    if (!formData.newContact.name.trim()) {
      setValidationError('Contact name is required');
      return;
    }
    
    setValidationError(null);
    handleAddContact(e);
  };
  
  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'alumni':
        return 'bg-blue-100 text-blue-800';
      case 'campus':
        return 'bg-green-100 text-green-800';
      case 'mmr':
        return 'bg-purple-100 text-purple-800';
      case 'athletics':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format category name for display
  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="sm:col-span-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h4 className="text-md font-medium text-gray-900 flex items-center">
            <svg className="mr-2 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Contacts ({formData.contacts.length})
          </h4>
          <div className="flex space-x-1">
            <button
              type="button"
              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
              onClick={() => document.getElementById('new-contact-form').scrollIntoView({ behavior: 'smooth' })}
            >
              <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Contact
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Add contacts for this property by category. Each contact will be displayed in the appropriate section.
          </p>
          
          {/* Add new contact form */}
          <div id="new-contact-form" className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
            <h5 className="text-sm font-medium text-gray-800 mb-3">Add New Contact</h5>
            
            <form onSubmit={validateAndAddContact} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
                <div className="sm:col-span-4">
                  <label htmlFor="newContactName" className="block text-xs font-medium text-gray-700 mb-1">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="newContactName"
                    name="newContact.name"
                    value={formData.newContact.name}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (validationError) setValidationError(null);
                    }}
                    className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      validationError ? 'border-red-300' : ''
                    }`}
                    placeholder="Enter contact name"
                  />
                  {validationError && (
                    <p className="mt-1 text-xs text-red-600">{validationError}</p>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="newContactCategory" className="block text-xs font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="newContactCategory"
                    name="newContact.category"
                    value={formData.newContact.category}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="alumni">Alumni</option>
                    <option value="campus">Campus</option>
                    <option value="mmr">MMR</option>
                    <option value="athletics">Athletics</option>
                  </select>
                </div>
                
                <div className="sm:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="sr-only">Add</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Display contacts by category */}
          {formData.contacts.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new contact using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Section for each category with contacts */}
              {Object.keys(groupedContacts).map((category) => (
                <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className={`px-4 py-2 ${getCategoryColor(category)} bg-opacity-30 border-b border-gray-200`}>
                    <h5 className="text-sm font-medium flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getCategoryColor(category)}`}>
                        {formatCategoryName(category)}
                      </span>
                      <span className="text-gray-700">
                        ({groupedContacts[category].length} {groupedContacts[category].length === 1 ? 'contact' : 'contacts'})
                      </span>
                    </h5>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {groupedContacts[category].map((contact, index) => {
                      // Find the original index in the combined contacts array
                      const originalIndex = formData.contacts.findIndex(c => c === contact);
                      return (
                        <li key={index} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(category)}`}>
                                {contact.name.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveContact(originalIndex)}
                            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-100 hover:bg-red-200"
                          >
                            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="sr-only">Remove contact</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsSection; 