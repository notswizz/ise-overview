import { useState, useEffect } from 'react';

const formatCurrency = (value) => {
  if (!value && value !== 0) return 'Not specified';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const ExpensesSection = ({ property }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* T&E Reimbursements Section */}
      {property.teReimbursements ? (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            T&E Reimbursements
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Travel & Expense Policy</h3>
            </div>
            <div className="p-6">
              <div className="prose max-w-none text-gray-700">
                <div className="whitespace-pre-wrap">{property.teReimbursements}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Expense Information</h3>
          <p className="text-gray-500 max-w-sm mx-auto">There is no T&E reimbursement information specified for this property.</p>
        </div>
      )}
    </div>
  );
};

export default ExpensesSection; 