import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContractOverview from './ContractOverview';
import RestrictionsSection from './RestrictionsSection';
import ContactsSection from './ContactsSection';
import ExpensesSection from './ExpensesSection';

const PropertyHeader = ({ property, id }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const mainContentRef = useRef(null);
  
  // Handle scroll events for content area
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setIsScrolled(mainContentRef.current.scrollTop > 10);
      }
    };
    
    const currentRef = mainContentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Tabs configuration
  const tabs = [
    {
      id: 'overview',
      label: 'Contract',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'restrictions',
      label: 'Restrictions',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'expenses',
      label: 'Expenses',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
      {/* Top Bar with Back Navigation and Actions */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition group">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 group-hover:bg-blue-50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium text-sm">Back</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link href={`/admin/properties/edit/${id}`} 
                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>Edit</span>
          </Link>
        </div>
      </div>

      {/* Hero Section with Property Details */}
      <div 
        className="relative z-10 pt-12 pb-12 px-6 sm:px-10 shadow-sm"
        style={{
          background: property.coverPhoto 
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${property.coverPhoto})`
            : 'linear-gradient(to right, #1e3a8a, #3b82f6)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        }}
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Property Logo */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <div className="relative h-24 w-24 md:h-36 md:w-36 rounded-2xl bg-white shadow-xl p-3 border border-gray-100 overflow-hidden">
              {property.logo ? (
                <div className="relative h-full w-full">
                  <img 
                    src={property.logo}
                    alt={property.name}
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
                  <span className="text-blue-600 text-2xl md:text-4xl font-bold">
                    {property.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Property Information */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                  {property.name || 'Unnamed Property'}
                </h1>
                {property.sunsetName && (
                  <p className="text-gray-200 text-sm font-medium">
                    {property.sunsetName}
                  </p>
                )}
              </div>
            </div>
            
            {/* Status Badges */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {property.mmrHolder && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                   {property.mmrHolder}
                </span>
              )}
              {property.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                  {property.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className={`sticky top-0 z-10 flex bg-white border-b border-gray-200 ${isScrolled ? 'shadow-sm' : ''} transition-shadow duration-200`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center py-3 px-4 text-sm font-medium border-b-2 transition-all duration-200 relative flex-1
              ${activeTab === tab.id 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-200'}`}
          >
            <div className="flex items-center justify-center mx-auto">
              <div className={`mr-2 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`}>
                {tab.icon}
              </div>
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div
        ref={mainContentRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'overview' && (
              <div className="py-4 h-full overflow-auto">
                <ContractOverview property={property} />
              </div>
            )}
            
            {activeTab === 'restrictions' && (
              <div className="py-4 h-full overflow-auto">
                <RestrictionsSection property={property} />
              </div>
            )}
            
            {activeTab === 'contacts' && (
              <div className="py-4 h-full overflow-auto">
                <ContactsSection property={property} />
              </div>
            )}
            
            {activeTab === 'expenses' && (
              <div className="py-4 h-full overflow-auto">
                <ExpensesSection property={property} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyHeader; 