import Head from 'next/head';
import Link from 'next/link';

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

export default function Layout({ children, title = 'ISE Sports Agency', description = 'ISE Sports Agency Property Portfolio Dashboard' }) {
  // Define constants for SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ise-properties.com';
  const ogImageUrl = `${siteUrl}/images/ise.jpeg`;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* Additional SEO tags */}
        <meta name="theme-color" content="#6ea8d8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ISE Sports Agency" />
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

              {/* Navigation Links - Desktop */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {/* Navigation links removed as per user request */}
              </div>
             
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              {/* Mobile menu button removed since there are no nav links */}
            </div>
          </div>
        </div>

        {/* Mobile menu removed - no longer needed */}

      </header>

      <main className="flex-1 w-full max-w-full mx-auto p-3 sm:p-4 md:p-5 lg:p-6">
        {children}
      </main>


    </div>
  );
} 