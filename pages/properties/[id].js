import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import mongoose from 'mongoose';
import dynamic from 'next/dynamic';

// Import our components
import PropertyHeader from '../../components/properties/PropertyHeader';
import { 
  LoadingState, 
  NotFoundState, 
  InvalidIdState, 
  ErrorState, 
  EmptyPropertyState 
} from '../../components/properties/PropertyStatusStates';

// Import PasswordProtection with no SSR to avoid hydration issues with localStorage
const PasswordProtection = dynamic(() => import('../../components/PasswordProtection'), {
  ssr: false
});

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    // Validate MongoDB ObjectId format
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid MongoDB ObjectId format: ${id}`);
      setInvalidId(true);
      setLoading(false);
      return;
    }
    
    const fetchPropertyDetails = async () => {
      try {
        console.log('Fetching property with ID:', id);
        const response = await fetch(`/api/properties/${id}`);
        
        if (response.status === 404) {
          console.log('Property not found');
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          // Handle HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          const property = data.data;
          
          // Debug financial fields
          console.log('Property data received:', property);
          console.log('Financial fields:');
          console.log('- projectedAnnualDeal:', property.projectedAnnualDeal, typeof property.projectedAnnualDeal);
          console.log('- dealTermLength:', property.dealTermLength, typeof property.dealTermLength);
          console.log('- actualAnnualDeal:', property.actualAnnualDeal, typeof property.actualAnnualDeal);
          
          setProperty(property);
        } else {
          setError(data.error || 'Failed to fetch property details');
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // Wrap the content with password protection
  const renderContent = () => {
    // Handle loading state
    if (!id || loading) {
      return <LoadingState />;
    }

    // Handle not found
    if (notFound) {
      return <NotFoundState />;
    }

    // Handle invalid ID format
    if (invalidId) {
      return <InvalidIdState id={id} />;
    }

    // Handle error state
    if (error) {
      return <ErrorState error={error} router={router} />;
    }

    // Handle case where property is null (shouldn't happen with the above checks, but just in case)
    if (!property) {
      return <EmptyPropertyState router={router} />;
    }

    return (
      <Layout title={`${property.name} | ISE Properties`}>
        <div className="max-w-[1100px] mx-auto h-[calc(100vh-4rem)] w-full px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Property Detail View with Sidebar */}
          <PropertyHeader property={property} id={id} />
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
