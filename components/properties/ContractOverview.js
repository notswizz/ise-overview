const ContractOverview = ({ property }) => {
  const calculateTermRemaining = () => {
    if (!property.contractStartDate || !property.contractExpiration) {
      return 'Not specified';
    }
    
    const startDate = new Date(property.contractStartDate);
    const endDate = new Date(property.contractExpiration);
    const now = new Date();
    
    // Calculate total contract duration
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (endDate.getMonth() - startDate.getMonth());
    
    // Calculate remaining time
    const isExpired = now > endDate;
    
    if (isExpired) {
      return 'Expired';
    } else {
      const remainingMs = endDate - now;
      const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
      const remainingMonths = Math.floor(remainingDays / 30);
      const remainingDaysAfterMonths = remainingDays % 30;
      
      if (remainingMonths > 0) {
        if (remainingDaysAfterMonths > 0) {
          return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''} ${remainingDaysAfterMonths} day${remainingDaysAfterMonths !== 1 ? 's' : ''}`;
        } else {
          return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        }
      } else {
        return `${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
      }
    }
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(value));
  };
  
  // Format date with options
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  // Calculate contract progress
  const calculateProgress = () => {
    if (!property.contractStartDate || !property.contractExpiration) {
      return { percent: 0, status: 'unknown' };
    }
    
    const startDate = new Date(property.contractStartDate);
    const endDate = new Date(property.contractExpiration);
    const now = new Date();
    
    // If contract hasn't started yet
    if (now < startDate) {
      return { percent: 0, status: 'not-started' };
    }
    
    // If contract is expired
    if (now > endDate) {
      return { percent: 100, status: 'expired' };
    }
    
    // Calculate progress
    const totalDuration = endDate - startDate;
    const elapsed = now - startDate;
    const percent = Math.round((elapsed / totalDuration) * 100);
    
    return { 
      percent, 
      status: 'active',
      timeRemaining: calculateTermRemaining()
    };
  };
  
  const progress = calculateProgress();
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Contract Timeline Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Contract Timeline
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Contract Progress</span>
              <span className="text-sm font-semibold">
                {progress.status === 'expired' ? (
                  <span className="text-red-600">Expired</span>
                ) : progress.status === 'not-started' ? (
                  <span className="text-yellow-600">Not Started</span>
                ) : (
                  <span className="text-blue-600">{progress.percent}% Complete</span>
                )}
              </span>
            </div>
            
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  progress.status === 'expired' 
                    ? 'bg-red-500' 
                    : progress.status === 'not-started'
                      ? 'bg-yellow-400'
                      : 'bg-blue-500'
                }`}
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
            
            {progress.status === 'active' && (
              <div className="mt-1 text-xs text-gray-500 text-right">
                {progress.timeRemaining} remaining
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-1">Start Date</span>
              <div className="flex items-start">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-gray-900 font-semibold">
                    {formatDate(property.contractStartDate)}
                  </span>
                  {property.contractStartDate && (
                    <span className="text-xs text-gray-500">
                      {new Date() < new Date(property.contractStartDate) 
                        ? 'Contract has not started yet'
                        : 'Contract in progress'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-1">Expiration Date</span>
              <div className="flex items-start">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-gray-900 font-semibold">
                    {formatDate(property.contractExpiration)}
                  </span>
                  {property.contractExpiration && (
                    <span className="text-xs text-gray-500">
                      {new Date() > new Date(property.contractExpiration) 
                        ? 'Contract has expired'
                        : progress.status === 'active' ? `${progress.timeRemaining} remaining` : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Financial Details Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Financial Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">Annual Deal Value</h3>
                <div className="flex items-center">
                  {property.actualAnnualDeal && property.actualAnnualDeal > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(property.actualAnnualDeal)}</span>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-md">Actual</span>
                    </>
                  ) : property.projectedAnnualDeal && property.projectedAnnualDeal > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(property.projectedAnnualDeal)}</span>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-md">Projected</span>
                    </>
                  ) : (
                    <span className="text-xl font-medium text-gray-400">Not specified</span>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 p-2 rounded-lg">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            {property.dealTermLength && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-500">Deal Term Length</span>
                <div className="mt-1 flex items-center">
                  <span className="text-gray-900 font-semibold">
                    {property.dealTermLength} {!isNaN(property.dealTermLength) ? `year${property.dealTermLength !== 1 ? 's' : ''}` : ''}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Contract Value</h3>
                <div className="flex items-center">
                  {(property.actualAnnualDeal || property.projectedAnnualDeal) && property.dealTermLength ? (
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(
                        (property.actualAnnualDeal || property.projectedAnnualDeal) * property.dealTermLength
                      )}
                    </span>
                  ) : (
                    <span className="text-xl font-medium text-gray-400">Not available</span>
                  )}
                </div>
                {(property.actualAnnualDeal || property.projectedAnnualDeal) && property.dealTermLength && (
                  <span className="text-xs text-gray-500 mt-1">
                    Calculated for the entire term length
                  </span>
                )}
              </div>
              
              <div className="bg-blue-50 p-2 rounded-lg">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            {(property.actualAnnualDeal || property.projectedAnnualDeal) && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-500">Annual Value</span>
                <div className="mt-1 flex items-center">
                  <span className="text-gray-900 font-semibold">
                    {formatCurrency(property.actualAnnualDeal || property.projectedAnnualDeal)}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">per year</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Terms & Conditions Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Terms & Conditions
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Financial Terms
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {property.financialTerms ? (
                  <p className="text-sm text-gray-700 whitespace-pre-line">{property.financialTerms}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No financial terms specified</p>
                )}
              </div>
            </div>
            
            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Charitable Contribution
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {property.charitableContribution ? (
                  <p className="text-sm text-gray-700 whitespace-pre-line">{property.charitableContribution}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No charitable contributions specified</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Notes Section (if applicable) */}
      {property.notes && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Additional Notes
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-700 whitespace-pre-line">{property.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractOverview; 