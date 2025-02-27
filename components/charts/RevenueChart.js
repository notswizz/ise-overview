import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const RevenueChart = ({ chartData }) => {
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ISE Annual Commission Revenue by Year',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Revenue: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(context.raw)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
              notation: 'compact'
            }).format(value);
          }
        }
      }
    }
  };

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md border-2 border-[#6ea8d8]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Annual Commission Revenue</h2>
      <div className="h-[400px] w-full">
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </motion.div>
  );
};

export default RevenueChart; 