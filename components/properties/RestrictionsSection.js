const RestrictionsSection = ({ property }) => {
  return (
    <>
      <div className="border-b-2 border-[#6ea8d8]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#6ea8d8]/10 to-white">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg className="h-5 w-5 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Restrictions & Exemptions
          </h2>
        </div>
      </div>
      <div className="px-6 py-5">
        <dl className="grid grid-cols-1 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-3">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Carve Outs
            </dt>
            <dd className="mt-1 text-sm text-gray-900 bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm whitespace-pre-line">
              {property.carveOuts ? 
                <div className="font-medium">{property.carveOuts}</div> : 
                <div className="text-gray-500 italic">No carve outs have been specified for this property</div>}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-3">
              <svg className="h-4 w-4 text-[#6ea8d8] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Prohibited Categories
            </dt>
            <dd className="mt-1">
              {property.prohibitedCategories && property.prohibitedCategories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {property.prohibitedCategories.map((category, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-800 border border-red-200 shadow-sm hover:bg-red-100 transition-colors"
                    >
                      <svg className="h-3 w-3 mr-1.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {category}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm">
                  <span className="text-sm text-gray-500 italic">No prohibited categories have been specified</span>
                </div>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default RestrictionsSection; 