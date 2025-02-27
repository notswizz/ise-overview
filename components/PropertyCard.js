import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ property }) {
  // Use _id from MongoDB
  const propertyId = property._id;
  
  // Check if contract is active or expired
  const isActive = property.contractExpiration && new Date(property.contractExpiration) > new Date();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg border-2 border-black">
      <Link href={`/properties/${propertyId}`}>
        <div className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {/* Enhanced image display with ISE color scheme */}
            <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-black shadow-md overflow-hidden flex items-center justify-center transform transition-all duration-300 hover:shadow-lg hover:border-[#6ea8d8]">
              {property.logo ? (
                <img
                  src={property.logo}
                  alt={property.name}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <span className="text-[#6ea8d8] text-2xl font-bold">
                  {property.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
        </div>
      </Link>
    </div>
  );
} 