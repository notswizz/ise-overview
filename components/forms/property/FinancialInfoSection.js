import React from 'react';

const FinancialInfoSection = ({ formData, handleInputChange }) => {
  // Calculate total deal value based on annual deal and term length
  const calculateTotalDealValue = () => {
    const annual = parseFloat(formData.projectedAnnualDeal) || 0;
    const years = parseInt(formData.dealTermLength) || 1;
    return annual * years;
  };

  const totalDealValue = calculateTotalDealValue();
  
  // Format currency 
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <div className="flex items-center">
        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Information</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500 max-w-2xl">
        Deal terms and financial metrics for this property
      </p>

      {/* Financial summary card */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100 p-4 shadow-sm">
        <h4 className="text-sm font-medium text-gray-800 mb-3">Deal Value Summary</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-500">Annual Deal</div>
            <div className="text-lg font-medium text-gray-900">{formatCurrency(formData.projectedAnnualDeal || 0)}</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-500">Term Length</div>
            <div className="text-lg font-medium text-gray-900">{formData.dealTermLength || 1} {parseInt(formData.dealTermLength) === 1 ? 'year' : 'years'}</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-500">Total Deal Value</div>
            <div className="text-lg font-medium text-green-600">{formatCurrency(totalDealValue)}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
        {/* Deal Term Length */}
        <div>
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-green-300 transition-colors">
            <label htmlFor="dealTermLength" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Deal Term Length
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  The length of the contract in years.
                </div>
              </div>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="dealTermLength"
                id="dealTermLength"
                min="1"
                value={formData.dealTermLength}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                {parseInt(formData.dealTermLength) === 1 ? 'year' : 'years'}
              </span>
            </div>
            <div className="mt-2">
              <input
                type="range"
                name="dealTermLength"
                min="1"
                max="10"
                value={formData.dealTermLength}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>1yr</span>
                <span>5yrs</span>
                <span>10yrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projected Annual Deal */}
        <div>
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-green-300 transition-colors">
            <label htmlFor="projectedAnnualDeal" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Projected Annual Deal
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  The projected annual value of this deal.
                </div>
              </div>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                $
              </span>
              <input
                type="number"
                name="projectedAnnualDeal"
                id="projectedAnnualDeal"
                min="0"
                step="1000"
                value={formData.projectedAnnualDeal}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-r-md"
                placeholder="0"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Expected annual revenue for active contracts
            </p>
          </div>
        </div>

        {/* Actual Annual Deal */}
        <div>
          <div className="rounded-md shadow-sm bg-white p-4 border border-gray-200 hover:border-green-300 transition-colors">
            <label htmlFor="actualAnnualDeal" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Actual Annual Deal
              <div className="relative ml-1 group">
                <svg className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute left-0 bottom-6 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg z-10">
                  The actual annual value realized from this deal.
                </div>
              </div>
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                $
              </span>
              <input
                type="number"
                name="actualAnnualDeal"
                id="actualAnnualDeal"
                min="0"
                step="1000"
                value={formData.actualAnnualDeal}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-r-md"
                placeholder="0"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Actual annual revenue for completed contracts
            </p>
            
            {formData.projectedAnnualDeal > 0 && formData.actualAnnualDeal > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs flex justify-between">
                  <span className="text-gray-500">Performance:</span>
                  <span className={`font-medium ${formData.actualAnnualDeal >= formData.projectedAnnualDeal ? 'text-green-600' : 'text-red-600'}`}>
                    {formData.actualAnnualDeal >= formData.projectedAnnualDeal ? 
                      `+${Math.round((formData.actualAnnualDeal / formData.projectedAnnualDeal - 1) * 100)}%` : 
                      `-${Math.round((1 - formData.actualAnnualDeal / formData.projectedAnnualDeal) * 100)}%`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInfoSection; 