import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  RevenueChart, 
  RevenueSummary, 
  CalculationDetails,
  LoadingState,
  ErrorState,
  PropertyList
} from '../components/charts';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Import PasswordProtection with no SSR to avoid hydration issues with localStorage
const PasswordProtection = dynamic(() => import('../components/PasswordProtection'), {
  ssr: false
});

export default function Charts() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [calculationData, setCalculationData] = useState({
    includedProperties: [],
    yearlyBreakdown: {},
    propertiesWithCommission: 0,
    totalProperties: 0
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data);
          processChartData(data.data);
        } else {
          setError('Failed to fetch properties');
        }
      } catch (err) {
        setError('An error occurred while fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Process properties data to calculate take-home revenue by year
  const processChartData = (propertiesData) => {
    // Create an object to store yearly revenue
    const yearlyRevenue = {};
    let propertiesWithCommission = 0;
    let invalidCommissionCount = 0;
    let includedProperties = [];
    const yearlyBreakdown = {};
    
    propertiesData.forEach(property => {
      // Skip if no actual annual deal
      if (!property.actualAnnualDeal) {
        console.log(`Skipping ${property.name}: No actual annual deal value`);
        return;
      }
      
      // Parse commission percentage (assuming it's stored as a string like "15%" or "0.15")
      let commissionRate = 0;
      if (property.commission) {
        // Remove % sign if present and convert to decimal
        const commissionString = property.commission.replace('%', '').trim();
        commissionRate = parseFloat(commissionString) / 100;
        
        if (isNaN(commissionRate)) {
          console.warn(`Invalid commission format for ${property.name}: ${property.commission}`);
          invalidCommissionCount++;
          return; // Skip properties with invalid commission format
        }
        
        propertiesWithCommission++;
      } else {
        console.log(`Skipping ${property.name}: No commission information`);
        return; // Skip properties with no commission information
      }
      
      // Calculate ISE's take-home amount
      const annualDeal = property.actualAnnualDeal || 0;
      const takeHome = annualDeal * commissionRate;
      
      console.log(`Property: ${property.name}, Annual Deal: $${annualDeal.toLocaleString()}, Commission: ${(commissionRate * 100).toFixed(1)}%, Take Home: $${takeHome.toLocaleString()}`);
      
      if (takeHome <= 0) {
        console.log(`Skipping ${property.name}: Zero or negative take-home value`);
        return; // Skip if no take-home value
      }
      
      // Get the term length - this is our primary source of truth
      let termLength = property.dealTermLength || 1; // Default to 1 year if not specified
      console.log(`  Term length for ${property.name}: ${termLength} years`);
      
      // Determine start year
      let startYear;
      if (property.contractStartDate) {
        startYear = new Date(property.contractStartDate).getFullYear();
      } else if (property.contractExpiration && termLength) {
        // If we only have expiration date, calculate start year by going back term length years
        const endDate = new Date(property.contractExpiration);
        startYear = endDate.getFullYear() - termLength;
      } else {
        // If no dates are available, default to current year
        startYear = new Date().getFullYear();
      }
      
      // Calculate end year based on start year + term length - 1 (since the first year counts as year 1)
      const endYear = startYear + termLength - 1;
      
      console.log(`  Contract for ${property.name}: ${termLength} years (${startYear}-${endYear})`);
      
      // Store for the debug view
      includedProperties.push({
        name: property.name,
        annualDeal,
        commissionRate: (commissionRate * 100).toFixed(1) + '%',
        takeHome,
        termLength,
        startYear,
        endYear
      });
      
      // Add revenue for each year from start to end year (inclusive)
      for (let year = startYear; year <= endYear; year++) {
        yearlyRevenue[year] = (yearlyRevenue[year] || 0) + takeHome;
        
        // For detailed breakdown
        if (!yearlyBreakdown[year]) yearlyBreakdown[year] = [];
        yearlyBreakdown[year].push({
          property: property.name,
          contribution: takeHome,
          contractYear: year - startYear + 1,
          totalYears: termLength
        });
        
        console.log(`    Adding $${takeHome.toLocaleString()} to year ${year}, new total: $${yearlyRevenue[year].toLocaleString()}`);
      }
    });
    
    console.log(`Properties with valid commission data: ${propertiesWithCommission}`);
    console.log(`Properties with invalid commission format: ${invalidCommissionCount}`);
    console.log('Included Properties:', includedProperties);
    console.log('Final Yearly Revenue:', yearlyRevenue);
    
    // Convert the yearlyRevenue object to arrays for Chart.js
    const years = Object.keys(yearlyRevenue).sort();
    const revenues = years.map(year => yearlyRevenue[year]);
    
    // Log the final dataset values
    console.log('Chart Data:');
    years.forEach((year, index) => {
      console.log(`Year ${year}: $${revenues[index].toLocaleString()}`);
    });
    
    // Save calculation data for debugging
    setCalculationData({
      includedProperties,
      yearlyBreakdown,
      propertiesWithCommission,
      totalProperties: propertiesData.length,
      yearlyRevenue
    });
    
    setChartData({
      labels: years,
      datasets: [
        {
          label: 'ISE Commission Revenue',
          data: revenues,
          backgroundColor: '#6ea8d8',
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    });
  };

  // Wrap the content with password protection
  const renderContent = () => {
    return (
      <Layout title="ISE Sports Agency | Revenue Charts">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={() => window.location.reload()} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Main Chart - Annual Take-Home Revenue */}
                <RevenueChart chartData={chartData} />
                
                {/* Properties List */}
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[#6ea8d8]">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Included in Calculation ({calculationData.includedProperties.length})
                  </h2>
                  <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <PropertyList includedProperties={calculationData.includedProperties} />
                  </div>
                </div>
              </div>
              
              {/* Summary Stats and Yearly Breakdown */}
              <div className="flex flex-col gap-6">
                <RevenueSummary 
                  chartData={chartData} 
                  properties={properties} 
                />
                <CalculationDetails calculationData={calculationData} />
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  };

  return (
    <PasswordProtection>
      {renderContent()}
    </PasswordProtection>
  );
} 