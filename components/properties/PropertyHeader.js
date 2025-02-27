import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContractOverview from './ContractOverview';
import RestrictionsSection from './RestrictionsSection';
import ContactsSection from './ContactsSection';
import ExpensesSection from './ExpensesSection';

const PropertyHeader = ({ property, id }) => {
  const [activeTab, setActiveTab] = useState('media');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-xl border border-gray-200 w-full h-full">
      {/* Top Navigation Bar - Slimmer and More Modern */}
      <div className="flex justify-between items-center px-4 sm:px-5 py-2.5 bg-white border-b border-gray-200">
        <div className="flex items-center">
          {/* Mobile Sidebar Toggle */}
          <button 
            className="mr-3 md:hidden text-gray-700 hover:text-[#4d94d1] transition-colors duration-200" 
            onClick={toggleMobileSidebar}
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center text-gray-700 hover:text-[#4d94d1] transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Back</span>
          </Link>
        </div>
        
        <Link 
          href={`/admin/properties/edit/${id}`} 
          className="flex items-center px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#4d94d1] to-[#3a84c3] hover:from-[#3a84c3] hover:to-[#2d74b3] transition-all duration-300 shadow-sm transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="hidden sm:inline">Edit</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row h-[calc(100%-2.75rem)]">
        {/* Left Sidebar - Property Info - Fixed on md+ screens, Modal on mobile */}
        <div 
          className={`${
            mobileSidebarOpen ? 'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm' : 'hidden'
          } md:hidden transition-all duration-300`}
          onClick={toggleMobileSidebar}
        ></div>

        <div 
          className={`${
            mobileSidebarOpen 
              ? 'fixed left-0 top-0 bottom-0 z-50 w-72 shadow-xl translate-x-0' 
              : 'fixed -translate-x-full'
          } md:static md:translate-x-0 transition-transform duration-300 ease-in-out w-72 md:w-64 lg:w-72 bg-gradient-to-b from-[#5a9fd8] to-[#3a84c3] text-white md:flex flex-col`}
        >
          {/* Mobile close button */}
          <div className="p-3 flex justify-between items-center md:hidden border-b border-white/10">
            <h2 className="font-bold text-lg tracking-wide">Property Details</h2>
            <button 
              onClick={toggleMobileSidebar}
              className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 md:p-5 flex flex-col h-full">
            {/* Logo with enhanced design - cooler border and effects */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 blur-xl rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-300 via-purple-400 to-blue-500 opacity-10 blur-lg rounded-2xl animate-pulse"></div>
              
              <div className="relative bg-white p-3.5 rounded-2xl mx-auto z-10 overflow-hidden shadow-xl
                before:absolute before:inset-0 before:p-[3px] before:rounded-2xl before:bg-gradient-to-r before:from-[#4d94d1] before:via-[#6ea8d8] before:to-[#4d94d1] before:content-[''] before:-z-10 before:opacity-80">
                <div className="bg-white p-3 rounded-xl relative z-10">
                  {property.logo ? (
                    <img
                      src={property.logo}
                      alt={property.name}
                      className="w-20 h-20 object-contain mx-auto drop-shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-[#4d94d1] text-3xl font-bold drop-shadow-sm">
                        {property.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-white to-blue-100 rounded-full opacity-60 blur-sm"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-white to-blue-100 rounded-full opacity-60 blur-sm"></div>
            </div>
            
            {/* Property Information with enhanced design - more compact */}
            <div className="space-y-3 mb-5">
              <div className="text-center md:text-left">
                <h1 className="text-xl font-bold mb-1 tracking-tight text-white drop-shadow-sm">{property.name}</h1>
                {property.sunsetName && (
                  <p className="text-white/90 text-sm font-medium tracking-wide">
                    {property.sunsetName}
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm">
                  {property.mmrHolder || 'N/A'}
                </span>
                {property.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm">
                    {property.category}
                  </span>
                )}
              </div>
              
              <div className="pt-3 border-t border-white/20">
                {/* Removed annual deal display section */}
              </div>
            </div>
            
            {/* Tab Navigation - Vertical with enhanced styling - more compact */}
            <div className="flex-grow flex flex-col space-y-2">
              <button
                onClick={() => { 
                  setActiveTab('media');
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 text-left
                  ${activeTab === 'media' 
                    ? 'bg-white text-[#4d94d1] font-medium shadow-lg transform translate-x-1' 
                    : 'text-white hover:bg-white/10'}`}
              >
                <div className={`p-1.5 rounded-md mr-3 flex-shrink-0 ${activeTab === 'media' ? 'bg-[#4d94d1]/10' : 'bg-white/10'}`}>
                  <svg className={`h-4 w-4 ${activeTab === 'media' ? 'text-[#4d94d1]' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Media</span>
              </button>
              
              <button
                onClick={() => { 
                  setActiveTab('overview');
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 text-left
                  ${activeTab === 'overview' 
                    ? 'bg-white text-[#4d94d1] font-medium shadow-lg transform translate-x-1' 
                    : 'text-white hover:bg-white/10'}`}
              >
                <div className={`p-1.5 rounded-md mr-3 flex-shrink-0 ${activeTab === 'overview' ? 'bg-[#4d94d1]/10' : 'bg-white/10'}`}>
                  <svg className={`h-4 w-4 ${activeTab === 'overview' ? 'text-[#4d94d1]' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span>Contract</span>
              </button>
              
              <button
                onClick={() => { 
                  setActiveTab('restrictions');
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 text-left
                  ${activeTab === 'restrictions' 
                    ? 'bg-white text-[#4d94d1] font-medium shadow-lg transform translate-x-1' 
                    : 'text-white hover:bg-white/10'}`}
              >
                <div className={`p-1.5 rounded-md mr-3 flex-shrink-0 ${activeTab === 'restrictions' ? 'bg-[#4d94d1]/10' : 'bg-white/10'}`}>
                  <svg className={`h-4 w-4 ${activeTab === 'restrictions' ? 'text-[#4d94d1]' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span>Restrictions</span>
              </button>
              
              <button
                onClick={() => { 
                  setActiveTab('contacts');
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 text-left
                  ${activeTab === 'contacts' 
                    ? 'bg-white text-[#4d94d1] font-medium shadow-lg transform translate-x-1' 
                    : 'text-white hover:bg-white/10'}`}
              >
                <div className={`p-1.5 rounded-md mr-3 flex-shrink-0 ${activeTab === 'contacts' ? 'bg-[#4d94d1]/10' : 'bg-white/10'}`}>
                  <svg className={`h-4 w-4 ${activeTab === 'contacts' ? 'text-[#4d94d1]' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span>Contacts</span>
              </button>
              
              <button
                onClick={() => { 
                  setActiveTab('expenses');
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 text-left
                  ${activeTab === 'expenses' 
                    ? 'bg-white text-[#4d94d1] font-medium shadow-lg transform translate-x-1' 
                    : 'text-white hover:bg-white/10'}`}
              >
                <div className={`p-1.5 rounded-md mr-3 flex-shrink-0 ${activeTab === 'expenses' ? 'bg-[#4d94d1]/10' : 'bg-white/10'}`}>
                  <svg className={`h-4 w-4 ${activeTab === 'expenses' ? 'text-[#4d94d1]' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>T&E</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Tab Navigation - Visible below md breakpoint when sidebar is closed */}
        <div className="md:hidden flex overflow-x-auto border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab('media')}
            className={`py-3 px-4 font-medium text-sm transition-all duration-200 relative flex-shrink-0
              ${activeTab === 'media' 
                ? 'text-[#4d94d1] border-b-2 border-[#4d94d1] -mb-px' 
                : 'text-gray-600 hover:text-[#4d94d1]'}`}
          >
            <svg className={`h-4 w-4 mx-auto mb-1 ${activeTab === 'media' ? 'text-[#4d94d1]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Media</span>
          </button>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 font-medium text-sm transition-all duration-200 relative flex-shrink-0
              ${activeTab === 'overview' 
                ? 'text-[#4d94d1] border-b-2 border-[#4d94d1] -mb-px' 
                : 'text-gray-600 hover:text-[#4d94d1]'}`}
          >
            <svg className={`h-4 w-4 mx-auto mb-1 ${activeTab === 'overview' ? 'text-[#4d94d1]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Contract</span>
          </button>
          
          <button
            onClick={() => setActiveTab('restrictions')}
            className={`py-3 px-4 font-medium text-sm transition-all duration-200 relative flex-shrink-0
              ${activeTab === 'restrictions' 
                ? 'text-[#4d94d1] border-b-2 border-[#4d94d1] -mb-px' 
                : 'text-gray-600 hover:text-[#4d94d1]'}`}
          >
            <svg className={`h-4 w-4 mx-auto mb-1 ${activeTab === 'restrictions' ? 'text-[#4d94d1]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Restrictions</span>
          </button>
          
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3 px-4 font-medium text-sm transition-all duration-200 relative flex-shrink-0
              ${activeTab === 'contacts' 
                ? 'text-[#4d94d1] border-b-2 border-[#4d94d1] -mb-px' 
                : 'text-gray-600 hover:text-[#4d94d1]'}`}
          >
            <svg className={`h-4 w-4 mx-auto mb-1 ${activeTab === 'contacts' ? 'text-[#4d94d1]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Contacts</span>
          </button>
          
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-3 px-4 font-medium text-sm transition-all duration-200 relative flex-shrink-0
              ${activeTab === 'expenses' 
                ? 'text-[#4d94d1] border-b-2 border-[#4d94d1] -mb-px' 
                : 'text-gray-600 hover:text-[#4d94d1]'}`}
          >
            <svg className={`h-4 w-4 mx-auto mb-1 ${activeTab === 'expenses' ? 'text-[#4d94d1]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>T&E</span>
          </button>
        </div>
        
        {/* Right Content Area - Tab Content */}
        <div className="flex-1 bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full"
            >
              {activeTab === 'media' && (
                <div className="h-full w-full">
                  {property.coverPhoto ? (
                    <div className="relative h-full w-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${property.coverPhoto})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'blur(30px)',
                          opacity: 0.3,
                          transform: 'scale(1.1)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-70"></div>
                      <div 
                        className="h-full w-full bg-cover bg-center relative flex items-center justify-center"
                        style={{ 
                          backgroundImage: `url(${property.coverPhoto})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center p-10">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500 text-xl font-medium block">No media available</span>
                        <p className="text-gray-400 mt-2">Property images will appear here when added</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'overview' && (
                <div className="h-full overflow-auto">
                  <ContractOverview property={property} />
                </div>
              )}
              
              {activeTab === 'restrictions' && (
                <div className="h-full overflow-auto">
                  <RestrictionsSection property={property} />
                </div>
              )}
              
              {activeTab === 'contacts' && (
                <div className="h-full overflow-auto">
                  <ContactsSection property={property} />
                </div>
              )}
              
              {activeTab === 'expenses' && (
                <div className="h-full overflow-auto">
                  <ExpensesSection property={property} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader; 