import { motion } from 'framer-motion';
import { useState } from 'react';

const YearlyBreakdown = ({ yearlyBreakdown }) => {
  const [expandedYear, setExpandedYear] = useState(null);
  const sortedYears = Object.keys(yearlyBreakdown).sort((a, b) => parseInt(a) - parseInt(b));
  
  const toggleYear = (year) => {
    if (expandedYear === year) {
      setExpandedYear(null);
    } else {
      setExpandedYear(year);
    }
  };
  
  const yearlyTotals = {};
  sortedYears.forEach(year => {
    yearlyTotals[year] = yearlyBreakdown[year].reduce((sum, item) => sum + item.contribution, 0);
  });
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-md font-semibold mb-3 text-gray-700 flex items-center">
        <svg className="w-4 h-4 mr-2 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Revenue Breakdown
      </h3>
      
      <div className="space-y-4">
        {sortedYears.map((year, index) => {
          const properties = yearlyBreakdown[year];
          const totalYearRevenue = yearlyTotals[year];
          const isExpanded = expandedYear === year;
          
          return (
            <motion.div 
              key={year} 
              className={`bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${isExpanded ? 'ring-2 ring-[#6ea8d8]' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
              layout
            >
              <div 
                className="flex justify-between items-center mb-2 cursor-pointer"
                onClick={() => toggleYear(year)}
              >
                <div className="flex items-center">
                  <svg 
                    className={`w-4 h-4 mr-1 text-[#6ea8d8] transition-transform duration-300 ${isExpanded ? 'transform rotate-90' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <h4 className="font-bold text-lg text-gray-800">{year}</h4>
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({properties.length} {properties.length === 1 ? 'property' : 'properties'})
                  </span>
                </div>
                <span className="text-xl font-bold text-[#6ea8d8]">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalYearRevenue)}
                </span>
              </div>
              
              {isExpanded && (
                <motion.ul 
                  className="space-y-1 mt-3 border-t border-gray-200 pt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {properties
                    .sort((a, b) => b.contribution - a.contribution)
                    .map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex justify-between items-center py-2 border-b border-gray-100 text-sm"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800">{item.property}</span>
                          {item.contractYear && item.totalYears && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full shadow-sm">
                              Year {item.contractYear} of {item.totalYears}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-[#6ea8d8]">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.contribution)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round((item.contribution / totalYearRevenue) * 100)}% of year
                          </span>
                        </div>
                      </motion.li>
                    ))}
                </motion.ul>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default YearlyBreakdown; 