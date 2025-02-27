import { motion } from 'framer-motion';
import YearlyBreakdown from './YearlyBreakdown';

const CalculationDetails = ({ calculationData }) => {
  // Count the number of years in the breakdown
  const yearCount = calculationData && calculationData.yearlyBreakdown ? 
    Object.keys(calculationData.yearlyBreakdown).length : 0;
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md border-2 border-[#6ea8d8]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Revenue Breakdown ({yearCount})
      </h2>
      
      <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {calculationData && calculationData.yearlyBreakdown && (
          <YearlyBreakdown yearlyBreakdown={calculationData.yearlyBreakdown} />
        )}
      </div>
    </motion.div>
  );
};

export default CalculationDetails;

// Add custom scrollbar styles to your global CSS file:
// .custom-scrollbar::-webkit-scrollbar {
//   width: 8px;
// }
// .custom-scrollbar::-webkit-scrollbar-track {
//   background: #f1f1f1;
//   border-radius: 10px;
// }
// .custom-scrollbar::-webkit-scrollbar-thumb {
//   background: #c4c4c4;
//   border-radius: 10px;
// }
// .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//   background: #a5a5a5;
// } 