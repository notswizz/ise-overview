import Link from 'next/link';
import Layout from '../Layout';

export const LoadingState = () => (
  <Layout title="Loading Property Details">
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ea8d8] border-l-2 border-r-2 border-black"></div>
    </div>
  </Layout>
);

export const NotFoundState = () => (
  <Layout title="Property Not Found">
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Property Not Found</h1>
      <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
      <Link href="/">
        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black">
          Return to Homepage
        </span>
      </Link>
    </div>
  </Layout>
);

export const InvalidIdState = ({ id }) => (
  <Layout title="Invalid Property ID">
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid Property ID</h1>
      <p className="text-gray-600 mb-2">The property ID format is invalid:</p>
      <p className="font-mono bg-gray-100 p-2 rounded mb-6 inline-block">{id}</p>
      <p className="text-gray-600 mb-6">Please check the URL and try again.</p>
      <Link href="/">
        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black">
          Return to Homepage
        </span>
      </Link>
    </div>
  </Layout>
);

export const ErrorState = ({ error, router }) => (
  <Layout title="Error">
    <div className="text-center py-12">
      <p className="text-red-500">{error}</p>
      <button 
        onClick={() => router.push('/')} 
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black"
      >
        Return to Homepage
      </button>
    </div>
  </Layout>
);

export const EmptyPropertyState = ({ router }) => (
  <Layout title="Property Not Found">
    <div className="text-center py-12">
      <p className="text-gray-500">Property not found</p>
      <button 
        onClick={() => router.push('/')} 
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a96c8] border-2 border-black"
      >
        Return to Homepage
      </button>
    </div>
  </Layout>
); 