import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data);
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

  return (
    <Layout title="Admin Dashboard | ISE Properties">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link href="/">
            <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#003594] hover:bg-[#002a7a]">
              Back to Home
            </span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003594]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#003594] hover:bg-[#002a7a]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Properties Management</h2>
              <Link href="/admin/properties/new">
                <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#003594] hover:bg-[#002a7a]">
                  Add New Property
                </span>
              </Link>
            </div>
            <ul className="divide-y divide-gray-200">
              {properties.map((property) => (
                <li key={property._id || property.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-[#003594]/20 shadow-md flex items-center justify-center overflow-hidden">
                          {property.logo ? (
                            <img
                              src={property.logo}
                              alt={property.name}
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            <span className="text-[#003594] text-xl font-bold">
                              {property.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{property.name}</p>
                          <p className="text-sm text-gray-500">ID: {property._id || property.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      <Link href={`/admin/properties/edit/${property._id || property.id}`}>
                        <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#003594] bg-[#003594]/10 hover:bg-[#003594]/20">
                          Edit
                        </span>
                      </Link>
                      <Link href={`/properties/${property._id || property.id}`}>
                        <span className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          View
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
} 