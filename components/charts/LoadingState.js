import { motion } from 'framer-motion';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="h-12 w-12 border-t-4 border-b-4 border-[#6ea8d8] border-l-2 border-r-2 border-black rounded-full"
      />
      
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mt-4 text-gray-600 font-medium"
      >
        Loading revenue data...
      </motion.div>
      
      <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
            className="h-2 bg-gray-200 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingState; 