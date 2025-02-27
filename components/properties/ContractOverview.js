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
  
  return (
    <>
      <div className="border-b-2 border-[#6ea8d8]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#6ea8d8]/10 to-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <svg className="h-5 w-5 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Contract Overview
            </h2>
            {property.contract && (
              <a 
                href={property.contract}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#6ea8d8] hover:bg-[#5a96c8] transition-all border border-black shadow-sm"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Contract
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* First row - Contract Dates */}
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Contract Start Date
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 bg-[#6ea8d8]/5 p-3 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
              {property.contractStartDate ? 
                new Date(property.contractStartDate).toLocaleDateString('en-US', {
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                }) : 'Not specified'}
            </dd>
          </div>
          
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Contract Expiration
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 bg-[#6ea8d8]/5 p-3 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
              {property.contractExpiration ? 
                new Date(property.contractExpiration).toLocaleDateString('en-US', {
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                }) : 'Not specified'}
            </dd>
          </div>
          
          {/* Second row - Term Remaining and Commission */}
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Term Remaining
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 bg-[#6ea8d8]/5 p-3 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
              {calculateTermRemaining()}
            </dd>
          </div>
          
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Commission
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 bg-[#6ea8d8]/5 p-3 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
              {property.commission ? 
                <span className="flex items-center">
                  <span className="text-[#6ea8d8] font-bold">{property.commission}</span>
                  {property.commission.includes('%') ? '' : '%'}
                </span> : 'Not specified'}
            </dd>
          </div>
          
          {/* New row - Annual Deal Value and Term Length */}
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Annual Deal Value
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 bg-[#6ea8d8]/5 p-3 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
              {property.actualAnnualDeal && property.actualAnnualDeal > 0 ? (
                <span className="flex items-center">
                  <span className="text-[#6ea8d8] font-bold">{formatCurrency(property.actualAnnualDeal)}</span>
                  <span className="ml-2 text-xs text-gray-500">(Actual)</span>
                </span>
              ) : property.projectedAnnualDeal && property.projectedAnnualDeal > 0 ? (
                <span className="flex items-center">
                  <span className="text-[#6ea8d8] font-bold">{formatCurrency(property.projectedAnnualDeal)}</span>
                  <span className="ml-2 text-xs text-gray-500">(Projected)</span>
                </span>
              ) : 'Not specified'}
            </dd>
          </div>
          
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Deal Term Length
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 bg-[#6ea8d8]/5 p-3 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
              {property.dealTermLength ? (
                <span className="flex items-center">
                  <span className="text-[#6ea8d8] font-bold">{property.dealTermLength}</span>
                  {!isNaN(property.dealTermLength) && <span className="ml-1">year{property.dealTermLength !== 1 ? 's' : ''}</span>}
                </span>
              ) : 'Not specified'}
            </dd>
          </div>
          
          {/* Third row - Financial Terms */}
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Financial Terms
            </dt>
            <dd className="mt-1 text-sm text-gray-900 bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm whitespace-pre-line">
              {property.financialTerms || 'No financial terms specified'}
            </dd>
          </div>
          
          {/* Fourth row - Charitable Contribution */}
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Charitable Contribution
            </dt>
            <dd className="mt-1 text-sm text-gray-900 bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm whitespace-pre-line">
              {property.charitableContribution || 'No charitable contributions specified'}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default ContractOverview; 