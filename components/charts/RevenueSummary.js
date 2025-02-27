import { motion } from 'framer-motion';

const RevenueSummary = ({ chartData, properties }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md border-2 border-[#6ea8d8]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Revenue Summary
      </h2>
      
      {chartData && chartData.datasets && chartData.datasets[0] && (
        <div className="grid grid-cols-1 gap-4">
          <motion.div 
            className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <p className="text-sm font-medium text-gray-500">Total Cumulative Revenue</p>
            <p className="text-2xl font-bold text-gray-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(chartData.datasets[0].data.reduce((sum, value) => sum + value, 0))}
            </p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <p className="text-sm font-medium text-gray-500">Highest Annual Revenue</p>
            <p className="text-2xl font-bold text-gray-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(Math.max(...chartData.datasets[0].data))}
            </p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <p className="text-sm font-medium text-gray-500">Average Annual Revenue</p>
            <p className="text-2xl font-bold text-gray-700">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(
                chartData.datasets[0].data.reduce((sum, value) => sum + value, 0) / chartData.datasets[0].data.length
              )}
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RevenueSummary; 