import { motion } from 'framer-motion';

const PropertyList = ({ includedProperties }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    
      
      <div className="overflow-auto max-h-96 border border-gray-200 rounded-md shadow-inner bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Annual Deal</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Commission</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Take Home</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">Term</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">Contract Period</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {includedProperties.map((prop, i) => (
              <motion.tr 
                key={i} 
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ backgroundColor: '#f0f7ff' }}
              >
                <td className="px-4 py-3 font-medium text-gray-900">{prop.name}</td>
                <td className="px-4 py-3 text-right text-gray-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(prop.annualDeal)}</td>
                <td className="px-4 py-3 text-right text-gray-700">{prop.commissionRate}</td>
                <td className="px-4 py-3 text-right font-medium text-[#6ea8d8]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(prop.takeHome)}</td>
                <td className="px-4 py-3 text-center text-gray-700">{prop.termLength} {prop.termLength === 1 ? 'year' : 'years'}</td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {typeof prop.startYear === 'number' && typeof prop.endYear === 'number' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-100 text-green-800">
                      {prop.startYear} - {prop.endYear}
                    </span>
                  ) : 'N/A'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PropertyList; 