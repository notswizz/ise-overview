import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function MigrateContacts() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const handleMigration = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch('/api/properties/migrate-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Migration failed');
      }
    } catch (err) {
      setError('An error occurred while running the migration: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Migrate Contacts | ISE Properties">
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Migration Tool</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Contact Data Structure Migration</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This tool will migrate all existing contacts from the old structure (separate arrays) to the new unified contacts array structure.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="text-sm text-gray-500 mb-4">
                <p>This migration will:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Convert all alumni, campus, MMR, and athletics contacts to the new format</li>
                  <li>Preserve the existing contact data</li>
                  <li>Enable the use of the new contacts interface</li>
                </ul>
              </div>
              
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleMigration}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6ea8d8] hover:bg-[#5a89b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6ea8d8] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Migrating...
                    </>
                  ) : 'Run Migration'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {result && (
                <div className="mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Migration Successful</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>{result.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {result.migratedProperties && result.migratedProperties.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Migrated Properties</h3>
                      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Property Name
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contacts Migrated
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {result.migratedProperties.map((property, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {property.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {property.contactCount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                                  <Link 
                                    href={`/admin/properties/edit/${property.id}`}
                                    className="hover:text-blue-700"
                                  >
                                    View/Edit Property
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link 
              href="/admin/properties"
              className="text-sm font-medium text-[#6ea8d8] hover:text-[#5a89b8]"
            >
              &larr; Back to Properties
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 