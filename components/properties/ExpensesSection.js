const ExpensesSection = ({ property }) => {
  return (
    <>
      <div className="border-b-2 border-[#6ea8d8]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#6ea8d8]/10 to-white">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg className="h-5 w-5 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            T&E Reimbursements
          </h2>
        </div>
      </div>
      
      <div className="px-6 py-5">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="border-b border-[#6ea8d8]/50">
            <div className="px-4 py-3 bg-gradient-to-r from-[#6ea8d8]/5 to-white">
              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Expense Details
              </h3>
            </div>
          </div>
          <div className="px-4 py-3">
            {property.teReimbursements ? (
              <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
                <p className="text-sm font-medium text-gray-800">{property.teReimbursements}</p>
              </div>
            ) : (
              <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm text-center">
                <p className="text-sm text-gray-500 italic">No T&E reimbursements specified</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesSection; 