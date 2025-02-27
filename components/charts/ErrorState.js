import { motion } from 'framer-motion';

const ErrorState = ({ error, onRetry }) => {
  return (
    <motion.div 
      className="text-center py-16 bg-red-50 rounded-lg shadow-sm border border-red-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg 
        className="mx-auto h-12 w-12 text-red-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ 
          duration: 0.5,
          times: [0, 0.25, 0.75, 1],
          delay: 0.5
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </motion.svg>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="mt-4 text-lg font-medium text-gray-900">{error}</p>
        <button 
          onClick={onRetry} 
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ErrorState; 