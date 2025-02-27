import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import PasswordProtection with no SSR to avoid hydration issues with localStorage
const PasswordProtection = dynamic(() => import('../components/PasswordProtection'), {
  ssr: false
});

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        
        if (data.success) {
          // Sort properties alphabetically by name
          const sortedProperties = [...data.data].sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          setProperties(sortedProperties);
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

  // Filter properties based on search term and status
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase());
    const now = new Date();
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'active') {
      // A contract is active if the current date is between the start date and expiration date
      const isActive = property.contractExpiration && new Date(property.contractExpiration) > now;
      return matchesSearch && isActive;
    }
    if (filterStatus === 'expired') {
      // A contract is completed if the current date is after the expiration date
      const isCompleted = property.contractExpiration && new Date(property.contractExpiration) < now;
      return matchesSearch && isCompleted;
    }
    return matchesSearch;
  });

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Wrap the content with password protection
  const renderContent = () => {
    return (
      <Layout title="ISE Sports Agency | Properties">
        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          {/* Left Column - Property Cards (2/3 width) */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Welcome & Dashboard Header */}
            <div className="mb-6 bg-gradient-to-r from-[#6ea8d8]/20 to-white p-4 rounded-lg border border-[#6ea8d8]">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Property Portfolio</h1>
                </div>
                <div className="relative flex-grow mx-4 hidden md:block">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-lg focus:ring-[#6ea8d8] focus:border-[#6ea8d8] shadow-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="hidden md:block">
                  <img src="/images/ise.jpeg" alt="ISE Logo" className="h-12 w-auto rounded-md shadow-sm border border-black" />
                </div>
              </div>
              <div className="relative mt-2 md:hidden">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-lg focus:ring-[#6ea8d8] focus:border-[#6ea8d8] shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#6ea8d8] border-l-2 border-r-2 border-black"></div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-red-50 rounded-lg shadow-sm border border-red-200">
                <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="mt-4 text-lg font-medium text-gray-900">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {filteredProperties.length > 0 ? (
                  <div className="h-[calc(100vh-300px)] min-h-[400px] max-h-[550px] overflow-y-auto pr-2 pb-4">
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredProperties.map((property) => (
                        <motion.div 
                          key={property._id || property.id} 
                          variants={itemVariants}
                          whileHover={{ 
                            scale: 1.03,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <PropertyCard property={property} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                    <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-gray-600">No properties found matching your criteria</p>
                    <div className="mt-4 flex justify-center space-x-3">
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')} 
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Clear Search
                        </button>
                      )}
                      {filterStatus !== 'all' && (
                        <button 
                          onClick={() => setFilterStatus('all')} 
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Show All
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Quick Actions */}
            {!loading && !error && filteredProperties.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="/admin/properties/new" 
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] transition-all border-2 border-black"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Property
                  </a>
                  <a 
                    href="/admin" 
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Dashboard
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Filters and Stats (1/3 width) */}
          <div className="lg:w-1/3 mt-6 lg:mt-0 flex flex-col">
            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border-2 border-[#6ea8d8]">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h2>
              
              {/* Filter Tabs */}
              <div className="bg-gray-50 p-1 rounded-lg border border-gray-200 grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    filterStatus === 'all'
                      ? 'bg-[#6ea8d8] text-white shadow-sm border border-black'
                      : 'bg-white text-gray-700 border border-transparent hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('active')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    filterStatus === 'active'
                      ? 'bg-[#6ea8d8] text-white shadow-sm border border-black'
                      : 'bg-white text-gray-700 border border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                    Active
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('expired')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    filterStatus === 'expired'
                      ? 'bg-[#6ea8d8] text-white shadow-sm border border-black'
                      : 'bg-white text-gray-700 border border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Completed
                  </span>
                </button>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-[#6ea8d8]">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Stats Overview
              </h2>
              
              <div className="space-y-3">
                {/* Total Properties */}
                <div className="bg-gradient-to-r from-gray-100 to-white rounded-lg p-3 border-2 border-gray-300 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Total Properties</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">{properties.length}</p>
                    </div>
                    <div className="bg-gray-200 p-2 rounded-full border-2 border-black">
                      <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Active Contracts */}
                <div className="bg-gradient-to-r from-[#6ea8d8]/20 to-white rounded-lg p-3 border-2 border-[#6ea8d8] relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Active Contracts</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        {properties.filter(p => p.contractExpiration && new Date(p.contractExpiration) > new Date()).length}
                      </p>
                    </div>
                    <div className="bg-[#6ea8d8]/20 p-2 rounded-full border-2 border-black">
                      <svg className="h-5 w-5 text-[#6ea8d8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#6ea8d8] h-2 rounded-full" 
                        style={{ 
                          width: `${properties.length ? (properties.filter(p => p.contractExpiration && new Date(p.contractExpiration) > new Date()).length / properties.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Total Projected Value */}
                  {properties.filter(p => p.contractExpiration && new Date(p.contractExpiration) > new Date() && p.projectedAnnualDeal > 0).length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#6ea8d8]/30">
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Projected Value</p>
                      <p className="text-lg font-bold text-[#6ea8d8] mt-1">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0
                        }).format(
                          properties
                            .filter(p => p.contractExpiration && new Date(p.contractExpiration) > new Date())
                            .reduce((total, p) => total + (p.projectedAnnualDeal || 0) * (p.dealTermLength || 1), 0)
                        )}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Completed Contracts */}
                <div className="bg-gradient-to-r from-green-50 to-white rounded-lg p-3 border-2 border-green-500 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Completed Contracts</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        {properties.filter(p => p.contractExpiration && new Date(p.contractExpiration) < new Date()).length}
                      </p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-full border-2 border-black">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ 
                          width: `${properties.length ? (properties.filter(p => p.contractExpiration && new Date(p.contractExpiration) < new Date()).length / properties.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Total Actual Value */}
                  {properties.filter(p => p.contractExpiration && new Date(p.contractExpiration) < new Date() && p.actualAnnualDeal > 0).length > 0 && (
                    <div className="mt-2 pt-2 border-t border-green-200">
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Total Value</p>
                      <p className="text-lg font-bold text-green-600 mt-1">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0
                        }).format(
                          properties
                            .filter(p => p.contractExpiration && new Date(p.contractExpiration) < new Date())
                            .reduce((total, p) => total + (p.actualAnnualDeal || 0) * (p.dealTermLength || 1), 0)
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
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
