const RestrictionsSection = ({ property }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Restrictions & Exemptions
      </h2>
      
      {/* Card for Prohibited Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-gray-900 font-semibold flex items-center">
              <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Prohibited Categories
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Categories that are not allowed for this property
            </p>
          </div>
          
          <div className="bg-red-50 p-2 rounded-lg">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
        
        {property.prohibitedCategories && property.prohibitedCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.prohibitedCategories.map((category, index) => (
              <div 
                key={index}
                className="flex items-center p-3 bg-red-50 border border-red-100 rounded-lg"
              >
                <svg className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium text-red-800 truncate">{category}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-500 text-sm italic">No prohibited categories have been specified</span>
          </div>
        )}
      </div>
      
      {/* Card for Carve Outs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-gray-900 font-semibold flex items-center">
              <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Carve Outs & Exemptions
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Special exceptions to the restrictions
            </p>
          </div>
          
          <div className="bg-blue-50 p-2 rounded-lg">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          {property.carveOuts ? (
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {property.carveOuts}
            </div>
          ) : (
            <div className="text-center p-4">
              <span className="text-gray-500 text-sm italic">No carve outs have been specified for this property</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional Restrictions Section (if applicable) */}
      {property.additionalRestrictions && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Additional Restrictions
          </h3>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <p className="text-gray-700 whitespace-pre-line">{property.additionalRestrictions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestrictionsSection; 