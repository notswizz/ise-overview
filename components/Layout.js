import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

// Theme colors based on ISE logo
const theme = {
  primary: '#6ea8d8', // Updated ISE blue
  primaryLight: '#8cbae2',
  primaryDark: '#5a96c8',
  secondary: '#000000', // Black
  white: '#ffffff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    500: '#6b7280',
    700: '#374151',
    900: '#111827',
  }
};

export default function Layout({ children, title = 'ISE Sports Agency' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="ISE Sports Agency Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-[#6ea8d8] shadow-md border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="flex items-center">
                    <img 
                      src="/images/ise.jpeg" 
                      alt="ISE Sports Agency" 
                      className="h-10 w-auto rounded-md shadow-sm border-2 border-black" 
                    />
                    <span className="ml-3 text-xl font-bold text-white drop-shadow-md">ISE - Properties</span>
                  </div>
                </Link>
              </div>
             
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-[#5a96c8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white border border-black"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/">
              <span className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:text-gray-200 hover:bg-[#5a96c8] border-l-2 border-black">
                Independent Sports and Entertainment (ISE) Overview
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-full mx-auto p-3 sm:p-4 md:p-5 lg:p-6">
        {children}
      </main>


    </div>
  );
} 